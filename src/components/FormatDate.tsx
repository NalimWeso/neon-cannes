export default function FormatDate(date: Date, dateEnd?: Date): string {
    const format = (date: Date) => `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return dateEnd ? `${format(date)} – ${format(dateEnd)}` : format(date);
}