export type Film = {
    id: string,
    category: string,
    title: string,
    year: number,
    yearEnd?: number | "Present",
    date?: Date,
    dateEnd?: Date,
    season?: string,
}