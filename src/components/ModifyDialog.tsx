import { Pencil2Icon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ipcRenderer } from 'electron';
import films from '../../public/films.json';

export default function ModifyDialog({ category, position }: { category: string, position: number }) {
    const [categoryName, setCategoryName] = useState(category);
    const [categoryPosition, setCategoryPosition] = useState(position);

    function handleName(element: string) {
        if (element.trim()) {
            setCategoryName(element.trim().replace(/\s+/g, ' '));
        }
    }

    function getLastPosition() {
        const positions = films.map(film => film.position);
        return Math.max(...positions);
    }

    function saveData() {
        const updatedCategory = films.map(item => {
            if (item.category === category) {
                console.log("categoryPosition: " + categoryPosition);
                return {
                    ...item,
                    category: categoryName,
                    // position: categoryPosition
                };
            }
            return item;
        });

        ipcRenderer.invoke('write-json', updatedCategory);
    }

    return (
        <>
            {category !== "Waiting Room" && (
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                            <Pencil2Icon />
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
                                    <TextField.Root onChange={(e) => handleName(e.target.value)} placeholder={category} variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-8'>
                                            Name
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <div className='flex'>
                                        <Text className='text-amber-500 font-bold py-1 pr-3.5 cursor-text'>Position</Text>
                                        <Button disabled={categoryPosition === 2} onClick={() => setCategoryPosition(categoryPosition - 1)} color="orange" variant={categoryPosition !== 2 ? "soft" : "surface"} className={`text-amber-500 text-2xl my-1 p-1 rounded transition ${categoryPosition !== 2 ? 'cursor-pointer' : 'cursor-default'}`} >
                                            <ChevronUpIcon />
                                        </Button>

                                        <Text className='text-neutral-400 p-1'>{categoryPosition - 1}</Text>

                                        <Button disabled={categoryPosition === getLastPosition()} onClick={() => setCategoryPosition(categoryPosition + 1)} color="orange" variant={categoryPosition !== getLastPosition() ? "soft" : "surface"} className={`text-amber-500 text-2xl my-1 p-1 rounded transition ${categoryPosition !== getLastPosition() ? `cursor-pointer` : `cursor-default`}`}>
                                            <ChevronDownIcon />
                                        </Button>
                                    </div>
                                </div>

                                <div className='text-right mt-2'>
                                    <Dialog.Close asChild>
                                        <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                        <Button onClick={saveData} size="1" color="orange" variant="soft" className="text-amber-500 mx-0.5 font-bold py-1 w-16 rounded transition cursor-pointer">
                                            Save
                                        </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                        <Button disabled={true} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-default">
                                            Delete
                                        </Button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Overlay>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </>
    );
}