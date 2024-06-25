import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ipcRenderer } from 'electron';
import { v4 as uuid } from 'uuid';
import films from '../../public/films.json'

export default function AddDialog({ category, id }: { category: string, id: string }) {
    const [isSeries, setIsSeries] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [end, setEnd] = useState<undefined | number | "Present">(undefined);
    const [season, setSeason] = useState<undefined | number | [number, number] | "Miniseries">(undefined);

    function handleSeries(num: number) {
        setIsSeries(num === 1 ? !isSeries : false);

        if (num === 1) {
            setEnd(undefined);
            setSeason(undefined);
        }
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

    function addData() {
        if (!isSeries || (isSeries && season !== undefined)) {
            if (title && year) {
                const categoryToUpdate = films.find(category => category.id === id);

                if (categoryToUpdate) {
                    const seasonValue = season && (
                        typeof season === 'string' ? season : Array.isArray(season) ? `Seasons ${season[0]}-${season[1]}` : `Season ${season}`
                    );

                    const newMovie = {
                        index: categoryToUpdate.films.length,
                        id: uuid(),
                        title,
                        year,
                        ...(end && { yearEnd: end }),
                        ...(season && { season: seasonValue })
                    };

                    ipcRenderer.invoke('add-json', newMovie, id);

                    handleSeries(0);
                    setTitle("");
                    setYear(0);
                    setEnd(undefined);
                    setSeason(undefined);
                }
            }
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                    <PlusIcon />
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                    <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-950 text-white border-2 border-sunset p-3 w-full max-w-md shadow' >
                        <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                            {category}
                        </Dialog.Title>

                        <div className='mt-2'>
                            <RadioCards.Root onValueChange={() => handleSeries(1)} color="orange" defaultValue="1" columns={{ initial: '1', sm: '2' }}>
                                <RadioCards.Item value="1" className='hover:bg-orange-800 mt-2 mr-1 p-2 rounded transition cursor-pointer'>
                                    <Text className="text-amber-500 font-bold">Film</Text>
                                </RadioCards.Item>
                                <RadioCards.Item value="2" className='hover:bg-orange-800 mt-2 ml-1 p-2 rounded transition cursor-pointer'>
                                    <Text className="text-amber-500 font-bold">Series</Text>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </div>

                        <div className='mt-2'>
                            <TextField.Root onChange={(e) => handleTitle(e.target.value)} placeholder={!isSeries ? "Star Wars" : "Mr. Robot"} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root onChange={(e) => setYear(parseInt(e.target.value, 10))} onKeyDown={handleKeyDown} placeholder={!isSeries ? "1977" : "2015"} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                    Year
                                </TextField.Slot>
                            </TextField.Root>

                            {isSeries === true && (
                                <>
                                    <TextField.Root onChange={(e) => handleChange(e, "Present")} onKeyDown={(e) => handleKeyDown(e, "Present")} placeholder="2019 / P (Present)" variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-4'>
                                            End?
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root onChange={(e) => handleChange(e, "Miniseries")} onKeyDown={(e) => handleKeyDown(e, "Miniseries")} placeholder="1-4 / M (Miniseries)" variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                            Run
                                        </TextField.Slot>
                                    </TextField.Root>
                                </>
                            )}
                        </div>

                        <div className='text-right mt-2'>
                            <Dialog.Close asChild>
                                <Button onClick={() => { handleSeries(0); setTitle(""), setYear(0), setEnd(undefined), setSeason(undefined); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Cancel
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => addData()} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Add
                                </Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}