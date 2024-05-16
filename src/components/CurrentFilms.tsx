import { Badge, Button } from '@radix-ui/themes';

export default function CurrentFilms() {
    return (
        <>
            <div className="px-2 py-1 leading-6">
                <div className="my-1">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">01.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Judgment at Nuremberg (1961)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer">Edit</Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer">Copy</Button>
                </div>

                <div className="my-1">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">02.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Godzilla (1998)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer">Edit</Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer">Copy</Button>
                </div>

                <div className="my-1">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">03.01 - 06.01</Badge>
                    <Badge size="2" color="teal" className="text-emerald-600 ml-1 inline-block">Gaslit (2022) – Miniseries</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer">Edit</Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer">Copy</Button>
                </div>

                <div className="my-1">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">07.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Incendies (2010)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer">Edit</Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer">Copy</Button>
                </div>
            </div>
        </>
    )
}