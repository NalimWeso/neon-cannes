import { Pencil2Icon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import films from '../../public/films.json';

export default function ModifyMovie({ index, id, title, year, end, season }:
    { index: number | null, id: string, title: string, year: number, end?: number | string, season?: string }) {
    const [filmIndex, setFilmIndex] = useState<number | null>(index);
    const [filmTitle, setFilmTitle] = useState<string>(title);
    const [filmYear, setFilmYear] = useState<number>(year);
    const [filmEnd, setFilmEnd] = useState<undefined | null | number | string>(end);
    const [filmSeason, setFilmSeason] = useState<undefined | number | [number, number] | string>(season);
    const catContent = films.find(category => category.films?.some(film => film.id === id));

    useEffect(() => {
        setFilmIndex(index);
        setFilmTitle(title);
        setFilmYear(year);
        setFilmEnd(end);
        setFilmSeason(season);
    }, [index, title, year, end, season]);

    function processSeason(season: string) {
        const regex = /Seasons?\s+(\d+(-\d+)?)/i;
        const match = season.match(regex);
        if (match) {
            return match[1];
        } else {
            return 'Miniseries';
        }
    }

    function getLastIndex(): number {
        if (!catContent || !catContent.films) {
            return 0;
        }

        const indexes = catContent.films
            .filter(film => typeof film.index === 'number')
            .map(film => film.index as number);

        if (indexes.length === 0) {
            return 0;
        }

        return Math.max(...indexes);
    }

    function handleTitle(element: string) {
        if (element.trim()) {
            setFilmTitle(element.trim().replace(/\s+/g, ' '));
        }
    }

    function parseValue(value: string): undefined | number | [number, number] {
        value = value.replace(/-$/, '');

        if (/^\d+$/.test(value)) {
            return Number(value);
        }

        const dashValue = value.indexOf('-');

        if (dashValue !== -1) {
            const first = value.slice(0, dashValue);
            const second = value.slice(dashValue + 1);

            if (/^\d+$/.test(first) && /^\d+$/.test(second)) {
                return [Number(first), Number(second)];
            }
        }

        return undefined;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        const value = e.target.value.toUpperCase();
        e.target.value = value;

        const num = parseInt(value, 10);

        if (type === "Present") {
            setFilmEnd(value === 'P' ? 'Present' : (value === 'N' ? null : isNaN(num) ? undefined : num))
        } else {
            setFilmSeason(value === 'M' ? 'Miniseries' : parseValue(value));
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, type?: string) {
        const current = e.currentTarget.value;
        const length = current.length;
        const initialKeys = ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft'];
        const allowedKeys = [...initialKeys];
        const key = e.key;

        if (type === "Present" || type === "Miniseries") {
            initialKeys.push(...(type === 'Present' ? ['P', 'p', 'N', 'n'] : ['M', 'm', '-']));
        }

        const isDigit = key >= '0' && key <= '9';

        if (
            (!isDigit && !initialKeys.includes(key)) ||
            (length === 0 && ['0', '-'].includes(key)) ||
            (length >= (type !== 'Miniseries' ? 4 : 7) && !allowedKeys.includes(key)) ||
            (length > 0 && isNaN(Number(key)) && !allowedKeys.includes(key) && key !== '-') ||
            (length > 0 && ['M', 'P', 'N'].includes(current[0].toUpperCase()) && !allowedKeys.includes(key)) ||
            (key === '-' && (length === 0 || current.includes('-')))
        ) {
            e.preventDefault();
        }
    }

    function saveData() {
        const oldIndex = index;
        const newIndex = filmIndex;

        const updatedData = films.map(category => {
            if (category === catContent && category.films) {
                const updatedFilms = category.films.map(film => {
                    if (film.id === id) {
                        const update: {
                            index: number | null,
                            title: string;
                            year: number;
                            yearEnd?: string | number | null;
                            season?: string;
                        } = {
                            ...film,
                            index: newIndex,
                            title: filmTitle,
                            year: filmYear
                        };

                        if ('yearEnd' in film) {
                            if (typeof filmEnd === 'number') {
                                update.yearEnd = Number(filmEnd);
                            } else if (typeof filmEnd === 'string') {
                                update.yearEnd = String(filmEnd);
                            } else {
                                update.yearEnd = null;
                            }

                            update.season = typeof filmSeason === 'string' ? filmSeason : Array.isArray(filmSeason) ? `Seasons ${filmSeason[0]}-${filmSeason[1]}` : `Season ${filmSeason}`;
                        }

                        return update;
                    } else {
                        if (oldIndex !== null && newIndex !== null && film.index !== null) {
                            if (oldIndex < newIndex) {
                                if (film.index > oldIndex && film.index <= newIndex) {
                                    return {
                                        ...film,
                                        index: film.index - 1
                                    };
                                }
                            } else if (oldIndex > newIndex) {
                                if (film.index >= newIndex && film.index < oldIndex) {
                                    return {
                                        ...film,
                                        index: film.index + 1
                                    };
                                }
                            }
                        }
                    }

                    return film;
                });

                updatedFilms.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

                return {
                    ...category,
                    films: updatedFilms,
                };
            }
            return category;
        });

        ipcRenderer.invoke('write-json', updatedData);
    }

    function deleteFilm(filmId: string) {
        const updatedData = films.map(category => {
            if (category.films) {
                const updatedFilms = category.films.filter(film => film.id !== filmId);

                if (updatedFilms.length < category.films.length) {
                    const filmToDelete = category.films.find(film => film.id === filmId);
                    if (filmToDelete?.index !== null && filmToDelete?.index !== undefined) {
                        updatedFilms.forEach((film, index) => {
                            film.index = index;
                        });
                    }
                }

                return {
                    ...category,
                    films: updatedFilms,
                };
            }
            return category;
        });

        ipcRenderer.invoke('write-json', updatedData);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 mx-1 transition cursor-pointer">
                    <Pencil2Icon />
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                    <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-jungle text-white border-2 border-forest p-3 w-full max-w-md shadow' >
                        <Dialog.Title className='text-lime-500 text-2xl font-bold'>
                            {title} ({year}{end ? `\u00A0-\u00A0${end}` : ''})
                        </Dialog.Title>

                        <div className='mt-2'>
                            <TextField.Root onChange={(e) => handleTitle(e.target.value)} placeholder={title} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root onChange={(e) => setFilmYear(parseInt(e.target.value, 10))} onKeyDown={handleKeyDown} placeholder={`${year}`} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5.2'>
                                    Year
                                </TextField.Slot>
                            </TextField.Root>

                            {season && (
                                <>
                                    <TextField.Root onChange={(e) => handleChange(e, "Present")} onKeyDown={(e) => handleKeyDown(e, "Present")} placeholder={`${end ? end : year}`} variant="soft">
                                        <TextField.Slot className='text-lime-500 font-bold mr-6.2'>
                                            End
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root onChange={(e) => handleChange(e, "Miniseries")} onKeyDown={(e) => handleKeyDown(e, "Miniseries")} placeholder={processSeason(season)} variant="soft">
                                        <TextField.Slot className='text-lime-500 font-bold mr-5.7'>
                                            Run
                                        </TextField.Slot>
                                    </TextField.Root>
                                </>
                            )}

                            {typeof filmIndex === 'number' && (
                                <div className='flex'>
                                    <Text className='text-lime-500 font-bold py-1 pr-2.5 cursor-text'>Position</Text>
                                    <Button disabled={filmIndex === 0} onClick={() => setFilmIndex(filmIndex - 1)} color="teal" variant={filmIndex !== 0 ? "soft" : "surface"} className={`text-lime-500 text-2xl my-1 p-1 rounded transition ${index !== 0 ? 'cursor-pointer' : 'cursor-default'}`} >
                                        <ChevronUpIcon />
                                    </Button>

                                    <Text className='text-neutral-400 p-1'>{filmIndex + 1}</Text>

                                    <Button disabled={filmIndex === getLastIndex()} onClick={() => setFilmIndex(filmIndex + 1)} color="teal" variant={filmIndex !== getLastIndex() ? "soft" : "surface"} className={`text-lime-500 text-2xl my-1 p-1 rounded transition ${index !== getLastIndex() ? `cursor-pointer` : `cursor-default`}`}>
                                        <ChevronDownIcon />
                                    </Button>
                                </div>
                            )}

                            {catContent?.category !== 'Current' && (
                                <TextField.Root placeholder='01.01' variant="soft">
                                    <TextField.Slot className='text-lime-500 font-bold mr-4'>
                                        To Current
                                    </TextField.Slot>
                                </TextField.Root>
                            )}
                        </div>

                        <div className='text-right mt-2'>
                            <Dialog.Close asChild>
                                <Button onClick={() => { setFilmIndex(index), setFilmTitle(title), setFilmYear(year), setFilmEnd(end), setFilmSeason(season); }} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Cancel
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => saveData()} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mx-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Save
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => deleteFilm(id)} size="1" color="teal" variant="soft" className="text-lime-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Delete
                                </Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}