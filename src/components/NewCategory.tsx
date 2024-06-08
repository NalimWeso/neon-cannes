import { RocketIcon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ipcRenderer } from 'electron';

interface CategoryCallbacks {
    onSave: (categoryName: string) => void;
}

export default function NewCategory({ onSave }: CategoryCallbacks) {
    const [categoryName, setCategoryName] = useState("");

    function handleName(element: string) {
        if (element.trim()) {
            setCategoryName(element.trim().replace(/\s+/g, ' '));
        }
    }

    function saveData() {
        if (categoryName) {
            ipcRenderer.invoke('add-json', categoryName);
            onSave(categoryName);
            setCategoryName("");
        }
    }

    return (
        <div className="mb-1 ml-1 pt-6">
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button size="1" color="orange" variant="soft" className="text-amber-500 text-sm font-bold px-3 py-3.5 rounded transition cursor-pointer">
                        New Category<RocketIcon className='ml-1' />
                    </Button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-950 text-white border-2 border-titlebar p-3 w-full max-w-md shadow'>
                            <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                                New Category
                            </Dialog.Title>

                            <div className='mt-2'>
                                <TextField.Root onChange={(e) => handleName(e.target.value)} placeholder="Animation" variant="soft">
                                    <TextField.Slot className='text-amber-500 font-bold mr-8'>
                                        Name
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>

                            <div className='text-right mt-2'>
                                <Dialog.Close asChild>
                                    <Button onClick={() => setCategoryName("")} size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-0.5 py-1 w-16 rounded transition cursor-pointer">
                                        Cancel
                                    </Button>
                                </Dialog.Close>

                                <Dialog.Close asChild>
                                    <Button onClick={saveData} size="1" color="orange" variant="soft" className="text-amber-500 mx-0.5 font-bold py-1 w-16 rounded transition cursor-pointer">
                                        Add
                                    </Button>
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}