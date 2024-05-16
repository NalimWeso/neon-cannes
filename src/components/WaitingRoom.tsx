import { Pencil2Icon, CopyIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';

export default function WaitingRoom() {
    return (
        <>
            <div className="px-2 pt-6">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Waiting Room</Badge>

                <div className="cursor-default my-1">
                    <Badge size="2" color="teal" className="text-emerald-600 inline-block">Star Wars: The Bad Batch (2021 - 2024) – Season 3</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="teal" className="text-emerald-600 inline-block">Fargo (2014 - Present) – Seasons 1-5</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">The Peasants (2023)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="inline-block">Rocketman (2019)</Badge>
                    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 mt-0.5 cursor-pointer"><Pencil2Icon /></Button>
                    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition mt-0.5 cursor-pointer"><CopyIcon /></Button>
                </div>
            </div>
        </>
    )
}