import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import films from '../../public/films.json';

export default function ModifyDialog({ category }: { category: string }) {
    function getPosition(category: string) {
        const categoryData = films.find(item => item.category === category);
        return categoryData ? categoryData.position - 1 : 0;
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
                                    <TextField.Root placeholder={category} variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-8'>
                                            Name
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root placeholder={`${getPosition(category)}`} variant="soft">
                                        <TextField.Slot className='text-amber-500 font-bold mr-4'>
                                            Position
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>

                                <div className='text-right mt-2'>
                                    <Dialog.Close asChild>
                                        <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-1 py-1 w-16 rounded transition cursor-pointer">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                        <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold mr-1 py-1 w-16 rounded transition cursor-pointer">
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
    )
}