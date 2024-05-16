import { Pencil2Icon, CopyIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';

export default function FutureFilms() {
    return (
        <>
            <div className="px-2 pt-6 leading-6">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Great Category</Badge>
                <Button size="1" color="orange" variant="soft" className="text-amber-500 text-xs ml-1 py-3.5 cursor-pointer"><Pencil2Icon /></Button>
                <Button size="1" color='orange' variant="soft" className="text-amber-500 text-lg ml-1 py-3.5 cursor-pointer">&#43;</Button>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">A Bittersweet Life (2005)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">The Bridge on the River Kwai (1957)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Kiss the Girls and Make Them Die (1966)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>
            </div>

            <div className="px-2 pt-6 leading-6">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Animation</Badge>
                <Button size="1" color="orange" variant="soft" className="text-amber-500 text-xs ml-1 py-3.5 cursor-pointer"><Pencil2Icon /></Button>
                <Button size="1" color='orange' variant="soft" className="text-amber-500 text-lg ml-1 py-3.5 cursor-pointer">&#43;</Button>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Pink Floyd: The Wall (1982)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">LEGO Batman: The Movie – DC Super Heroes Unite (2013)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Agent 327: Operation Barbershop (2017)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>
            </div>
        </>
    )
}