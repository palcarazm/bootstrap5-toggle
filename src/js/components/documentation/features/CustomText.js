import DocArticle from "../DocArticle";

class CustomText {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle allows to set custom labels. Just add the <code>data-onlabel</code> or <code>data-offlabel</code> attribute to set a custom label. Plain text and HTML are supported.`;

    const code = `<input type="checkbox" checked data-toggle="toggle" data-onlabel="Ready" data-offlabel="Not Ready" data-onstyle="success" data-offstyle="danger" />
<input type="checkbox" checked data-toggle="toggle" data-onlabel="<i class='fa-solid fa-play'></i> Play" data-offlabel="<i class='fa-solid fa-pause'></i> Pause" />`;

    return DocArticle.build({
      title: "Custom Text",
      description,
      example: CustomText.#example(),
      codeBlock: {
        language: "html",
        code,
      },
      alert: {
        type: "warning",
        title: "Deprecation notice",
        versionPill: {
          version: "5.0.0",
          action: "DEPRECATED",
        },
        content: `Using <code>data-on</code> and <code>data-off</code> data attributes is deprecated and will throw a console warning. Use <code>data-onlabel</code> and <code>data-offlabel</code> data attributes instead.`,
      },
    });
  }

  static #example() {
    const input1 = document.createElement("input");
    input1.type = "checkbox";
    input1.checked = true;
    input1.dataset.toggle = "toggle";
    input1.dataset.onlabel = "Ready";
    input1.dataset.offlabel = "Not Ready";
    input1.dataset.onstyle = "success";
    input1.dataset.offstyle = "danger";

    const input2 = document.createElement("input");
    input2.type = "checkbox";
    input2.checked = true;
    input2.dataset.toggle = "toggle";
    input2.dataset.onlabel = "<i class='fa-solid fa-play'></i> Play";
    input2.dataset.offlabel = "<i class='fa-solid fa-pause'></i> Pause";

    return [input1, input2];
  }
}
export default CustomText;
