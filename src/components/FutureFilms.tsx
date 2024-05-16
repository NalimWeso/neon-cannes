import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';
import FilmCategory from './FilmCategory';

export default function FutureFilms() {
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
            <FilmCategory films={films} category="Tier I" />
            <FilmCategory films={films} category="Animation" />
        </div>
    );
}