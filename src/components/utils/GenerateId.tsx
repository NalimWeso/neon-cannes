import { v4 as uuid } from 'uuid';
import films from '../../../public/films.json';

export default function GenerateId(): string {
    let newId: string;
    let isUnique = true;

    do {
        newId = uuid();

        for (const category of films) {
            if (category.id === newId) {
                isUnique = false;
                break;
            }
            for (const film of category.films) {
                if (film.id === newId) {
                    isUnique = false;
                    break;
                }
            }
            if (!isUnique) break;
        }
    } while (!isUnique);

    return newId;
}