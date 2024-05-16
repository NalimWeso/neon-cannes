import { Pencil2Icon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';

export default function WaitingRoom() {
    const [copy, setCopy] = useState("");

    const films: Film[] = useMemo(() => [
        { id: uuid(), title: "Star Wars: The Bad Batch", year: 2021, yearEnd: 2024, season: "Season 3" },
        { id: uuid(), title: "The Peasants", year: 2023 },
        { id: uuid(), title: "Rocketman", year: 2019 }
    ], []);

    return (
        <div className='px-2 pt-4'>
            <Badge size="3" color='orange' className="font-bold text-amber-500">Waiting Room</Badge>

            {films.map((film) => (
                <div key={film.id} className="my-1 flex">
                    <Badge size="2" color={film.season ? "teal" : "orange"} className="inline-block">
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

                    {copy === film.id && <Badge size="2" color="cyan" className="text-cyan-600 ml-1 h-6 w-8 justify-center"><CheckIcon /></Badge>}
                </div>
            ))}
        </div>
    )
}