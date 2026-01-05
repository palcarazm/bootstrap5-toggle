import DocSection from "./DocSection";
import DocArticle from "./DocArticle";

class Usage extends DocSection {
  static build() {
    return super.build("usage", "Usage", [Usage.#html(), Usage.#js()]);
  }

  static #html() {
    const description = document.createElement("p");
    description.innerHTML = `Simply add <code>data-toggle="toggle"</code> to convert checkboxes into toggles.`;

    return DocArticle.build({
      title: "Initialize with HTML",
      description,
      codeBlock: {
        language: "html",
        code: `<input type="checkbox" data-toggle="toggle" checked>`,
      },
    });
  }

  static #js() {
    const description = document.createElement("p");
    description.innerHTML = `Simply call the <code>bootstrapToggle</code> method to convert checkboxes into toggles. See <a href="#api">Options</a> for additional colors, etc.</p>`;

    const ecmas = `document.querySelector(mySelector).bootstrapToggle();`;
    const jquery = `$(mySelector).bootstrapToggle();`;

    return DocArticle.build({
      title: "Initialize with JavaScript",
      description,
      codePanel: {
        name: "usage-js",
        language: "javascript",
        contents: [ecmas, jquery],
      },
    });
  }
}

export default Usage;
