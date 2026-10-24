import CodeBlock from "./CodeBlock";
import Example from "./Example";

class CodePanel {
    static build({
        name,
        language,
        tabs = ["ECMAScript", "jQuery"],
        contents,
        example = [],
    }) {
        const codePanel = document.createElement("div");

        if (tabs.length !== contents.length)
            throw new Error("Tabs and contents arrays must have the same length.");

        if (tabs.length === 0 || contents.length === 0)
            throw new Error("Tabs and contents arrays cannot be empty.");

        codePanel.appendChild(CodePanel.#navTabs(name, tabs));
        if (example.length > 0) codePanel.appendChild(Example.build(example));
        codePanel.appendChild(CodePanel.#navPanes(name, language, contents));
        return codePanel;
    }

    static #navTabs(name, labels) {
        const navTabs = document.createElement("ul");
        navTabs.className = "nav nav-tabs";
        navTabs.role = "tablist";

        labels.forEach((tabName, index) => {
            const navItem = document.createElement("li");
            navItem.className = "nav-item";
            navItem.role = "presentation";

            const navLink = document.createElement("button");
            navLink.className = `nav-link ${index === 0 ? "active" : ""}`;
            navLink.id = `${name}-${index}-tab`;
            navLink.role = "tab";
            navLink.type = "button";
            navLink.setAttribute("data-bs-toggle", "tab");
            navLink.setAttribute("data-bs-target", `#${name}-${index}`);
            navLink.setAttribute("aria-controls", `${name}-${index}`);
            navLink.setAttribute("aria-selected", index === 0 ? "true" : "false");
            navLink.textContent = tabName;

            navItem.append(navLink);
            navTabs.append(navItem);
        });

        return navTabs;
    }

    static #navPanes(name, language, contents) {
        const navPanes = document.createElement("div");
        navPanes.className = "tab-content";

        contents.forEach((code, index) => {
            const tabPane = document.createElement("div");
            tabPane.className = `tab-pane fade ${index === 0 ? "show active" : ""}`;
            tabPane.id = `${name}-${index}`;
            tabPane.role = "tabpanel";
            tabPane.tabindex = index === 0 ? 0 : -1;
            tabPane.setAttribute("aria-labelledby", `${name}-${index}-tab`);

            tabPane.append(CodeBlock.build({ language, code }));
            navPanes.append(tabPane);
        });
        return navPanes;
    }
}

export default CodePanel;
