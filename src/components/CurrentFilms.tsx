import { Pencil2Icon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';

export default function CurrentFilms() {
    const [copy, setCopy] = useState("");

    const films: Film[] = useMemo(() => [
        { id: uuid(), title: "Judgment at Nuremberg", year: 1961, date: new Date(2024, 0, 1) },
        { id: uuid(), title: "Godzilla", year: 1998, date: new Date(2024, 0, 2) },
        { id: uuid(), title: "Incendies", year: 2010, date: new Date(2024, 0, 3) },
        { id: uuid(), title: "Zero Dark Thirty", year: 2012, date: new Date(2024, 0, 4) },
        { id: uuid(), title: "Angelyne", year: 2022, date: new Date(2024, 0, 5), dateEnd: new Date(2024, 0, 7), season: "Miniseries" },
        { id: uuid(), title: "Fargo", year: 2014, yearEnd: "Present", date: new Date(2024, 0, 8), dateEnd: new Date(2024, 0, 30), season: "Seasons 1-5" },
    ], []);

    films.sort((a: Film, b: Film) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));

    function formatDate(date: Date) {
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    return (
        <div className="px-2 pt-1">
            {films.map((film) => (
                <div key={film.id} className="my-1 flex">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">
                        {film.date && formatDate(film.date)} {film.dateEnd && `– ${formatDate(film.dateEnd)}`}
                    </Badge>

                    <Badge size="2" color={film.season ? "teal" : "orange"} className="ml-1 inline-block">
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