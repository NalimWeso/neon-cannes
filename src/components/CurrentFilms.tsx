import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';
import FilmCategory from './FilmCategory';

export default function CurrentFilms() {
    const films: Film[] = useMemo(() => [
        { id: uuid(), category: "Current", title: "Judgment at Nuremberg", year: 1961, date: new Date(2024, 0, 1) },
        { id: uuid(), category: "Current", title: "Godzilla", year: 1998, date: new Date(2024, 0, 2) },
        { id: uuid(), category: "Current", title: "Incendies", year: 2010, date: new Date(2024, 0, 3) },
        { id: uuid(), category: "Current", title: "Zero Dark Thirty", year: 2012, date: new Date(2024, 0, 4) },
        { id: uuid(), category: "Current", title: "Angelyne", year: 2022, date: new Date(2024, 0, 5), dateEnd: new Date(2024, 0, 7), season: "Miniseries" },
        { id: uuid(), category: "Current", title: "Fargo", year: 2014, yearEnd: "Present", date: new Date(2024, 0, 8), dateEnd: new Date(2024, 0, 30), season: "Seasons 1-5" },
    ], []);

    films.sort((a: Film, b: Film) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));

    return (
        <FilmCategory films={films} category="Current" />
    )
}