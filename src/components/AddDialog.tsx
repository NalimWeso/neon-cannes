import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
// import data from '../../public/data.json';

export default function AddDialog({ category }: { category: string }) {
    const [isSeries, setIsSeries] = useState(false);

    function handleSeries(num: number) {
        setIsSeries(num === 1 ? !isSeries : false);
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                        <PlusIcon />
                    </Button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white border-2 border-titlebar p-3 shadow w-full max-w-md bg-orange-950'>
                            <div className="flex justify-between items-center">
                                <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                                    {category}
                                </Dialog.Title>
                            </div>

                            <div className='mt-2'>
                                <RadioCards.Root color="orange" variant='classic'
                                    defaultValue="1"
                                    columns={{ initial: '1', sm: '2' }}
                                    onValueChange={() => handleSeries(1)}
                                >
                                    <RadioCards.Item value="1" className='p-2 mt-2 rounded cursor-pointer hover:bg-orange-800 transition mr-1'>
                                        <Text className="text-amber-500 font-bold">Film</Text>
                                    </RadioCards.Item>
                                    <RadioCards.Item value="2" className='p-2 mt-2 rounded cursor-pointer hover:bg-orange-800 transition ml-1'>
                                        <Text className="text-amber-500 font-bold">Series</Text>
                                    </RadioCards.Item>
                                </RadioCards.Root>
                            </div>

                            <div className='mt-4'>
                                <TextField.Root placeholder={!isSeries ? "Star Wars" : "Mr. Robot"} variant="soft">
                                    <TextField.Slot className='text-amber-500 font-bold mr-6 selection:bg-red-500'>
                                        Title
                                    </TextField.Slot>
                                </TextField.Root>

                                <TextField.Root placeholder={!isSeries ? "1977" : "2015"} variant="soft">
                                    <TextField.Slot className='text-amber-500 font-bold mr-6'>
                                        Year
                                    </TextField.Slot>
                                </TextField.Root>

                                {isSeries === true && (
                                    <TextField.Root placeholder="2019 / Present" variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                            End?
                                        </TextField.Slot>
                                    </TextField.Root>
                                )}
                            </div>

                            <div className='text-right mt-2'>
                                <Dialog.Close>
                                    <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold py-1 w-16 rounded transition"
                                        onClick={() => handleSeries(0)}
                                    >
                                        Cancel
                                    </Button>
                                </Dialog.Close>

                                <Button size="1" color="orange" variant="soft" radius="medium" className="text-amber-500 font-bold ml-2 py-1 w-16 rounded transition">
                                    Add
                                </Button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}