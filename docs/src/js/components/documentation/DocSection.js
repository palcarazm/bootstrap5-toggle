class DocSection {
    static build(name, title, HTMLElements, className = "") {
        const section = document.createElement("section");
        section.id = name;
        section.className = `container ${className}`;
        section.append(DocSection.#header(title), ...HTMLElements);
        return section;
    }
    static #header(title) {
        const header = document.createElement("h2");
        header.textContent = title;
        return header;
    }
}

export default DocSection;
