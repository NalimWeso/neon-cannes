export default function HandleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, type?: string) {
    const current = e.currentTarget.value;
    const length = current.length;
    const initialKeys = ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft'];
    const allowedKeys = [...initialKeys];
    const key = e.key;

    if (type === "Present" || type === "Miniseries" || type === "Date") {
        initialKeys.push(...(type === 'Present' ? ['P', 'p', 'N', 'n'] : type === 'Date' ? ['.', '-'] : ['M', 'm', '-']));
    }

    if (
        (!(key >= '0' && key <= '9') && !initialKeys.includes(key)) ||
        (length === 0 && type !== 'Date' && key === '0') ||
        (length >= (type === 'Present' ? 4 : (type === 'Date' ? 11 : 7)) && !allowedKeys.includes(key)) ||
        (length > 0 && isNaN(Number(key)) && !allowedKeys.includes(key) && key !== '-' && key !== '.') ||
        (length > 0 && ['M', 'P', 'N'].includes(current[0].toUpperCase()) && !allowedKeys.includes(key)) ||
        (key === '.' && (current.split('.').length > (current.includes('-') ? 2 : 1) || length === 0 || isNaN(Number(current[current.length - 1])))) ||
        (key === '.' && (current.split('.').length > 2 || length === 0)) ||
        (key === '-' && (length === 0 || current.includes('-')))
    ) {
        e.preventDefault();
    }
}