import { Badge, Button } from '@radix-ui/themes';

export default function FutureFilms() {
    return (
        <>
            <div className="text-base p-1 leading-6">
                <h4 className="font-bold text-amber-500 my-1">Great Category:</h4>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="ml-1 inline-block">A Bittersweet Life (2005)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="ml-1 inline-block">The Bridge on the River Kwai (1957)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="ml-1 inline-block">Kiss the Girls and Make Them Die (1966)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>
            </div>

            <div className="text-base p-1 leading-6">
                <h4 className="font-bold text-amber-500 my-1">Animation:</h4>

                <p className="inline-block hover:underline decoration-amber-500 cursor-pointer">Pink Floyd: The Wall (1982)</p><br />
                <p className="inline-block hover:underline decoration-amber-500 cursor-pointer">LEGO Batman: The Movie – DC Super Heroes Unite (2013)</p><br />
                <p className="inline-block hover:underline decoration-amber-500 cursor-pointer">Agent 327: Operation Barbershop (2017)</p><br />
            </div>
        </>
    )
}