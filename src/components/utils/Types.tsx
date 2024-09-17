export type SeriesControl = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
    React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>
];

export type TypeControl = [
    React.Dispatch<React.SetStateAction<number | string | null | undefined>>,
    React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>
];