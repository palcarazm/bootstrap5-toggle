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
