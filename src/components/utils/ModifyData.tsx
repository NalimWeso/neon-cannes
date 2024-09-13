export default function ModifyData() {
    const oldIndex = index;
    const newIndex = filmIndex;

    const updatedData = films.map(category => {
        if (category === catContent && category.films) {
            const updatedFilms = category.films.map(film => {
                if (film.id === id) {
                    const update: {
                        index: number | null,
                        title: string;
                        year: number;
                        yearEnd?: string | number | null;
                        season?: string;
                        date?: string;
                        dateEnd?: string;
                    } = {
                        ...film,
                        index: newIndex,
                        title: filmTitle,
                        year: filmYear
                    };

                    if ('yearEnd' in film) {
                        if (typeof filmYearEnd === 'number') {
                            update.yearEnd = Number(filmYearEnd);
                        } else if (typeof filmYearEnd === 'string') {
                            update.yearEnd = String(filmYearEnd);
                        } else {
                            update.yearEnd = null;
                        }

                        update.season = typeof filmSeason === 'string' ? filmSeason : Array.isArray(filmSeason) ? `Seasons ${filmSeason[0]}-${filmSeason[1]}` : `Season ${filmSeason}`;
                    }

                    return update;
                } else {
                    if (oldIndex !== null && newIndex !== null && film.index !== null) {
                        if (oldIndex < newIndex) {
                            if (film.index > oldIndex && film.index <= newIndex) {
                                return {
                                    ...film,
                                    index: film.index - 1
                                };
                            }
                        } else if (oldIndex > newIndex) {
                            if (film.index >= newIndex && film.index < oldIndex) {
                                return {
                                    ...film,
                                    index: film.index + 1
                                };
                            }
                        }
                    }
                }

                return film;
            });

            updatedFilms.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

            return {
                ...category,
                films: updatedFilms,
            };
        }
        return category;
    });

    ipcRenderer.invoke('write-json', updatedData);
}