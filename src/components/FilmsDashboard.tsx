import { Pencil2Icon, PlusIcon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button, Text, TextField, RadioCards } from '@radix-ui/themes';
import { useState } from 'react';
import data from '../../public/data.json';

import * as Dialog from '@radix-ui/react-dialog';

export default function FilmsDashboard() {
    const [copy, setCopy] = useState("");
    const sortedData = [...data].sort((a, b) => a.position - b.position);

    const [isSeries, setIsSeries] = useState(false);

    function handleToggle(num: number) {
        setIsSeries(num === 1 ? !isSeries : false);
    }

    function formatDate(date: Date) {
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    return (
        <>
            {sortedData.map(entry => {
                const category = entry.category;
                const films = category === "Current" ?
                    [...entry.films]
                        .filter(film => 'date' in film)
                        .sort((a, b) => ('date' in a && 'date' in b) ?
                            (a.date && b.date ? new Date(a.date).getTime() - new Date(b.date).getTime() : 0) : 0
                        ) :
                    entry.films.slice().sort((a, b) =>
                        ('index' in a && 'index' in b) ? (a.index || 0) - (b.index || 0) : 0
                    );

                return (
                    <div className={`ml-1 ${category === "Current" ? 'pt-0' : 'pt-6'}`}>
                        {category !== "Current" && (
                            <div className="flex items-center">
                                <Badge size="3" color='orange' className="text-amber-500 font-bold">{category}</Badge>

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

                                    <Dialog.Root>
                                        <Dialog.Trigger>
                                            <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                                                <PlusIcon />
                                            </Button>
                                        </Dialog.Trigger>

                                        <Dialog.Portal>
                                            <Dialog.Overlay className='fixed inset-0 bg-black/15'>
                                                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white border-2 border-titlebar p-3 shadow w-full max-w-md bg-orange-950'>
                                                    <div className="flex justify-between items-center">
                                                        <Dialog.Title className='text-amber-500 text-2xl font-bold'>
                                                            {category}
                                                        </Dialog.Title>
                                                    </div>

                                                    <div className='mt-2'>
                                                        <RadioCards.Root color="orange" variant='classic'
                                                            defaultValue="1"
                                                            columns={{ initial: '1', sm: '2' }}
                                                            onValueChange={() => handleToggle(1)}
                                                        >
                                                            <RadioCards.Item value="1" className='p-2 mt-2 rounded cursor-pointer hover:bg-orange-800 transition mr-1'>
                                                                <Text className="text-amber-500 font-bold">Film</Text>
                                                            </RadioCards.Item>
                                                            <RadioCards.Item value="2" className='p-2 mt-2 rounded cursor-pointer hover:bg-orange-800 transition ml-1'>
                                                                <Text className="text-amber-500 font-bold">Series</Text>
                                                            </RadioCards.Item>
                                                        </RadioCards.Root>
                                                    </div>

                                                    <div className='mt-4'>
                                                        <TextField.Root placeholder={!isSeries ? "Star Wars" : "Mr. Robot"} variant="soft">
                                                            <TextField.Slot className='text-amber-500 font-bold mr-6 selection:bg-red-500'>
                                                                Title
                                                            </TextField.Slot>
                                                        </TextField.Root>

                                                        <TextField.Root placeholder={!isSeries ? "1977" : "2015"} variant="soft">
                                                            <TextField.Slot className='text-amber-500 font-bold mr-6'>
                                                                Year
                                                            </TextField.Slot>
                                                        </TextField.Root>

                                                        {isSeries === true && (
                                                            <TextField.Root placeholder="2019 / Present" variant="soft">
                                                                <TextField.Slot className='text-amber-500 font-bold mr-5'>
                                                                    End?
                                                                </TextField.Slot>
                                                            </TextField.Root>
                                                        )}
                                                    </div>

                                                    <div className='text-right mt-2'>
                                                        <Dialog.Close>
                                                            <Button size="1" color="orange" variant="soft" className="text-amber-500 py-1 w-16 rounded transition"
                                                                onClick={() => handleToggle(0)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Dialog.Close>

                                                        <Button size="1" color="orange" variant="soft" radius="medium" className="text-amber-500 ml-2 py-1 w-16 rounded transition">
                                                            Add
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog.Overlay>
                                        </Dialog.Portal>
                                    </Dialog.Root>
                                </>
                            </div>
                        )}

                        {films.map((film) => (
                            <div className="my-1 flex">
                                {'date' in film && (
                                    <Badge size="2" color="orange" className="text-amber-500 mr-1 min-w-12 justify-center">
                                        {formatDate(new Date(film.date))} {film.dateEnd ? `– ${formatDate(new Date(film.dateEnd))}` : ''}
                                    </Badge>
                                )}

                                <Badge size="2" color={film.season ? "teal" : "orange"}>
                                    {film.title} ({film.year}{film.yearEnd && ` - ${film.yearEnd}`}) {film.season && `– ${film.season}`}
                                </Badge>

                                <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 cursor-pointer">
                                    <Pencil2Icon />
                                </Button>

                                <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(film.title);
                                        setCopy(film.id);
                                        setTimeout(() => setCopy(""), 300);
                                    }}>
                                    <CopyIcon />
                                </Button>

                                {copy === film.id && <Badge size="2" color="cyan" className="text-cyan-600 ml-1 w-8 h-6"><CheckIcon /></Badge>}
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
}