import { Pencil2Icon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import HandleTitle from './utils/HandleTitle';
// import HandleType from './utils/HandleType'; (HandleChange)
import HandleKeyDown from './utils/HandleKeyDown';
import FormatDate from './utils/FormatDate';
import ProcessSeason from './utils/ProcessSeason';
// import ModifyData from './utils/ModifyData';
import DeleteContent from './utils/DeleteContent';
import films from '../../public/films.json';

export default function ModifyMovie({ index, id, title, year, yearEnd, season, date, dateEnd }:
    { index: number | null, id: string, title: string, year: number, yearEnd?: number | string, date?: string, dateEnd?: string, season?: string }) {
    const [filmIndex, setFilmIndex] = useState<number | null>(index);
    const [filmTitle, setFilmTitle] = useState<string>(title);
    const [filmYear, setFilmYear] = useState<number>(year);
    const [filmYearEnd, setFilmYearEnd] = useState<undefined | null | number | string>(yearEnd);
    const [filmDate, setFilmDate] = useState<undefined | string>(date);
    const [filmDateEnd, setFilmDateEnd] = useState<undefined | string>(dateEnd);
    const [filmSeason, setFilmSeason] = useState<undefined | number | [number, number] | string>(season);
    const catContent = films.find(category => category.films?.some(film => film.id === id));

    filmDate; filmDateEnd;

    useEffect(() => {
        setFilmIndex(index);
        setFilmTitle(title);
        setFilmYear(year);
        setFilmYearEnd(yearEnd);
        setFilmDate(date);
        setFilmDateEnd(dateEnd);
        setFilmSeason(season);
    }, [index, title, year, yearEnd, date, dateEnd, season]);

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
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        const value = e.target.value.toUpperCase();
        e.target.value = value;

        const num = parseInt(value, 10);

        if (type === "Present") {
            setFilmYearEnd(value === 'P' ? 'Present' : (value === 'N' ? null : isNaN(num) ? undefined : num))
        } else if (type === "Miniseries") {
            setFilmSeason(value === 'M' ? 'Miniseries' : parseValue(value));
        } else {
            setFilmDate(value);
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
                            date?: string;
                            dateEnd?: string;
                        } = {
                            ...film,
                            index: newIndex,
                            title: filmTitle,
                            year: filmYear
                        };

                        if ('yearEnd' in film) {
                            if (typeof filmYearEnd === 'number') {
                                update.yearEnd = Number(filmYearEnd);
                            } else if (typeof filmYearEnd === 'string') {
                                update.yearEnd = String(filmYearEnd);
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
                            {title} ({year}{yearEnd ? `\u00A0-\u00A0${yearEnd}` : ''})
                        </Dialog.Title>

                        <div className='mt-2'>
                            <TextField.Root onChange={(e) => HandleTitle(e.target.value, setFilmTitle)} placeholder={title} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root onChange={(e) => setFilmYear(parseInt(e.target.value, 10))} onKeyDown={HandleKeyDown} placeholder={`${year}`} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5.2'>
                                    Year
                                </TextField.Slot>
                            </TextField.Root>

                            {season && (
                                <TextField.Root onChange={(e) => handleChange(e, "Present")} onKeyDown={(e) => HandleKeyDown(e, "Present")} placeholder={`${yearEnd ? yearEnd : year}`} variant="soft">
                                    <TextField.Slot className='text-lime-500 font-bold mr-6.2'>
                                        End
                                    </TextField.Slot>
                                </TextField.Root>
                            )}

                            {date && (
                                <TextField.Root onChange={(e) => handleChange(e, "Date")} onKeyDown={(e) => HandleKeyDown(e, "Date")} placeholder={FormatDate(new Date(date), dateEnd ? new Date(dateEnd) : undefined)} variant="soft">
                                    <TextField.Slot className='text-lime-500 font-bold mr-4.35'>
                                        Date
                                    </TextField.Slot>
                                </TextField.Root>
                            )}

                            {season && (
                                <TextField.Root onChange={(e) => handleChange(e, "Miniseries")} onKeyDown={(e) => HandleKeyDown(e, "Miniseries")} placeholder={ProcessSeason(season)} variant="soft">
                                    <TextField.Slot className='text-lime-500 font-bold mr-5.7'>
                                        Run
                                    </TextField.Slot>
                                </TextField.Root>
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
                                <Button onClick={() => { setFilmIndex(index), setFilmTitle(title), setFilmYear(year), setFilmYearEnd(yearEnd), setFilmSeason(season); }} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Cancel
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => saveData()} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mx-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Save
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => DeleteContent(id, false)} size="1" color="teal" variant="soft" className="text-lime-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer">
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