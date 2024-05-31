import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ipcRenderer } from 'electron';
import films from '../../public/films.json';

export default function ModifyDialog({ category, position }: { category: string, position: number }) {
    const [categoryName, setCategoryName] = useState(category);
    const [categoryPosition, setCategoryPosition] = useState(position);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const length = e.currentTarget.value.length;
        const key = e.key

        if ((length === 0 && key === '0') || !((key >= '0' && key <= '9') || key === 'Backspace' || key === 'ArrowRight' || key === 'ArrowLeft')) {
            e.preventDefault();
        }
    }

    function handleOnChange(element: string | number) {
        if (typeof element === "string") {
            const input = element.trim().replace(/\s+/g, ' ');
            setCategoryName(input);
        }

        if (typeof element === "number") {
            if (!isNaN(element)) {
                setCategoryPosition(element - 1);
            }
        }
    }

    function handleSave() {
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
                                    <TextField.Root onChange={(e) => handleOnChange(e.target.value)} placeholder={category} variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-8'>
                                            Name
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root onChange={(e) => handleOnChange(parseInt(e.target.value, 10))} onKeyDown={handleKeyDown} placeholder={`${position - 1}`} variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-4'>
                                            Position
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>

                                <div className='text-right mt-2'>
                                    <Dialog.Close asChild>
                                        <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                        <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold mx-0.5 py-1 w-16 rounded transition cursor-pointer">
                                            Delete
                                        </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                        <Button onClick={handleSave} size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-0.5 py-1 w-16 rounded transition cursor-pointer">
                                            Save
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