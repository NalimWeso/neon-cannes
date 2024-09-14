export default function HandleSeries(
    bool: boolean,
    [isSeries, setIsSeries, setEnd, setSeason]: [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<number | string | null | undefined>>, React.Dispatch<React.SetStateAction<number | [number, number] | string | undefined>>]
) {
    setIsSeries(bool ? !isSeries : false);

    if (bool) {
        setEnd(undefined);
        setSeason(undefined);
    }
}