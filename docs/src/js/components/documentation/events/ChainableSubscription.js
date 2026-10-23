import Console from "../../Console";
import DocArticle from "../DocArticle";

class ChainableSubscription extends DocArticle {
    static build() {
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "chainable-subscription-toggle");
        input.setAttribute("checked", "");
        input.dataset.toggle = "toggle";
        const console = new Console();

        input.addEventListener("toggle:on", () => {
            console.log({
                mode: "append",
                data: "[addEventListener] toggle:on received.",
            });
        });

        input.addEventListener("toggle:initialized", () => {
            input.bsToggle
                .on("toggle:on", () => {
                    console.log({
                        mode: "append",
                        data: "[.on] toggle:on received.",
                    });
                })
                .once("toggle:destroyed", () => {
                    console.log({
                        mode: "append",
                        data: "[.once] toggle:destroyed received (will not fire again).",
                    });
                });
        });

        return super.build({
            title: "Chainable Event Subscription",
            description: ChainableSubscription.#description(),
            codeBlock: {
                language: "html",
                code: `<input type="checkbox" id="chainable-toggle" checked data-toggle="toggle"/>
<script>
  const toggle = document.getElementById("chainable-toggle");

  // Chainable subscription (inherited from component-lifecycle Component):
  toggle.addEventListener("toggle:initialized", () => {
    toggle.bsToggle
      .on("toggle:on", () => console.log("[.on] toggle:on received."))
      .once("toggle:destroyed", () => console.log("[.once] toggle:destroyed received (will not fire again)."));
  });

  // DOM listener on the input element — coexists with the above:
  toggle.addEventListener("toggle:on", (e) => {
    console.log("[DOM listener] saw toggle:on", e.detail.state);
  });
</script>`,
            },
            example: [input, console.htmlElement],
            versionPill: { action: "SINCE", version: "5.5.0" },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const p1 = document.createElement("p");
        p1.innerHTML =
            "The <code>Component</code> base class exposes a chainable typed event API that coexists with the standard DOM <code>element.addEventListener</code> pattern. Both styles receive the same <code>CustomEvent</code>, and both see the same <code>e.detail.state</code> payload on domain events.";
        description.append(p1);

        const p2 = document.createElement("p");
        p2.innerHTML =
            "<code>.on(name, handler)</code> subscribes for every occurrence; <code>.once(name, handler)</code> auto-unsubscribes after the first dispatch; <code>.off(name, handler)</code> removes a specific handler. All three return the component instance, so calls can be chained.";
        description.append(p2);

        const p3 = document.createElement("p");
        p3.innerHTML =
            "<strong>Domain events</strong> — <code>toggle:on</code>, <code>toggle:off</code>, <code>toggle:mixed</code>, <code>toggle:enabled</code>, <code>toggle:disabled</code>, <code>toggle:readonly</code> — carry a <code>{ state: { value, checked, status, indeterminate } }</code> detail payload. <strong>Lifecycle events</strong> (see the previous article) carry no toggle-state payload.";
        description.append(p3);

        return description;
    }
}

export default ChainableSubscription;
