import DocArticle from "../DocArticle";

class CustomTitle {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle allows to set custom title. Just add the <code>data-ontitle</code> or <code>data-offtitle</code> attribute to set a custom label. To set the same title in
  both parts just use HTML standard <code>title</code> attribute.`;

    const code = `<input type="checkbox" data-toggle="toggle" data-ontitle="ON" data-offtitle="Off" />
<input type="checkbox" data-toggle="toggle" title="TOGGLE" />`;

    return DocArticle.build({
      title: "Custom Title",
      description,
      versionPill: {
        version: "5.0.0",
        action: "SINCE",
      },
      example: CustomTitle.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const input1 = document.createElement("input");
    input1.type = "checkbox";
    input1.checked = true;
    input1.dataset.toggle = "toggle";
    input1.dataset.ontitle = "ON";
    input1.dataset.offtitle = "OFF";

    const input2 = document.createElement("input");
    input2.type = "checkbox";
    input2.checked = true;
    input2.dataset.toggle = "toggle";
    input2.title = "TOGGLE";

    return [input1, input2];
  }
}
export default CustomTitle;
