import DocArticle from "../DocArticle";

class Tristate {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle is available in tristate mode. Just add the <code>tristate</code> attribute to make a tristate toggle.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" tristate />`;

    return DocArticle.build({
      title: "Tristate Toggle",
      versionPill: { version: "4.3.0", action: "SINCE" },
      description,
      example: Tristate.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.dataset.toggle = "toggle";
    input.setAttribute("tristate", "");

    return [input];
  }
}
export default Tristate;
