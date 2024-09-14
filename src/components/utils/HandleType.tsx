import ParseValue from "./ParseValue";

export default function HandleType(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "Present" | "Miniseries" | "Date",
    [setEnd, setSeason]: [
        React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
        React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>
    ]
) {
    const value = e.target.value.toUpperCase();
    e.target.value = value;

    const num = parseInt(value, 10);

    if (type === "Present") {
        setEnd(value === 'P' ? 'Present' : (value === 'N' ? null : isNaN(num) ? undefined : num));
    } else if (type === "Miniseries") {
        setSeason(value === 'M' ? 'Miniseries' : ParseValue(value));
    } else {
        // setDate(value)
    }
}