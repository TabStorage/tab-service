export function ISODateString(date: Date) {
    return date.getUTCFullYear() + '-'
        + pad(date.getUTCMonth() + 1) + '-'
        + pad(date.getUTCDate()) + ' '
        + pad(date.getUTCHours()) + ':'
        + pad(date.getUTCMinutes()) + ':'
        + pad(date.getUTCSeconds())
}

function pad(n: number) {
    return n < 10 ? '0' + n : n;
}