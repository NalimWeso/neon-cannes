import { ipcRenderer } from 'electron';
import { v4 as uuid } from 'uuid';
import films from '../../../public/films.json';

export default function AddData(isCategory: boolean, id: string | boolean, categoryName?: string, title?: string, year?: number, isSeries?: boolean, season?: number | [number, number] | "Miniseries", end?: null | number | "Present", onSave?: (categoryName: string) => void
) {
    if (isCategory) {
        if (categoryName) {
            const newCategory = {
                position: films.length,
                id: uuid(),
                category: categoryName,
                films: [],
            };

            ipcRenderer.invoke('add-json', newCategory);
            if (onSave) onSave(categoryName);
        }
    } else {
        if (!isSeries || (isSeries && season !== undefined && end !== undefined)) {
            if (title && year && id) {
                const categoryToUpdate = films.find(category => category.id === id);

                if (categoryToUpdate) {
                    const seasonValue = season && (
                        typeof season === 'string' ? season : Array.isArray(season) ? `Seasons ${season[0]}-${season[1]}` : `Season ${season}`
                    );

                    const newMovie = {
                        index: categoryToUpdate.films.length,
                        id: uuid(),
                        title,
                        year,
                        ...(season && { yearEnd: end === undefined ? null : end, season: seasonValue }),
                    };

                    ipcRenderer.invoke('add-json', newMovie, id);
                }
            }
        }
    }
}