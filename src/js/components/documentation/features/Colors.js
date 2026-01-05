import DocArticle from "../DocArticle";

class Colors {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle implements all Bootstrap colors. Just add the <code>data-onstyle</code> or <code>data-offstyle</code> attribute with one of the following values: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>light</code> or <code>dark</code>.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" data-onstyle="primary" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="secondary" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="success" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="danger" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="warning" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="info" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="light" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="dark" />`;

    return DocArticle.build({
      title: "Colors",
      description,
      example: Colors.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const example = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark",
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
export default Colors;
