import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';
import FilmCategory from './FilmCategory';

export default function WaitingRoom() {
    const films: Film[] = useMemo(() => [
        { id: uuid(), title: "Star Wars: The Bad Batch", year: 2021, yearEnd: 2024, season: "Season 3", category: "Waiting Room" },
        { id: uuid(), title: "The Peasants", year: 2023, category: "Waiting Room" },
        { id: uuid(), title: "Rocketman", year: 2019, category: "Waiting Room" }
    ], []);

    return (
        <div className='px-2 pt-4'>
            <FilmCategory films={films} category="Waiting Room" />
        </div>
    )
}