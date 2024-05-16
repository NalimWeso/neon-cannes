import { Cross1Icon, MinusIcon } from '@radix-ui/react-icons';
import { Text, Button } from '@radix-ui/themes';
import { ipcRenderer } from "electron";

export default function TitleBar() {
    const ipc = ipcRenderer;

    return (
        <>
            <div className="h-8 w-full bg-titlebar flex justify-between items-center">
                <div className='w-full draggable'>
                    <Text className='text-amber-500 text-center text-xl font-bold mt-1.5 ml-1'>Neon Cannes</Text>
                </div>

                <div className='flex'>
                    <Button size="1" radius="none" variant="solid" className=' bg-titlebar hover:bg-amber-600 transition duration-50 h-9 w-12 -mt-1'
                        onClick={() => ipc.send("minimize")}>
                        <MinusIcon />
                    </Button>

                    <Button size="1" radius="none" variant="solid" className=' bg-titlebar hover:bg-red-800 transition duration-50 h-9 w-12 -mt-1 -mr-0.5'
                        onClick={() => ipc.send("close")}>
                        <Cross1Icon />
                    </Button>
                </div>
            </div>
        </>
    )
}