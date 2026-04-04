import DocArticle from "../DocArticle";

class InputInteraction extends DocArticle {
  static #interactions = [
    {
      action: "checked",
      function: "myInput.checked = true",
      description: "Sets the toggle to 'On' state",
      demo: (input) => {
        input.checked = true;
      },
    },
    {
      action: "unchecked",
      function: "myInput.checked = false",
      description: "Sets the toggle to 'Off' state",
      demo: (input) => {
        input.checked = false;
      },
    },
    {
      action: "indeterminate",
      function: "myInput.indeterminate = true",
      description: "Sets the toggle to 'indeterminate' state",
      demo: (input) => {
        input.indeterminate = true;
      },
    },
    {
      action: "determinate",
      function: "myInput.indeterminate = false",
      description:
        "Sets the toggle to the previous 'determinate' state ('on' or 'off')",
      demo: (input) => {
        input.indeterminate = false;
      },
    },
    {
      action: "enable",
      function: "myInput.disabled = false",
      description: "Enables the toggle",
      demo: (input) => {
        input.disabled = false;
      },
    },
    {
      action: "disable",
      function: "myInput.disabled = true",
      description: "Disables the toggle",
      demo: (input) => {
        input.disabled = true;
      },
    },
    {
      action: "read-only",
      function: "myInput.readOnly = true",
      description:
        "Disables the toggle but the checkbox stay readable in form data.",
      demo: (input) => {
        input.readOnly = true;
      },
    },
    {
      action: "read-write",
      function: "myInput.readOnly = false",
      description:
        "Removes the readonly state, enabling user interaction with the toggle.",
      demo: (input) => {
        input.readOnly = false;
      },
    },
  ];

  static build() {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "api-input-interaction");
    input.setAttribute("checked", "");
    input.setAttribute("tristate", "");
    input.dataset.toggle = "toggle";

    return super.build({
      title: "Input Interaction",
      description: InputInteraction.#description(input),
      codeBlock: {
        language: "html",
        code: `<input type="checkbox" id="api-input-interaction" data-toggle="toggle" checked tristate />
<script>const myInput = document.getElementById("api-input-interaction");</script>`,
      },
      example: [input],
    });
  }

  static #description(input) {
    const description = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.innerHTML =
      "Interact with the input elements dispatch changes to the toggle:";
    description.append(paragraph, InputInteraction.#table(input));

    return description;
  }

  static #table(input) {
    const table = document.createElement("table");
    table.className = "table table-striped table-condensed";
    const caption = document.createElement("caption");
    caption.textContent = "Input interaction demo";
    table.append(
      caption,
      InputInteraction.#thead(),
      InputInteraction.#tbody(input),
    );

    return table;
  }

  static #thead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.append(
      ...["Action", "Example", "Description", "Demo"].map((label) => {
        const th = document.createElement("th");
        th.textContent = label;
        return th;
      }),
    );
    thead.append(tr);
    return thead;
  }

  static #tbody(input) {
    const tbody = document.createElement("tbody");

    const trs = InputInteraction.#interactions.map(
      ({ action, function: func, description, demo }) => {
        const td1 = document.createElement("td");
        td1.innerHTML = `<em>${action}</em>`;

        const td2 = document.createElement("td");
        td2.innerHTML = `<code>${func}</code>`;

        const td3 = document.createElement("td");
        td3.textContent = description;

        const td4 = document.createElement("td");
        const button = document.createElement("button");
        button.className = "btn btn-outline-dark btn-sm w-100";
        button.textContent = action;
        button.onclick = () => {
          demo(input);
        };
        td4.append(button);

        const tr = document.createElement("tr");
        tr.append(td1, td2, td3, td4);
        return tr;
      },
    );

    tbody.append(...trs);
    return tbody;
  }
}

export default InputInteraction;
