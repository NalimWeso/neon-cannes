export default function ParseValue(value: string): number | [number, number] | undefined {
    value = value.replace(/-$/, '');

    if (/^\d+$/.test(value)) {
        return Number(value);
    }

    const dashValue = value.indexOf('-');

    if (dashValue !== -1) {
        const first = value.slice(0, dashValue);
        const second = value.slice(dashValue + 1);

        if (/^\d+$/.test(first) && /^\d+$/.test(second)) {
            return [Number(first), Number(second)];
        }
    }
}