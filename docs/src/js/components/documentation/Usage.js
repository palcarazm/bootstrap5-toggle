import DocSection from "./DocSection";
import DocArticle from "./DocArticle";

class Usage extends DocSection {
    static build() {
        return super.build("usage", "Usage", [Usage.#html(), Usage.#js()]);
    }

    static #html() {
        const description = document.createElement("p");
        description.innerHTML = "Simply add <code>data-toggle=\"toggle\"</code> to convert checkboxes into toggles.";

        const asyncNote = document.createElement("p");
        asyncNote.innerHTML = "<code>[data-toggle=\"toggle\"]</code> auto-init runs on <code>window.onload</code> and awaits <code>init().then(attach)</code> internally.";

        return DocArticle.build({
            title: "Initialize with HTML",
            description: DocArticle.fragment(description, asyncNote),
            codeBlock: {
                language: "html",
                code: "<input type=\"checkbox\" data-toggle=\"toggle\" checked>",
            },
        });
    }

    static #js() {
        const description = document.createElement("p");
        description.innerHTML = "Simply call the <code>bootstrapToggle</code> method to convert checkboxes into toggles. See <a href=\"#api\">Options</a> for additional colors, etc.</p>";

        const asyncNote = document.createElement("p");
        asyncNote.innerHTML = "<code>element.bootstrapToggle()</code> returns synchronously and starts the lifecycle in a microtask. <code>element.bsToggle</code> is set synchronously (in the constructor) but <code>element.bsToggle.isAttached()</code> is <code>false</code> until the microtask drains.";

        const ecmas = "document.querySelector(mySelector).bootstrapToggle();";
        const jquery = "$(mySelector).bootstrapToggle();";

        return DocArticle.build({
            title: "Initialize with JavaScript",
            description: DocArticle.fragment(description, asyncNote),
            codePanel: {
                name: "usage-js",
                language: "javascript",
                contents: [ecmas, jquery],
            },
        });
    }
}

export default Usage;
