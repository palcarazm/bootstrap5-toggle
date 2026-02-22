export type SanitizeOptions = {
    mode:SanitizeMode;
}
export enum SanitizeMode{
    HTML = "HTML",
    TEXT = "TEXT"
}


/**
 * Sanitizes a given text string according to the provided options.
 * If the input text is null, it will return null.
 * If the input text is not null, it will sanitize the text according to the provided mode.
 * If the mode is HTML, it will sanitize the text using the sanitizeHTML function.
 * If the mode is TEXT, it will sanitize the text using the sanitizeText function.
 * @param text The text string to sanitize.
 * @param opts The options to use for sanitizing the text.
 * @return The sanitized text string, or null if the input text was null.
 */
export function sanitize(text: string | null, opts: SanitizeOptions): string | null{
    if (!text) return text;
    switch (opts.mode) {
    case SanitizeMode.HTML:
        return sanitizeHTML(text);
    
    case SanitizeMode.TEXT:
        return sanitizeText(text);
    }
}

/**
 * Sanitizes a given text string, replacing special characters with their HTML entities.
 * If the input text is null, it will return null.
 * @param text The text string to sanitize.
 * @return The sanitized text string, or null if the input text was null.
 */
function sanitizeText(text: string ): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    // Using replace with regex for single-pass character mapping compatible with ES5
    return text.replace(/[&<>"'/]/g, (m) => map[m]);
}

/**
 * Sanitizes HTML content using an allow-list approach to prevent XSS attacks.
 * 
 * @param html The HTML string to sanitize
 * @param options Configuration options for allowed tags and attributes
 * @returns Sanitized HTML string
 */
function sanitizeHTML(
    html: string
): string {    
    const config = {
        allowedTags: ["b", "i", "strong", "em", "span", "small", "sup", "sub", "img"],
        allowedAttributes: ["class", "style", "src", "alt", "title", "data-*"]
    };
    
    // Implementation using DOMParser for browser compatibility
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
        
    // Sanitize all nodes in the document body
    const bodyChildren = Array.from(doc.body.childNodes);
    bodyChildren.forEach((node) => sanitizeNode(node, config));
    
    return doc.body.innerHTML;
}

/**
 * Sanitizes a single node in the document tree.
 * 
 * For element nodes, it removes disallowed tags and attributes.
 * For text nodes, it keeps them as is.
 * 
 * Recursively sanitizes all children of an element node.
 * 
 * @param node The node to sanitize
 * @param config Configuration options for allowed tags and attributes
 */
function sanitizeNode (node: Node, config: { allowedTags: string[], allowedAttributes: string[] }): void {
    const sanitizeNodeRecursive = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const tagName = element.tagName.toLowerCase();
            
            // Remove disallowed tags
            if (!config.allowedTags.includes(tagName)) {
                // Replace disallowed element with its text content
                const fragment = document.createDocumentFragment();
                Array.from(element.childNodes).forEach(child => {
                    fragment.appendChild(child.cloneNode(true));
                });
                element.parentNode?.replaceChild(fragment, element);
                return;
            }
            
            // Remove disallowed attributes
            Array.from(element.attributes).forEach(attr => {
                const attrName = attr.name.toLowerCase();
                const isAllowed = config.allowedAttributes.some(allowed => 
                    allowed.endsWith("*") ? attrName.startsWith(allowed.slice(0, -1)) : attrName === allowed
                );
                
                if (isAllowed) {
                    sanitizeAllowedAttr(element, attr, attrName);
                } else {
                    element.removeAttribute(attr.name);
                }
            });
            
            // Recursively sanitize children
            const children = Array.from(element.childNodes);
            children.forEach(sanitizeNodeRecursive);
        } else if (node.nodeType === Node.TEXT_NODE) {
            // Text nodes are safe, keep them as is
            return;
        }
    };
    sanitizeNodeRecursive(node);
}

/**
 * Sanitizes an allowed attribute by removing it if its value is a dangerous protocol.
 * Only works for "src" and "href" attributes.
 * @param element The element to check for the attribute.
 * @param attr The attribute to check the value of.
 * @param attrName The name of the attribute to check (either "src" or "href").
 */
function sanitizeAllowedAttr (element: HTMLElement, attr: Attr, attrName: string): void {
    if (attrName !== "src" && attrName !== "href") return;
    
    const value = attr.value.toLowerCase();
    
    // sonar typescript:S1523 - This is security detection, not execution
    const isDangerousProtocol = value.startsWith("javascript:") ||
                                value.startsWith("vbscript:") ||
                                (value.startsWith("data:") && !value.startsWith("data:image/"));
    
    if (isDangerousProtocol) {
        element.removeAttribute(attr.name);
    }
};

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