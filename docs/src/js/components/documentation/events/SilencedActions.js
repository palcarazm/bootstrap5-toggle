import Console from "../../Console";
import DocArticle from "../DocArticle";

class SilencedActions extends DocArticle {
  static #methods = [
    "on",
    "off",
    "toggle",
    "indeterminate",
    "determinate",
    "enable",
    "disable",
    "readonly",
  ];

  static build() {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "events-silence-toggle");
    input.setAttribute("checked", "");
    input.setAttribute("data-toggle", "toggle");
    const console = new Console();

    input.addEventListener("change", (e) => {
      console.log({
        mode: "append",
        data: `Input change fired. Checked state: ${input.checked}`,
      });
    });

    return super.build({
      title: "Silenced Actions",
      description: SilencedActions.#description(input),
      codeBlock: {
        language: "html",
        code: `<input type="checkbox" id="events-silence-toggle" checked />
<script>
  const myToggle = document.getElementById("events-silence-toggle");
  myToggle.addEventListener("change", (e) => {
    console.log(\`Input change fired. Checked state: \${myToggle.checked}\`);
  });
</script>`,
      },
      example: [input, console.htmlElement],
    });
  }

  static #description(input) {
    const description = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.innerHTML =
      "Methods can be used in silence mode just specifying the second argument to <code>true</code> on the <code>bootstrapToggle</code> call. This is useful to prevent the control from propagating the change event in cases where you want to update the state, but do not want to fire the onChange event. The following methods are available in silence mode in the following way:";
    description.append(paragraph, SilencedActions.#table(input));

    return description;
  }

  static #table(input) {
    const table = document.createElement("table");
    table.className = "table table-striped table-condensed";
    const caption = document.createElement("caption");
    caption.textContent = "Silenced methods demo";
    table.append(
      caption,
      SilencedActions.#thead(),
      SilencedActions.#tbody(input),
    );

    return table;
  }

  static #thead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.append(
      ...["Method", "Example", "Normal", "Silenced"].map((label) => {
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

    const trs = SilencedActions.#methods.map((method) => {
      const td1 = document.createElement("td");
      td1.innerHTML = `<em>${method}</em>`;

      const td2 = document.createElement("td");
      td2.innerHTML = `<code>myToggle.bootstrapToggle("${method}", true)</code>`;

      const td3 = document.createElement("td");
      const defaultBtn = document.createElement("button");
      defaultBtn.className = "btn btn-outline-dark btn-sm w-100";
      defaultBtn.textContent = method;
      defaultBtn.onclick = () => {
        input.bootstrapToggle(method, false);
      };
      td3.append(defaultBtn);

      const td4 = document.createElement("td");
      const silenceBtn = document.createElement("button");
      silenceBtn.className = "btn btn-outline-dark btn-sm w-100";
      silenceBtn.textContent = method;
      silenceBtn.onclick = () => {
        input.bootstrapToggle(method, true);
      };
      td4.append(silenceBtn);

      const tr = document.createElement("tr");
      tr.append(td1, td2, td3, td4);
      return tr;
    });

    tbody.append(...trs);
    return tbody;
  }
}

export default SilencedActions;
