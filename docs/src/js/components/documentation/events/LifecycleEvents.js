import Console from "../../Console";
import DocArticle from "../DocArticle";

class LifecycleEvents extends DocArticle {
    static #events = [
        {
            name: "toggle:initialized",
            trigger: "Fired after `init()` completes (internal state is ready, DOM not yet built).",
        },
        {
            name: "toggle:attached",
            trigger: "Fired after `attach()` completes (toggle DOM built, listeners bound).",
        },
        {
            name: "toggle:disposed",
            trigger: "Fired after `dispose()` completes (DOM torn down, listeners unbound). Also fires as part of `rerender()`.",
        },
        {
            name: "toggle:destroyed",
            trigger: "Fired after `destroy()` completes (instance detached from the input).",
        },
        {
            name: "toggle:transition-cancelled",
            trigger: "Fired when a lifecycle transition is cancelled before it completes.",
        },
        {
            name: "toggle:transition-invalid",
            trigger: "Fired when a lifecycle transition is requested from an invalid source state.",
        },
    ];

    static build() {
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "lifecycle-events-toggle");
        input.setAttribute("checked", "");
        input.dataset.toggle = "toggle";
        const mockConsole = new Console();

        LifecycleEvents.#events.forEach((event) => {
            input.addEventListener(event.name, (_e) => {
                mockConsole.log({
                    mode: "append",
                    data: `Event ${event.name} fired.`,
                });
            });
        });

        const rerenderBtn = document.createElement("button");
        rerenderBtn.type = "button";
        rerenderBtn.className = "btn btn-outline-secondary btn-sm";
        rerenderBtn.textContent = "Trigger rerender()";
        rerenderBtn.onclick = () => {
            input.bootstrapToggle("rerender");
        };

        return super.build({
            title: "Lifecycle Events",
            description: LifecycleEvents.#description(),
            codeBlock: {
                language: "html",
                code: `<input type="checkbox" id="lifecycle-events-toggle" checked data-toggle="toggle"/>
<script>
  const myToggle = document.getElementById("lifecycle-events-toggle");

  [
    "toggle:initialized",
    "toggle:attached",
    "toggle:disposed",
    "toggle:destroyed",
    "toggle:transition-cancelled",
    "toggle:transition-invalid"
  ].forEach((eventName) => {
    myToggle.addEventListener(eventName, (_e) => {
            mockConsole.log({
                mode: "append",
                data: \`Event \${eventName} fired.\`,
            });
        });
  });

  // Rerender goes through dispose() -> attach(), so it
  // emits toggle:disposed and toggle:attached.
  myToggle.bootstrapToggle("rerender");
</script>`,
            },
            example: [input, rerenderBtn, mockConsole.htmlElement],
            versionPill: { action: "SINCE", version: "5.5.0" },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML =
            "Bootstrap Toggle is built on <code>component-lifecycle</code>. Every lifecycle transition automatically emits a prefixed <code>CustomEvent</code> on the input element. These events carry no toggle-state payload — they signal lifecycle moments — and are emitted with <code>bubbles: true</code>, so you can listen for them with <code>element.addEventListener</code> or with the chainable <code>.on()</code> / <code>.once()</code> API (see the next article).";
        description.append(paragraph, LifecycleEvents.#table());

        const note = document.createElement("p");
        note.innerHTML =
            "<strong>Note:</strong> <code>toggle:initialized</code> and <code>toggle:attached</code> are emitted during initial wiring and cannot be observed by a listener registered after the page is ready. The demo below only observes <code>toggle:disposed</code> and <code>toggle:attached</code> when you click <em>Trigger rerender()</em>.";
        description.append(note);

        return description;
    }

    static #table() {
        const table = document.createElement("table");
        table.className = "table table-striped table-condensed";
        const caption = document.createElement("caption");
        caption.textContent = "Lifecycle events emitted by the toggle";
        table.append(caption, LifecycleEvents.#thead(), LifecycleEvents.#tbody());
        return table;
    }

    static #thead() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.append(
            ...["Event", "Description"].map((label) => {
                const th = document.createElement("th");
                th.textContent = label;
                return th;
            })
        );
        thead.append(tr);
        return thead;
    }

    static #tbody() {
        const tbody = document.createElement("tbody");
        const trs = LifecycleEvents.#events.map(({ name, trigger }) => {
            const td1 = document.createElement("td");
            td1.innerHTML = `<em>${name}</em>`;

            const td2 = document.createElement("td");
            td2.innerHTML = trigger;

            const tr = document.createElement("tr");
            tr.append(td1, td2);
            return tr;
        });
        tbody.append(...trs);
        return tbody;
    }
}

export default LifecycleEvents;
