import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';

export default function ModifyMovie({ title, year, yearEnd }: { title: string, year: number, yearEnd: number | string | undefined }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 mx-1 transition cursor-pointer">
                    <Pencil2Icon />
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                    <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-950 text-white border-2 border-titlebar p-3 w-full max-w-md shadow' >
                        <div className="flex justify-between items-center">
                            <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                                {title} ({year}{yearEnd ? ` - ${yearEnd}` : null})
                            </Dialog.Title>
                        </div>

                        <div className='mt-2'>
                            <TextField.Root placeholder={title} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                    Title
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root placeholder={`${year}`} variant="soft">
                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                    Year
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
                                <Button size="1" color="orange" variant="soft" className="text-amber-500 font-bold ml-1 py-1 w-16 rounded transition cursor-pointer">
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