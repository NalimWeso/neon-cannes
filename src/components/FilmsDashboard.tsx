import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState } from 'react';
import FormatDate from './Utils/FormatDate';
import ModifyCategory from './ModifyCategory';
import ModifyMovie from './ModifyMovie';
import AddMovie from './AddMovie';
import films from '../../public/films.json';

export default function FilmsDashboard() {
    const [copy, setCopy] = useState("");
    const sortedFilms = [...films].sort((a, b) => a.position - b.position);

    return (
        <>
            {sortedFilms.map(entry => {
                const category = entry.category;
                const position = entry.position;
                const id = entry.id;
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

                                <ModifyCategory category={category} position={position} id={id} />
                                <AddMovie category={category} id={id} />
                            </div>
                        )}

                        {films.map((film) => (
                            <div className="my-1 flex">
                                {'date' in film && (
                                    <Badge size="2" color="orange" className="text-amber-500 mr-1 min-w-12 justify-center">
                                        {FormatDate(new Date(film.date), film.dateEnd ? new Date(film.dateEnd) : undefined)}
                                    </Badge>
                                )}

                                <Badge size="2" color={film.season ? "teal" : "orange"}>
                                    {film.title} ({film.year}{film.yearEnd && ` - ${film.yearEnd}`}) {film.season && `– ${film.season}`}
                                </Badge>

                                <ModifyMovie
                                    index={film.index}
                                    id={film.id}
                                    title={film.title}
                                    year={film.year}
                                    {...('yearEnd' in film && film.yearEnd ? { yearEnd: film.yearEnd } : {})}
                                    {...('date' in film && film.date ? { date: film.date } : {})}
                                    {...('dateEnd' in film && film.dateEnd ? { dateEnd: film.dateEnd } : {})}
                                    {...('season' in film && film.season ? { season: film.season } : {})}
                                />

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
    )
}