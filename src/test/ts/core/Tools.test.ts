import { isNumeric, sanitize, SanitizeMode } from "../../../main/ts/core/Tools";

describe("sanitize", () => {
    it("returns null when input is null", () => {
        expect(sanitize(null, { mode: SanitizeMode.TEXT })).toBeNull();
        expect(sanitize(null, { mode: SanitizeMode.HTML })).toBeNull();
    });
    it("handles empty string", () => {
        expect(sanitize("", { mode: SanitizeMode.TEXT })).toBe("");
        expect(sanitize("", { mode: SanitizeMode.HTML })).toBe("");
    });

    describe("text mode", () => {
        it("returns empty string when input is empty", () => {
            expect(sanitize("", { mode: SanitizeMode.TEXT })).toBe("");
        });

        it("does not modify a safe string", () => {
            const text = "Hello world 123";
            expect(sanitize(text, { mode: SanitizeMode.TEXT })).toBe(text);
        });

        const escapeCases = [
            { input: "&", expected: "&amp;", description: "ampersand" },
            { input: "<", expected: "&lt;", description: "less than" },
            { input: ">", expected: "&gt;", description: "greater than" },
            { input: '"', expected: "&quot;", description: "double quotes" },
            { input: "'", expected: "&#39;", description: "single quotes" },
            { input: "/", expected: "&#x2F;", description: "slash" },
        ];

        it.each(escapeCases)(
            "escapes $description",
            ({ input, expected }) => {
                expect(sanitize(input, { mode: SanitizeMode.TEXT })).toBe(expected);
            }
        );

        it("escapes multiple characters in the same string", () => {
            const text = "<script>alert(\"xss\")</script>";
            expect(sanitize(text, { mode: SanitizeMode.TEXT })).toBe(
                "&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;"
            );
        });

        it("escapes characters appearing multiple times", () => {
            expect(sanitize("&&&&", { mode: SanitizeMode.TEXT })).toBe("&amp;&amp;&amp;&amp;");
        });
    });

    describe("html mode", () => {
        const htmlTestCases = [
            {
                description: "removes script tags",
                input: '<script>alert("xss")</script>Safe text',
                expected: "Safe text"
            },
            {
                description: "removes script tags with attributes",
                input: '<script type="text/javascript">alert("xss")</script>Safe',
                expected: "Safe"
            },
            {
                description: "allows safe tags",
                input: "<b>bold</b> and <i>italic</i>",
                expected: "<b>bold</b> and <i>italic</i>"
            },
            {
                description: "removes dangerous attributes",
                input: '<span onclick="alert(1)" onmouseover="evil()">click</span>',
                expected: "<span>click</span>"
            },
            {
                description: "allows safe attributes",
                input: '<span class="my-class" style="color: red;">styled</span>',
                expected: '<span class="my-class" style="color: red;">styled</span>'
            },
            {
                description: "handles img tags safely",
                input: '<img src="image.jpg" alt="image" onerror="alert(1)">',
                expected: '<img src="image.jpg" alt="image">'
            },
            {
                description: "removes javascript: protocol in href/src",
                input: '<a href="javascript:alert(1)">click</a><img src="javascript:evil()">',
                expected: "click<img>"
            },
            {
                description: "removes vbscript: protocol in href/src",
                input: '<a href="vbscript:alert(1)">click</a><img src="vbscript:evil()">',
                expected: "click<img>"
            },
            {
                description: "allows data:image/ protocol for images",
                input: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">',
                expected: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">'
            },
            {
                description: "removes dangerous data: protocol",
                input: '<img src="data:text/html;base64,PHNjcmlwdD5hbGVydCg1KTwvc2NyaXB0Pg==">',
                expected: "<img>"
            },
            {
                description: "handles nested elements correctly",
                input: "<div><b>bold <i>italic</i></b> text</div>",
                expected: "<b>bold <i>italic</i></b> text"
            },
        ];
        
        it.each(htmlTestCases)(
            "$description",
            ({ input, expected }) => {
                const result = sanitize(input, { mode: SanitizeMode.HTML });
                expect(result).toBe(expected);
            }
        );
    });
});

describe("isNumeric(value: string): boolean",()=>{
    it("returns true for valid numeric values", () => {
        expect(isNumeric(123)).toBe(true);
        expect(isNumeric(-123)).toBe(true);
        expect(isNumeric("123")).toBe(true);
        expect(isNumeric("-123")).toBe(true);
        expect(isNumeric("+123")).toBe(true);
        expect(isNumeric("123.45")).toBe(true);
        expect(isNumeric("-123.45")).toBe(true);
        expect(isNumeric("+123.45")).toBe(true);
    });

    it("returns false for invalid numeric values", () => {
        expect(isNumeric("abc")).toBe(false);
        expect(isNumeric("123abc")).toBe(false);
        expect(isNumeric("123.abc")).toBe(false);
    });
});