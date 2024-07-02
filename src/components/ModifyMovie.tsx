import { Pencil2Icon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ipcRenderer } from 'electron';
import films from '../../public/films.json';

export default function ModifyMovie({ initIndex, initId, initTitle, initYear, initEnd, initSeason }:
    { initIndex: number | null, initId: string, initTitle: string, initYear: number, initEnd?: number | string, initSeason?: string }) {
    const [index, setIndex] = useState<number | null>(initIndex);
    const [title, setTitle] = useState<string>(initTitle);
    const [year, setYear] = useState<number>(initYear);
    const [end, setEnd] = useState<undefined | number | string>(initEnd);
    const [season, setSeason] = useState<undefined | number | [number, number] | string>(initSeason);
    const catContent = films.find(category => category.films?.some(film => film.id === initId));

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
        setTitle(element.trim().replace(/\s+/g, ' '));
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
            setEnd(value === 'P' ? 'Present' : isNaN(num) ? undefined : num);
        } else {
            setSeason(value === 'M' ? 'Miniseries' : parseValue(value));
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, type?: string) {
        const current = e.currentTarget.value;
        const length = current.length;
        const initialKeys = ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft'];
        const allowedKeys = [...initialKeys];
        const key = e.key;

        if (type === "Present" || type === "Miniseries") {
            initialKeys.push(...(type === 'Present' ? ['P', 'p'] : ['M', 'm', '-']));
        }

        const isDigit = key >= '0' && key <= '9';

        if (
            (!isDigit && !initialKeys.includes(key)) ||
            (length === 0 && ['0', '-'].includes(key)) ||
            (length >= (type !== 'Miniseries' ? 4 : 7) && !allowedKeys.includes(key)) ||
            (length > 0 && isNaN(Number(key)) && !allowedKeys.includes(key) && key !== '-') ||
            (length > 0 && ['M', 'P'].includes(current[0].toUpperCase()) && !allowedKeys.includes(key)) ||
            (key === '-' && (length === 0 || current.includes('-')))
        ) {
            e.preventDefault();
        }
    }

    function saveData() {
        // This function should save changed data of the film

        title; year; end; season;

        setIndex(initIndex);
        setTitle(initTitle);
        setYear(initYear);
        setEnd(initEnd);
        setSeason(initSeason);
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
                            {initTitle} ({initYear}{initEnd ? `\u00A0-\u00A0${initEnd}` : ''})
                        </Dialog.Title>

                        <div className='mt-2'>
                            <TextField.Root onChange={(e) => handleTitle(e.target.value)} placeholder={initTitle} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root onChange={(e) => setYear(parseInt(e.target.value, 10))} onKeyDown={handleKeyDown} placeholder={`${initYear}`} variant="soft">
                                <TextField.Slot className='text-lime-500 font-bold mr-5'>
                                    Year
                                </TextField.Slot>
                            </TextField.Root>

                            {initSeason && (
                                <>
                                    <TextField.Root onChange={(e) => handleChange(e, "Present")} onKeyDown={(e) => handleKeyDown(e, "Present")} placeholder={`${initEnd ? initEnd : initYear}`} variant="soft">
                                        <TextField.Slot className='text-lime-500 font-bold mr-4'>
                                            End?
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root onChange={(e) => handleChange(e, "Miniseries")} onKeyDown={(e) => handleKeyDown(e, "Miniseries")} placeholder={processSeason(initSeason)} variant="soft">
                                        <TextField.Slot className='text-lime-500 font-bold mr-5'>
                                            Run
                                        </TextField.Slot>
                                    </TextField.Root>
                                </>
                            )}

                            {typeof index === 'number' && (
                                <div className='flex'>
                                    <Text className='text-lime-500 font-bold py-1 pr-2.5 cursor-text'>Position</Text>
                                    <Button disabled={index === 0} onClick={() => setIndex(index - 1)} color="teal" variant={index !== 0 ? "soft" : "surface"} className={`text-lime-500 text-2xl my-1 p-1 rounded transition ${index !== 0 ? 'cursor-pointer' : 'cursor-default'}`} >
                                        <ChevronUpIcon />
                                    </Button>

                                    <Text className='text-neutral-400 p-1'>{index + 1}</Text>

                                    <Button disabled={index === getLastIndex()} onClick={() => setIndex(index + 1)} color="teal" variant={index !== getLastIndex() ? "soft" : "surface"} className={`text-lime-500 text-2xl my-1 p-1 rounded transition ${index !== getLastIndex() ? `cursor-pointer` : `cursor-default`}`}>
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
                                <Button onClick={() => { setIndex(initIndex), setTitle(initTitle), setYear(initYear), setEnd(initEnd), setSeason(initSeason); }} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Cancel
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => saveData()} size="1" color="teal" variant="soft" className="text-lime-500 font-bold mx-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Save
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => deleteFilm(initId)} size="1" color="teal" variant="soft" className="text-lime-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer">
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