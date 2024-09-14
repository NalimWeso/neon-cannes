import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import HandleSeries from './utils/HandleSeries';
import HandleTitle from './utils/HandleTitle';
import HandleType from './utils/HandleType';
import HandleKeyDown from './utils/HandleKeyDown';
import AddContent from './utils/AddContent';

type SeriesControl = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
    React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>
];

type ParseControl = [
    React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
    React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>
];

export default function AddDialog({ category, id }: { category: string, id: string }) {
    const [isSeries, setIsSeries] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [end, setEnd] = useState<number | string | null | undefined>(undefined);
    const [season, setSeason] = useState<number | [number, number] | string | undefined>(undefined);
    const seriesControl: SeriesControl = [isSeries, setIsSeries, setEnd, setSeason];
    const parseControl: ParseControl = [setEnd, setSeason];

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
                            <RadioCards.Root onValueChange={() => HandleSeries(true, seriesControl)} color="orange" defaultValue="1" columns={{ initial: '1', sm: '2' }}>
                                <RadioCards.Item value="1" className='hover:bg-orange-800 mt-2 mr-1 p-2 rounded transition cursor-pointer'>
                                    <Text className="text-amber-500 font-bold">Film</Text>
                                </RadioCards.Item>
                                <RadioCards.Item value="2" className='hover:bg-orange-800 mt-2 ml-1 p-2 rounded transition cursor-pointer'>
                                    <Text className="text-amber-500 font-bold">Series</Text>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </div>

                        <div className='mt-2'>
                            <TextField.Root onChange={(e) => HandleTitle(e.target.value, setTitle)} placeholder={!isSeries ? "Star Wars" : "Mr. Robot"} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root onChange={(e) => setYear(parseInt(e.target.value, 10))} onKeyDown={HandleKeyDown} placeholder={!isSeries ? "1977" : "2015"} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5.2'>
                                    Year
                                </TextField.Slot>
                            </TextField.Root>

                            {isSeries === true && (
                                <>
                                    <TextField.Root onChange={(e) => HandleType(e, "Present", parseControl)} onKeyDown={(e) => HandleKeyDown(e, "Present")} placeholder="2019 | P (Present) | N (Nope)" variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-6.2'>
                                            End
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root onChange={(e) => HandleType(e, "Miniseries", parseControl)} onKeyDown={(e) => HandleKeyDown(e, "Miniseries")} placeholder="1-4 | M (Miniseries)" variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-5.7'>
                                            Run
                                        </TextField.Slot>
                                    </TextField.Root>
                                </>
                            )}
                        </div>

                        <div className='text-right mt-2'>
                            <Dialog.Close asChild>
                                <Button onClick={() => { HandleSeries(false, seriesControl); setTitle(""), setYear(0), setEnd(undefined), setSeason(undefined); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                    Cancel
                                </Button>
                            </Dialog.Close>

                            <Dialog.Close asChild>
                                <Button onClick={() => { AddContent(false, id, undefined, title, year, isSeries, season, end); HandleSeries(false, seriesControl); setTitle(""); setYear(0); setEnd(undefined); setSeason(undefined); }} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer" >
                                    Add
                                </Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root >
    )
}