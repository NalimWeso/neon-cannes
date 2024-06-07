import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
// import { ipcRenderer } from 'electron';

export default function AddDialog({ category }: { category: string }) {
    const [isSeries, setIsSeries] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [end, setEnd] = useState<number | null | "Present" | "Miniseries">(null);
    const [btnPresent, setBtnPresent] = useState(0);
    const [btnMiniseries, setBtnMiniseries] = useState(0);

    function handleSeries(num: number) {
        setIsSeries(num === 1 ? !isSeries : false);
    }

    function handleTitle(element: string) {
        if (element.trim()) {
            setTitle(element.trim().replace(/\s+/g, ' '));
        }
    }

    function handleEnd(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);
        setEnd(isNaN(value) ? null : value);
        setBtnPresent(0);
        setBtnMiniseries(0);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const length = e.currentTarget.value.length;
        const key = e.key;

        if ((length === 0 && key === '0') || !((key >= '0' && key <= '9') || key === 'Backspace' || key === 'ArrowRight' || key === 'ArrowLeft')) {
            e.preventDefault();
        }
    }

    function handleButton(value: "Present" | "Miniseries") {
        const isPresent = value === "Present";
        const btnValue = isPresent ? btnPresent : btnMiniseries;
        const setMainBtn = isPresent ? setBtnPresent : setBtnMiniseries;
        const setOtherBtn = isPresent ? setBtnMiniseries : setBtnPresent;
        const endValue = isPresent ? "Present" : "Miniseries";

        if (btnValue === 0) {
            setMainBtn(1);
            setOtherBtn(0);
            setEnd(endValue);
        } else {
            setMainBtn(0);
            setEnd(null);
        }
    }

    function saveData() {

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
                        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-950 text-white border-2 border-titlebar p-3 w-full max-w-md shadow'>
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
                                        <TextField.Root value={btnPresent === 1 || btnMiniseries === 1 ? "" : undefined} onChange={handleEnd} onKeyDown={handleKeyDown} placeholder="2019" variant="soft">
                                            <TextField.Slot className='text-amber-500 font-bold mr-4'>
                                                End?
                                            </TextField.Slot>
                                        </TextField.Root>

                                        <div className="mt-1">
                                            <Button onClick={() => handleButton("Present")} color="orange" variant={btnPresent === 0 ? `outline` : `soft`} className="text-amber-500 font-bold mr-0.5 px-2 py-1 rounded transition cursor-pointer">
                                                Present
                                            </Button>
                                            <Button onClick={() => handleButton("Miniseries")} color="orange" variant={btnMiniseries === 0 ? `outline` : `soft`} className="text-amber-500 font-bold ml-0.5 px-2 py-1 rounded transition cursor-pointer">
                                                Miniseries
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className='text-right mt-2'>
                                <Dialog.Close asChild>
                                    <Button onClick={() => { handleSeries(0); setEnd(null); setBtnPresent(0); setBtnMiniseries(0); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-1 py-1 w-16 rounded transition cursor-pointer">
                                        Cancel
                                    </Button>
                                </Dialog.Close>

                                <Dialog.Close asChild>
                                    <Button onClick={() => { saveData(); handleSeries(0); setEnd(null); setBtnPresent(0); setBtnMiniseries(0); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-1 py-1 w-16 rounded transition cursor-pointer">
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