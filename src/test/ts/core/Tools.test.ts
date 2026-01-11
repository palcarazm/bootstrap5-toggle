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

        it("escapes ampersand", () => {
            expect(sanitize("&", { mode: SanitizeMode.TEXT })).toBe("&amp;");
        });

        it("escapes less than", () => {
            expect(sanitize("<", { mode: SanitizeMode.TEXT })).toBe("&lt;");
        });

        it("escapes greater than", () => {
            expect(sanitize(">", { mode: SanitizeMode.TEXT })).toBe("&gt;");
        });

        it("escapes double quotes", () => {
            expect(sanitize('"', { mode: SanitizeMode.TEXT })).toBe("&quot;");
        });

        it("escapes single quotes", () => {
            expect(sanitize("'", { mode: SanitizeMode.TEXT })).toBe("&#39;");
        });

        it("escapes slash", () => {
            expect(sanitize("/", { mode: SanitizeMode.TEXT })).toBe("&#x2F;");
        });

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
        it("removes script tags", () => {
            const input = '<script>alert("xss")</script>Safe text';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("Safe text");
        });

        it("removes script tags with attributes", () => {
            const input = '<script type="text/javascript">alert("xss")</script>Safe';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("Safe");
        });

        it("allows safe tags", () => {
            const input = "<b>bold</b> and <i>italic</i>";
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("<b>bold</b> and <i>italic</i>");
        });

        it("removes dangerous attributes", () => {
            const input = '<span onclick="alert(1)" onmouseover="evil()">click</span>';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("<span>click</span>");
        });

        it("allows safe attributes", () => {
            const input = '<span class="my-class" style="color: red;">styled</span>';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe('<span class="my-class" style="color: red;">styled</span>');
        });

        it("handles img tags safely", () => {
            const input = '<img src="image.jpg" alt="image" onerror="alert(1)">';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe('<img src="image.jpg" alt="image">');
        });

        it("removes javascript: protocol in href/src", () => {
            const input = '<a href="javascript:alert(1)">click</a><img src="javascript:evil()">';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("click<img>");
        });

        it("allows data:image/ protocol for images", () => {
            const input = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">');
        });

        it("removes dangerous data: protocol", () => {
            const input = '<img src="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">';
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("<img>");
        });

        it("handles nested elements correctly", () => {
            const input = "<div><b>bold <i>italic</i></b> text</div>";
            const result = sanitize(input, { mode: SanitizeMode.HTML });
            expect(result).toBe("<b>bold <i>italic</i></b> text");
        });
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