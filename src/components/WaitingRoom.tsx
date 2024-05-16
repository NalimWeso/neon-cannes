import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Film } from './FilmType';
import FilmCategory from './FilmCategory';

export default function WaitingRoom() {
    const films: Film[] = useMemo(() => [
        { id: uuid(), category: "Waiting Room", title: "Star Wars: The Bad Batch", year: 2021, yearEnd: 2024, season: "Season 3" },
        { id: uuid(), category: "Waiting Room", title: "The Peasants", year: 2023 },
        { id: uuid(), category: "Waiting Room", title: "Rocketman", year: 2019 }
    ], []);

    return (
        <FilmCategory films={films} category="Waiting Room" />
    )
}