import { Pencil2Icon, PlusIcon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { Badge, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { Film } from './FilmType';

interface Props {
    films: Film[];
    category: string;
}

export default function FilmCategory({ films, category }: Props) {
    const [copy, setCopy] = useState("");

    function formatDate(date: Date) {
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    return (
        <div className={`ml-1 ${category === "Current" ? 'pt-0' : 'pt-6'}`}>
            {category !== "Current" && (
                <>
                    <Badge size="3" color='orange' className="font-bold text-amber-500">{category}</Badge>

                    {category !== "Waiting Room" && (
                        <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                            <Pencil2Icon />
                        </Button>
                    )}

                    <Button size="1" color="orange" variant="soft" className="text-amber-500 ml-1 py-3.5 max-w-8 transition cursor-pointer">
                        <PlusIcon />
                    </Button>
                </>
            )}

            {films.filter(film => film.category === category).map((film) => (
                <div key={film.id} className="my-1 flex">
                    {category === "Current" && (
                        <Badge size="2" color="orange" className="text-amber-500 mr-1 min-w-12 justify-center">
                            {film.date && formatDate(film.date)} {film.dateEnd && `– ${formatDate(film.dateEnd)}`}
                        </Badge>
                    )}

                    <Badge size="2" color={film.season ? "teal" : "orange"}>
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

                    {copy === film.id && <Badge size="2" color="cyan" className="text-cyan-600 ml-1 w-8 h-6"><CheckIcon /></Badge>}
                </div>
            ))}
        </div>
    );
}