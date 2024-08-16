import { ipcRenderer } from 'electron';
import films from '../../../public/films.json';

export default function DeleteContent(id: string, isCategory: boolean) {
    let updatedData;

    if (isCategory) {
        const itemToDelete = films.find(item => item.id === id);
        const positionToDelete = itemToDelete?.position;

        if (positionToDelete !== undefined) {
            updatedData = films
                .filter(item => item.id !== id)
                .map(item => {
                    if (item.position > positionToDelete) {
                        return { ...item, position: item.position - 1 };
                    }
                    return item;
                });
        }
    } else {
        updatedData = films.map(category => {
            if (category.films) {
                const updatedFilms = category.films.filter(film => film.id !== id);

                if (updatedFilms.length < category.films.length) {
                    const filmToDelete = category.films.find(film => film.id === id);
                    if (filmToDelete?.index !== null && filmToDelete?.index !== undefined) {
                        updatedFilms.forEach((film, index) => {
                            film.index = index;
                        });
                    }
                }

                return {
                    ...category,
                    films: updatedFilms,
                };
            }
            return category;
        });
    }

    ipcRenderer.invoke('write-json', updatedData);
}