import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';
import FilmCategory from './FilmCategory';

export default function FutureFilms() {
    const films: Film[] = useMemo(() => [
        { id: uuid(), category: "Tier I", title: "A Bittersweet Life", year: 2005 },
        { id: uuid(), category: "Tier I", title: "The Bridge on the River Kwai", year: 1957 },
        { id: uuid(), category: "Tier I", title: "Kiss the Girls and Make Them Die", year: 1966 },
        { id: uuid(), category: "Tier II", title: "Metropolis", year: 1927 },
        { id: uuid(), category: "Tier II", title: "The Florida Project", year: 2017 },
        { id: uuid(), category: "Tier II", title: "Mystic River", year: 2003 },
        { id: uuid(), category: "Animation", title: "Pink Floyd: The Wall", year: 1982 },
        { id: uuid(), category: "Animation", title: "LEGO Batman: The Movie – DC Super Heroes Unite", year: 2013 },
        { id: uuid(), category: "Animation", title: "Agent 327: Operation Barbershop", year: 2017 },
    ], []);

    return (
        <>
            <FilmCategory films={films} category="Tier I" />
            <FilmCategory films={films} category="Tier II" />
            <FilmCategory films={films} category="Animation" />
        </>
    );
}