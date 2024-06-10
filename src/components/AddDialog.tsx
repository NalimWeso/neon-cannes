import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

export default function AddDialog({ category }: { category: string }) {
    const [isSeries, setIsSeries] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [end, setEnd] = useState<null | number | "Present">(null);
    const [season, setSeason] = useState<null | number | [number, number] | string | "Miniseries">(null);

    function handleSeries(num: number) {
        setIsSeries(num === 1 ? !isSeries : false);
    }

    function handleTitle(element: string) {
        if (element.trim()) {
            setTitle(element.trim().replace(/\s+/g, ' '));
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        const value = e.target.value.toUpperCase();
        e.target.value = value;

        const num = parseInt(value, 10);

        if (type === "Present") {
            setEnd(value === 'P' ? 'Present' : isNaN(num) ? null : num);
        } else {
            setSeason(value === 'M' ? 'Miniseries' : value);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, type?: string) {
        const current = e.currentTarget.value;
        const length = current.length;
        const allowedKeys = ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft'];
        const specialKeys = [',', ' '];
        const initialKeys = [...allowedKeys];
        const key = e.key;

        if (type === "Present" || type === "Miniseries") {
            allowedKeys.push(...(type === 'Present' ? ['P', 'p'] : ['M', 'm', ...specialKeys]));
        }

        const isDigit = key >= '0' && key <= '9';

        if (
            (!isDigit && !allowedKeys.includes(key)) ||
            (length === 0 && ['0', ',', ' '].includes(key)) ||
            (length >= (type !== 'Miniseries' ? 4 : 8) && !initialKeys.includes(key)) ||
            (length > 0 && isNaN(Number(key)) && !initialKeys.includes(key) && !specialKeys.includes(key)) ||
            (length > 0 && ['M', 'P'].includes(current[0].toUpperCase()) && !initialKeys.includes(key)) ||
            (key === ',' && (length === 0 || isNaN(Number(current[length - 1])) || current[length - 1] === ' ' || current.includes(','))) ||
            (key === ' ' && (length === 0 || current[length - 1] !== ',' || current.includes(' ')))
        ) {
            e.preventDefault();
        }
    }

    function saveData() {
        title; year; end; season;
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                        <PlusIcon />
                    </Button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                        <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-950 text-white border-2 border-titlebar p-3 w-full max-w-md shadow' >
                            <div className="flex justify-between items-center">
                                <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                                    {category}
                                </Dialog.Title>
                            </div>

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

                                <TextField.Root onChange={(e) => setYear(parseInt(e.target.value, 10))} onKeyDown={handleKeyDown} placeholder={!isSeries ? "1977" : "2015"} variant="soft" className='w-24'>
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
                                            {end}
                                        </TextField.Root>

                                        <TextField.Root onChange={(e) => handleChange(e, "Miniseries")} onKeyDown={(e) => handleKeyDown(e, "Miniseries")} placeholder="1, 4 / M (Miniseries)" variant="soft">
                                            <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                                Run
                                            </TextField.Slot>
                                            {season}
                                        </TextField.Root>
                                    </>
                                )}
                            </div>

                            <div className='text-right mt-2'>
                                <Dialog.Close asChild>
                                    <Button onClick={() => { handleSeries(0); setEnd(null); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-1 py-1 w-16 rounded transition cursor-pointer">
                                        Cancel
                                    </Button>
                                </Dialog.Close>

                                <Dialog.Close asChild>
                                    <Button onClick={() => { saveData(); handleSeries(0); setEnd(null); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-1 py-1 w-16 rounded transition cursor-pointer">
                                        Add
                                    </Button>
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}