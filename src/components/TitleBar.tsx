import { MinusIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Text, Button } from '@radix-ui/themes';
import { ipcRenderer as ipc } from 'electron';

export default function TitleBar() {
    function openGitHub() {
        window.open("https://github.com/NalimWeso/", "_blank");
    }

    return (
        <div className="h-7 w-full bg-sunset flex justify-between items-center">
            <div className='w-full drag'>
                <Text className='text-amber-500 text-center font-bold mt-1.5 ml-1 no-drag'><button onClick={openGitHub} tabIndex={-1}>NalimWeso</button> Presents: Neon Cannes</Text>
            </div>

            <div className='flex'>
                <Button onClick={() => ipc.send("minimize")} tabIndex={-1} size="1" radius="none" variant="solid" className="bg-sunset hover:bg-amber-600 transition duration-50 h-8 w-12 -mt-1">
                    <MinusIcon />
                </Button>

                <Button onClick={() => ipc.send("close")} tabIndex={-1} size="1" radius="none" variant="solid" className="bg-sunset hover:bg-red-800 transition duration-50 h-8 w-12 -mt-1 -mr-0.5">
                    <Cross1Icon />
                </Button>
            </div>
        </div>
    )
}