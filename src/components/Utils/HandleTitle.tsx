export default function HandleTitle(element: string, setter: (value: string) => void) {
    if (element.trim()) {
        setter(element.trim().replace(/\s+/g, ' '));
    }
}