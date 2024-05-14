import { Text, Badge, Button } from '@radix-ui/themes';

export default function CurrentFilms() {
    return (
        <>
            <div className="text-base px-2 py-1 leading-6">
                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">01.01</Badge>
                    <Text size="2">&#160;Judgment at Nuremberg&#160;</Text>
                    <Badge size="2" color="orange" className="inline-block">1961</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">01.01</Badge>
                    <Text size="2">&#160;Godzilla&#160;</Text>
                    <Badge size="2" color="orange" className="inline-block">1998</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>

                <div className="cursor-default my-1">
                    <Badge size="2" color="orange" className="text-amber-500">01.01</Badge>
                    <Text size="2">&#160;Incendies&#160;</Text>
                    <Badge size="2" color="orange" className="inline-block">2010</Badge>
                    <Button size="1" color="jade" variant="soft" className="mx-1 mt-0.5 cursor-pointer">Copy</Button>
                    <Button size="1" color="cyan" variant="soft" className="mt-0.5 cursor-pointer">Edit</Button>
                </div>
            </div>
        </>
    )
}