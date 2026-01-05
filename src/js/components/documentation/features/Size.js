import DocArticle from "../DocArticle";

class Size {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle is available in different sizes. Just add the <code>data-size</code> attribute with one of the following values: <code>lg</code>, <code>sm</code> or <code>xs</code>.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" data-size="lg">
<input type="checkbox" checked data-toggle="toggle">
<input type="checkbox" checked data-toggle="toggle" data-size="sm">
<input type="checkbox" checked data-toggle="toggle" data-size="xs">`;

    return DocArticle.build({
      title: "Size",
      description,
      example: Size.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const example = ["lg", "default", "sm", "xs"].map((size) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.dataset.toggle = "toggle";
      if (size != "default") input.dataset.size = size;
      return input;
    });
    return example;
  }
}
export default Size;
