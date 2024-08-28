export default function HandleChange(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    const value = e.target.value.toUpperCase();
    e.target.value = value;

    const num = parseInt(value, 10);

    if (type === "Present") {
        setFilmYearEnd(value === 'P' ? 'Present' : (value === 'N' ? null : isNaN(num) ? undefined : num))
    } else if (type === "Miniseries") {
        setFilmSeason(value === 'M' ? 'Miniseries' : parseValue(value));
    } else {
        setFilmDate(value);
    }
}