import Console from "../../Console";
import DocArticle from "../DocArticle";

class StateStatus {
  static build() {
    const code = `<form id="form_state_status" class="d-flex justify-content-between align-items-center">
  <input name="enabled" type="checkbox" data-toggle="toggle" checked />
  <input name="disabled" type="checkbox" data-toggle="toggle" checked disabled />
  <input name="readonly" type="checkbox" data-toggle="toggle" checked readonly />
  <button type="submit" class="btn btn-outline-secondary">Submit</button>
</form>`;

    return DocArticle.build({
      title: "Toggle State and Status",
      description: StateStatus.#description(),
      example: StateStatus.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #description() {
    const description = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.innerHTML = `Toggle state and status is simply set adding vanilla html attributes to the checkbox:`;
    description.append(paragraph);

    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    li1.innerHTML = `Simply add <code>checked</code> to convert checkboxes into on toggles.`;
    const li2 = document.createElement("li");
    li2.innerHTML = `Simply add <code>disabled</code> to convert checkboxes into disabled toggles. Checkboxes will not be presents in the payload of a submitted form.`;
    const li3 = document.createElement("li");
    li3.innerHTML = `Simply add <code>readonly</code> to convert checkboxes into disabled toggles but presents in the payload of a submitted form.`;
    ul.append(li1, li2, li3);
    description.append(ul);

    return description;
  }

  static #example() {
    const form = document.createElement("form");
    form.className = "d-flex justify-content-between align-items-center";
    form.innerHTML = `<input name="enabled" type="checkbox" data-toggle="toggle" checked />
    <input name="disabled" type="checkbox" data-toggle="toggle" checked disabled />
    <input name="readonly" type="checkbox" data-toggle="toggle" checked readonly />
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
export default StateStatus;
