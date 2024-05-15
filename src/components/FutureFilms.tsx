import { Badge, Button } from '@radix-ui/themes';

export default function FutureFilms() {
    return (
        <>
            <div className="px-2 pt-6 leading-6">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Great Category:</Badge>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">A Bittersweet Life (2005)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">The Bridge on the River Kwai (1957)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Kiss the Girls and Make Them Die (1966)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>
            </div>

            <div className="px-2 pt-6 leading-6">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Animation:</Badge>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Pink Floyd: The Wall (1982)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">LEGO Batman: The Movie – DC Super Heroes Unite (2013)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Agent 327: Operation Barbershop (2017)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>
            </div>
        </>
    )
}