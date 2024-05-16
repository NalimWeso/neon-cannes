import { Pencil2Icon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';

export default function FutureFilms() {
    const [copy, setCopy] = useState("");

    const films: Film[] = useMemo(() => [
        { id: uuid(), title: "A Bittersweet Life", year: 2005, category: "Tier I" },
        { id: uuid(), title: "The Bridge on the River Kwai", year: 1957, category: "Tier I" },
        { id: uuid(), title: "Kiss the Girls and Make Them Die", year: 1966, category: "Tier I" },
        { id: uuid(), title: "Pink Floyd: The Wall", year: 1982, category: "Animation" },
        { id: uuid(), title: "LEGO Batman: The Movie – DC Super Heroes Unite", year: 2013, category: "Animation" },
        { id: uuid(), title: "Agent 327: Operation Barbershop", year: 2017, category: "Animation" },
    ], []);

    return (
        <div className='px-2'>
            <div className="pt-4">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Tier I</Badge>
                <Button size="1" color="orange" variant="soft" className="text-amber-500 text-xs ml-1 py-3.5 transition cursor-pointer"><Pencil2Icon /></Button>

                {films.filter(film => film.category === "Tier I").map((film) => (
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

            <div className="pt-4">
                <Badge size="3" color='orange' className="font-bold text-amber-500">Animation</Badge>
                <Button size="1" color="orange" variant="soft" className="text-amber-500 text-xs ml-1 py-3.5 transition cursor-pointer"><Pencil2Icon /></Button>

                {films.filter(film => film.category === "Animation").map((film) => (
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
        </div>
    )
}