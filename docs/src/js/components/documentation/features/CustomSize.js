import DocArticle from "../DocArticle";

class CustomSize {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = ` Bootstrap toggle can handle custom sizes by <code>data-width</code> and <code>data-height</code> options.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" data-width="100" data-height="75" />
<input type="checkbox" checked data-toggle="toggle" data-height="5rem" />
<input type="checkbox" checked data-toggle="toggle" data-width="6em" />`;

    return DocArticle.build({
      title: "Custom Sizes",
      description,
      example: CustomSize.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const example = [
      { width: "100", height: "75" },
      { height: "5rem" },
      { width: "6em" },
    ].map(({ width, height }) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.dataset.toggle = "toggle";
      if (width) input.dataset.width = width;
      if (height) input.dataset.height = height;
      return input;
    });
    return example;
  }
}
export default CustomSize;
