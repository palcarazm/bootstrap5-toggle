import DocArticle from "../DocArticle";

class OutlineColors {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle implements also all Bootstrap outline colors. Just add the <code>data-onstyle</code> or <code>data-offstyle</code> attribute with one of the following values: <code>outline-primary</code>, <code>outline-secondary</code>, <code>outline-success</code>, <code>outline-danger</code>, <code>outline-warning</code>, <code>outline-info</code>, <code>outline-light</code> or <code>outline-dark</code>.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-primary" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-secondary" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-success" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-danger" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-warning" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-info" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-light" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="outline-dark" />`;

    return DocArticle.build({
      title: "Outline Colors",
      description,
      example: OutlineColors.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const example = [
      "outline-primary",
      "outline-secondary",
      "outline-success",
      "outline-danger",
      "outline-warning",
      "outline-info",
      "outline-light",
      "outline-dark",
    ].map((color) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.dataset.toggle = "toggle";
      input.dataset.onstyle = color;
      return input;
    });
    return example;
  }
}
export default OutlineColors;
