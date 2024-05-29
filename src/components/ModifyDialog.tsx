import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
// import data from '../../public/data.json';

export default function ModifyDialog({ category }: { category: string }) {
    return (
        <>
            {category !== "Waiting Room" && (
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                            <Pencil2Icon />
                        </Button>
                    </Dialog.Trigger>
                </Dialog.Root>
            )}
        </>
    )
}