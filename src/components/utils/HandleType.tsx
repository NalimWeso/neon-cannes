export default function HandleType(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    setYear: React.Dispatch<React.SetStateAction<number | "Present" | null | undefined>> |
        React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
    setSeason: React.Dispatch<React.SetStateAction<number | [number, number] | "Miniseries" | undefined>> |
        React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>,
    setDate: React.Dispatch<React.SetStateAction<string | undefined>>,
    parseValue: (value: string) => [number, number] | number | undefined
) {
    const value = e.target.value.toUpperCase();
    e.target.value = value;

    const num = parseInt(value, 10);

    if (type === "Present") {
        setYear(value === 'P' ? 'Present' : (value === 'N' ? null : isNaN(num) ? undefined : num));
    } else if (type === "Miniseries") {
        setSeason(value === 'M' ? 'Miniseries' : parseValue(value));
    } else {
        setDate(value);
    }
}