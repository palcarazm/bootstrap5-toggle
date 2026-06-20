import { version } from "grunt";
import Console from "../../Console";
import DocArticle from "../DocArticle";

class CustomEvents extends DocArticle {
  static #events = [
    {
      name: "toggle:on",
      action: "on",
    },
    {
      name: "toggle:off",
      action: "off",
    },
    {
      name: "toggle:mixed",
      action: "indeterminate",
    },
    {
      name: "toggle:enabled",
      action: "enable",
    },
    {
      name: "toggle:disabled",
      action: "disable",
    },
    {
      name: "toggle:readonly",
      action: "readonly",
    },
  ];

  static build() {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "custom-events-toggle");
    input.setAttribute("checked", "");
    input.setAttribute("tristate", "");
    input.setAttribute("data-toggle", "toggle");
    const console = new Console();

    CustomEvents.#events.forEach((event) => {
      input.addEventListener(event.name, (e) => {
        console.log({
          mode: "append",
          data: `Event ${event.name} fired. Toggle state: ${JSON.stringify(e.detail.state, null, 2)}`,
        });
      });
    });

    return super.build({
      title: "Custom Events",
      description: CustomEvents.#description(input),
      codeBlock: {
        language: "html",
        code: `<input type="checkbox" id="custom-events-toggle" checked tristate data-toggle="toggle"/>
<script>
  const myToggle = document.getElementById("custom-events-toggle");
  const events = ["toggle:on", "toggle:off", "toggle:mixed", "toggle:enable", "toggle:disable", "toggle:readonly"];
  events.forEach((event) => {
    myToggle.addEventListener(event, (e) => {
      console.log(\`Event \${event} fired. Toggle state: \${JSON.stringify(e.detail.state)}\`);
    });
  });
</script>`,
      },
      example: [input, console.htmlElement],
      versionPill: { action: "SINCE", version: "5.3.0" },
    });
  }

  static #description(input) {
    const description = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.innerHTML =
      "Bootstrap Toggle emit custom events when its state or status is changed. The events details contain the current state of the toggle. The following custom events are available:";
    description.append(paragraph, CustomEvents.#table(input));

    return description;
  }

  static #table(input) {
    const table = document.createElement("table");
    table.className = "table table-striped table-condensed";
    const caption = document.createElement("caption");
    caption.textContent = "Custom events demo";
    table.append(caption, CustomEvents.#thead(), CustomEvents.#tbody(input));

    return table;
  }

  static #thead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.append(
      ...["Event", "Example", "Launch"].map((label) => {
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

    const trs = CustomEvents.#events.map(({ name, action }) => {
      const td1 = document.createElement("td");
      td1.innerHTML = `<em>${name}</em>`;

      const td2 = document.createElement("td");
      td2.innerHTML = `<code>myToggle.addEventListener("${name}", (e)=>{...})</code>`;

      const td3 = document.createElement("td");
      const defaultBtn = document.createElement("button");
      defaultBtn.className = "btn btn-outline-dark btn-sm w-100";
      defaultBtn.textContent = action;
      defaultBtn.onclick = () => {
        input.bootstrapToggle(action, false);
      };
      td3.append(defaultBtn);

      const tr = document.createElement("tr");
      tr.append(td1, td2, td3);
      return tr;
    });

    tbody.append(...trs);
    return tbody;
  }
}

export default CustomEvents;
