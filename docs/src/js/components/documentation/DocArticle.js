import Badge from "../Badge";
import CodeBlock from "../CodeBlock";
import CodePanel from "../CodePanel";
import VersionPill from "../VersionPill";
import DocAlert from "./DocAlert";

class DocArticle {
    static build({
        title = null,
        className = "",
        badge = null,
        versionPill = null,
        description = null,
        example = [],
        codePanel = null,
        codeBlock = null,
        alert = null,
    }) {
        const docArticle = document.createElement("article");
        docArticle.className = `ps-2 px-2 border-start border-2 ${className}`;

        if (title)
            docArticle.appendChild(
                DocArticle.#articleHeader(title, badge, versionPill)
            );

        if (description) docArticle.appendChild(description);

        if (codePanel && codeBlock)
            throw new Error("CodePanel and CodeBlock are mutually exclusive.");
        if (codePanel)
            docArticle.appendChild(CodePanel.build({ example, ...codePanel }));
        if (codeBlock)
            docArticle.appendChild(CodeBlock.build({ example, ...codeBlock }));

        if (alert) docArticle.appendChild(DocAlert.build(alert));

        return docArticle;
    }

    static #articleHeader(title, badge, versionPill) {
        const header = document.createElement("div");
        header.className = "d-flex justify-content-between align-items-center";
        const titleContainer = document.createElement("h3");
        titleContainer.className = "text-secondary";
        titleContainer.textContent = title;
        header.appendChild(titleContainer);

        if (badge) header.appendChild(Badge.build(badge));

        if (versionPill) header.appendChild(VersionPill.build(versionPill));

        return header;
    }
}

export default DocArticle;
