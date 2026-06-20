import DocArticle from "../DocArticle";

class Methods extends DocArticle {
  static #methods = [
    {
      method: "initialize",
      params: null,
      description: "Initializes the toggle plugin with options",
    },
    {
      method: "destroy",
      params: "destroy",
      description: "Destroys the toggle",
    },
    {
      method: "rerender",
      params: "rerender",
      description: "Rerenders the toggle",
    },
    {
      method: "on",
      params: "on",
      description: "Sets the toggle to 'On' state",
    },
    {
      method: "off",
      params: "off",
      description: "Sets the toggle to 'Off' state",
    },
    {
      method: "toggle",
      params: "toggle",
      description: "Toggles the state of the toggle",
    },
    {
      method: "indeterminate",
      params: "indeterminate",
      description: "Sets the toggle to 'indeterminate' state",
    },
    {
      method: "determinate",
      params: "determinate",
      description:
        "Sets the toggle to the previous 'determinate' state ('on' or 'off')",
    },
    {
      method: "enable",
      params: "enable",
      description: "Enables the toggle",
    },
    {
      method: "disable",
      params: "disable",
      description: "Disables the toggle",
    },
    {
      method: "readonly",
      params: "readonly",
      description:
        "Disables the toggle but the checkbox stay readable in form data.",
    },
  ];

  static build() {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "api-methods-toggle");
    input.setAttribute("checked", "");

    return super.build({
      title: "Methods",
      description: Methods.#description(input),
      codeBlock: {
        language: "html",
        code: `<input type="checkbox" id="api-methods-toggle" checked />
<script>const myToggle = document.getElementById("api-methods-toggle");</script>`,
      },
      example: [input],
    });
  }

  static #description(input) {
    const description = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.innerHTML =
      "Methods can be used to control toggles directly. The following methods are available in the following way:";
    description.append(paragraph, Methods.#table(input));

    return description;
  }

  static #table(input) {
    const table = document.createElement("table");
    table.className = "table table-striped table-condensed";
    const caption = document.createElement("caption");
    caption.textContent = "API methods demo";
    table.append(caption, Methods.#thead(), Methods.#tbody(input));

    return table;
  }

  static #thead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.append(
      ...["Method", "Example", "Description", "Demo"].map((label) => {
        const th = document.createElement("th");
        th.textContent = label;
        return th;
      })
    );
    thead.append(tr);
    return thead;
  }

  static #tbody(input) {
    const tbody = document.createElement("tbody");

    const trs = Methods.#methods.map(({ method, params, description }) => {
      const td1 = document.createElement("td");
      td1.innerHTML = `<em>${method}</em>`;

      const td2 = document.createElement("td");
      td2.innerHTML = params
        ? `<code>myToggle.bootstrapToggle("${params}")</code>`
        : `<code>myToggle.bootstrapToggle()</code>`;

      const td3 = document.createElement("td");
      td3.textContent = description;

      const td4 = document.createElement("td");
      const button = document.createElement("button");
      button.className = "btn btn-outline-dark btn-sm w-100";
      button.textContent = method;
      button.onclick = () => {
        input.bootstrapToggle(params);
      };
      td4.append(button);

      const tr = document.createElement("tr");
      tr.append(td1, td2, td3, td4);
      return tr;
    });

    tbody.append(...trs);
    return tbody;
  }
}

export default Methods;
