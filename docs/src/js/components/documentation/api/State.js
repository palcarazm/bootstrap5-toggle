import Console from "../../Console";
import DocArticle from "../DocArticle";

class State extends DocArticle {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Checked state of a toggle can be set by reading <code>checked</code> property. Use the element property for checked state <code>myToggle.checked</code> (returns <code>true</code> or <code>false</code>).`;

    const code = `<form class="d-flex justify-content-between align-items-center">
  <input type="checkbox" data-toggle="toggle" checked id="api-state-toggle"/>
  <button type="submit" class="btn btn-outline-secondary">Read State</button>
</form>
<script>const myToggle = document.getElementById("api-state-toggle");</script>`;

    return super.build({
      title: "Toggle State",
      description,
      example: State.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const form = document.createElement("form");
    form.id = "api-state-form";
    form.className = "d-flex justify-content-between align-items-center";
    form.innerHTML = `<input type="checkbox" data-toggle="toggle" checked id="api-state-toggle"/>
    <button type="submit" class="btn btn-outline-secondary">Read State</button>`;

    const console = new Console();

    form.onsubmit = (e) => {
      e.preventDefault();
      console.log({
        mode: "append",
        data: `Checked: ${e.target.elements["api-state-toggle"].checked}`,
      });
    };

    return [form, console.htmlElement];
  }
}

export default State;
