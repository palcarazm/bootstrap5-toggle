import DocArticle from "../DocArticle";

class KeyboardInteraction {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle supports keyboard interaction. Toggle can be switched pressing <code>SPACEBAR</code> or <code>ENTER</code> while it's focused and support <code>TAB</code> navigation.
A custom <code>tabindex</code> can be set by adding the <code>tabindex</code> attribute, default value is <code>0</code>.`;

    const code = `<input type="checkbox" data-toggle="toggle" checked tabindex="-1" />
<input type="checkbox" data-toggle="toggle" checked />
<input type="checkbox" data-toggle="toggle" checked tabindex="1" />`;

    return DocArticle.build({
      title: "Keyboard Interaction",
      versionPill: { version: "5.0.0", action: "SINCE" },
      description,
      example: KeyboardInteraction.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    return ["-1", "", "1"].map((tabindex) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.dataset.toggle = "toggle";
      if (tabindex !== "") input.setAttribute("tabindex", tabindex);
      return input;
    });
  }
}
export default KeyboardInteraction;
