import { Badge, Button } from '@radix-ui/themes';

export default function CurrentFilms() {
    return (
        <>
            <div className="text-base px-2 py-1 leading-6">
                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">01.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Judgment at Nuremberg (1961)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">02.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Godzilla (1998)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">03.01</Badge>
                    <Badge size="2" color="orange" className="ml-1 inline-block">Incendies (2010)</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>
            </div>
        </>
    )
}