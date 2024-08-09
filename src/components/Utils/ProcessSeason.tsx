export default function ProcessSeason(season: string) {
    const regex = /Seasons?\s+(\d+(-\d+)?)/i;
    const match = season.match(regex);

    return match ? match[1] : 'Miniseries';
}