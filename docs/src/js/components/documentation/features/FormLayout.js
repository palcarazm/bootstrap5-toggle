import Console from "../../Console";
import DocArticle from "../DocArticle";

class FormLayout {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle can be used in all bootstrap form layout.`;

    const code = `<!-- Stacked -->
<form class="border p-1 mb-1">
  <div class="form-check ps-0">
    <input id="stacked-check-1" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
    <label for="stacked-check-1" class="form-check-label">Stacked 1</label>
  </div>
  <div class="form-check ps-0">
    <input id="stacked-check-2" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
    <label for="stacked-check-2" class="form-check-label">Stacked 2</label>
  </div>
</form>

<!-- Inline -->
<form class="border p-1 mb-1">
  <div class="form-check form-check-inline ps-0">
    <input id="inline-check-1" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
    <label for="inline-check-1" class="form-check-label">Inline 1</label>
  </div>
  <div class="form-check form-check-inline ps-0">
    <input id="inline-check-2" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
    <label for="inline-check-2" class="form-check-label">Inline 2</label>
  </div>
</form>

<!-- Input Group -->
<form class="input-group input-group-sm border p-1 mb-1">
  <label class="input-group-text" for="input-group-sm">Input Group small</label>
  <input type="text" class="form-control" />
  <input id="input-group-sm" type="checkbox" checked data-toggle="toggle" data-size="sm" />
</form>
<form class="input-group input-group border p-1 mb-1">
  <label class="input-group-text" for="input-group-md">Input Group default</label>
  <input type="text" class="form-control" />
  <input id="input-group-md" type="checkbox" checked data-toggle="toggle" />
</form>
<form class="input-group input-group-lg border p-1">
  <label class="input-group-text" for="input-group-lg">Input Group Large</label>
  <input type="text" class="form-control" />
  <input id="input-group-lg" type="checkbox" checked data-toggle="toggle" data-size="lg" />
</form>`;

    return DocArticle.build({
      title: "Form Layout",
      description,
      example: FormLayout.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const formStacked = document.createElement("form");
    formStacked.className = "border p-1 mb-1";
    formStacked.innerHTML = `<div class="form-check ps-0">
      <input id="stacked-check-1" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
      <label for="stacked-check-1" class="form-check-label">Stacked 1</label>
    </div>
    <div class="form-check ps-0">
      <input id="stacked-check-2" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
      <label for="stacked-check-2" class="form-check-label">Stacked 2</label>
    </div>`;

    const fromInline = document.createElement("form");
    fromInline.className = "border p-1 mb-1";
    fromInline.innerHTML = `<div class="form-check form-check-inline ps-0">
      <input id="inline-check-1" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
      <label for="inline-check-1" class="form-check-label">Inline 1</label>
    </div>
    <div class="form-check form-check-inline ps-0">
      <input id="inline-check-2" class="form-check-input" type="checkbox" data-toggle="toggle" checked />
      <label for="inline-check-2" class="form-check-label">Inline 2</label>
    </div>`;

    const formsInputGroup = [
      { text: "Small", size: "sm" },
      { text: "Default", size: "md" },
      { text: "Large", size: "lg" },
    ].map(({ text, size }) => {
      const form = document.createElement("form");
      form.className = `border p-1 ${size !== "lg" ? "mb-1" : ""}`;
      form.classList.add("input-group", `input-group-${size}`);
      form.innerHTML = `
      <label class="input-group-text" for="input-group-${size}">Input Group ${text}</label>
      <input type="text" class="form-control" />
      <input type="checkbox" checked data-toggle="toggle" data-size="${size}" id="input-group-${size}" />`;
      return form;
    });

    return [formStacked, fromInline, ...formsInputGroup];
  }
}
export default FormLayout;
