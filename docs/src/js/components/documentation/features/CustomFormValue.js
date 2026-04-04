import Console from "../../Console";
import DocArticle from "../DocArticle";

class CustomFormValue {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Form submit values can be customized with the <code>data-onvalue</code> and <code>data-offvalue</code> attributes.If original checkbox have a <code>value</code> set, <code>data-onvalue</code> will be ignored preserving the original <code>value</code>.`;

    const code = `<form class="d-flex justify-content-between align-items-center">
  <input type="checkbox" data-toggle="toggle" checked value="VALUE" data-onvalue="ON" data-offvalue="OFF" name="value-priority" />
  <input type="checkbox" data-toggle="toggle" checked data-onvalue="ON" data-offvalue="OFF" name="custom-values" />
  <input type="checkbox" data-toggle="toggle" checked name="default-values" />
  <button type="submit" class="btn btn-outline-secondary">Submit</button>
</form>`;

    return DocArticle.build({
      title: "Custom form submit values",
      description,
      example: CustomFormValue.#example(),
      codeBlock: {
        language: "html",
        code,
      },
      versionPill: { version: "4.3.0", action: "SINCE" },
    });
  }

  static #example() {
    const form = document.createElement("form");
    form.id = "form_state_status";
    form.className = "d-flex justify-content-between align-items-center";
    form.innerHTML = ` <input type="checkbox" data-toggle="toggle" checked value="VALUE" data-onvalue="ON" data-offvalue="OFF" name="value-priority" />
    <input type="checkbox" data-toggle="toggle" checked data-onvalue="ON" data-offvalue="OFF" name="custom-values" />
    <input type="checkbox" data-toggle="toggle" checked name="default-values" />
    <button type="submit" class="btn btn-outline-secondary">Submit</button>`;

    const console = new Console();

    form.onsubmit = (e) => {
      e.preventDefault();
      console.json({
        mode: "replace",
        data: Object.fromEntries(new FormData(e.target)),
      });
    };

    return [form, console.htmlElement];
  }
}
export default CustomFormValue;
