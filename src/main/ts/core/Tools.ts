export function sanitize(text: string | null): string | null {
    if (!text) return text;

    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };

    return text.replace(/[&<>"'/]/g, (m) => map[m]);
}

/**
 * Checks if the given string is a valid numeric value.
 * 
 * A valid numeric value is a `string` that starts with an optional plus or minus sign,
 * followed by one or more digits, optionally followed by a decimal point and
 * one or more digits.
 * 
 * Examples of valid numeric values include "123", "-123", "+123.45", "-123.45", etc.
 * Examples of invalid numeric values include "abc", "123abc", "123.abc", etc.
 * @param {string | number} value The string or number to check for being a valid numeric value.
 * @returns {boolean} `true` if the string contains a valid numeric value, `false` otherwise.
 */
export function isNumeric(value: string | number): boolean {
    return /^[+-]?\d+(\.\d+)?$/.test(value.toString().trim());
}