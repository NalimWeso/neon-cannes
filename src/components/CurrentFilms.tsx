import { Pencil2Icon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export default function CurrentFilms() {
    const [copy, setCopy] = useState("");

    type Film = {
        id: string,
        title: string,
        year: number,
        dateStart: Date,
        dateEnd?: Date,
        isSeries: boolean,
        season?: string
    }

    const films: Film[] = useMemo(() => [
        { id: uuid(), title: "Judgment at Nuremberg", year: 1961, dateStart: new Date(2024, 0, 1), isSeries: false },
        { id: uuid(), title: "Godzilla", year: 1998, dateStart: new Date(2024, 0, 2), isSeries: false },
        { id: uuid(), title: "Incendies", year: 2010, dateStart: new Date(2024, 0, 3), isSeries: false },
        { id: uuid(), title: "Zero Dark Thirty", year: 2012, dateStart: new Date(2024, 0, 4), isSeries: false },
        { id: uuid(), title: "Angelyne", year: 2022, dateStart: new Date(2024, 0, 5), isSeries: true, season: "Miniseries" },
    ], []);

    films.sort((a: Film, b: Film) => a.dateStart.getTime() - b.dateStart.getTime());

    function formatDate(date: Date) {
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    return (
        <div className="px-2 pt-1">
            {films.map((film) => (
                <div key={film.id} className="my-1 flex">
                    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">{formatDate(film.dateStart)}</Badge>
                    {film.isSeries ? <Badge size="2" color="teal" className="text-emerald-600 ml-1 inline-block">{film.title} ({film.year}) – {film.season}</Badge> : <Badge size="2" color="orange" className="ml-1 inline-block">{film.title} ({film.year})</Badge>}


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

{/* <div className="my-1 flex">
    <Badge size="2" color="orange" className="text-amber-500 min-w-12 justify-center">03.01 - 05.01</Badge>
    <Badge size="2" color="teal" className="text-emerald-600 ml-1 inline-block">Angelyne (2022) – Miniseries</Badge>
    <Button size="1" color="jade" variant="soft" className="text-lime-700 hover:text-lime-600 transition mx-1 cursor-pointer"><Pencil2Icon /></Button>
    <Button size="1" color="cyan" variant="soft" className="text-cyan-700 hover:text-cyan-600 transition cursor-pointer"><CopyIcon /></Button>
    <Badge size="2" color="cyan" className="text-cyan-600 ml-1 h-6 w-8 justify-center"><CheckIcon /></Badge>
</div> */}