import Console from "../../Console";
import DocArticle from "../DocArticle";

class Monitoring extends DocArticle {
    /**
     * Live example state. Only one instance of the demo is created per page
     * load, so a module-level singleton for the console and the patched
     * console.debug is acceptable.
     */
    static #consoleInstance = null;
    static #originalDebug = null;
    static #debugPatched = false;

    static build() {
        return super.build({
            title: "Monitoring",
            description: Monitoring.#description(),
            versionPill: { action: "SINCE", version: "5.5.0" },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const p1 = document.createElement("p");
        p1.innerHTML = "Bootstrap5-Toggle is built on <code>component-lifecycle</code>. A <code>Monitor</code> singleton is exposed at <code>window.BootstrapToggle.MONITOR</code> and starts <strong>stopped</strong> (no listeners attached). Enable it from the browser console:";
        description.appendChild(p1);

        const code = document.createElement("pre");
        code.innerHTML = `<code class="highlight language-javascript">window.BootstrapToggle.MONITOR.start("DEBUG"); // full tracing
window.BootstrapToggle.MONITOR.setLevel("INFO"); // lifecycle only
window.BootstrapToggle.MONITOR.stop(); // silence
window.BootstrapToggle.MONITOR.getLevel(); // "DEBUG" | "INFO" | "WARN" | "ERROR" | undefined</code>`;
        description.appendChild(code);

        const p2 = document.createElement("p");
        p2.innerHTML = "The <code>Toggle</code> component itself is unchanged. <code>MONITOR</code> visibility relies on <code>Toggle</code> being constructed with <code>{ bubbleEvents: true }</code>, which is the current default and is not configurable via the public API.";
        description.appendChild(p2);

        description.appendChild(Monitoring.#logLevelTable());
        description.appendChild(Monitoring.#liveExample());

        return description;
    }

    static #liveExample() {
        const frag = document.createDocumentFragment();

        const title = document.createElement("h4");
        title.textContent = "Live example";
        title.className = "text-secondary";
        frag.appendChild(title);

        const p = document.createElement("p");
        p.innerHTML = "The buttons below control the <strong>actual global</strong> <code>window.BootstrapToggle.MONITOR</code> singleton. Log output is mirrored to the panel and also appears in the browser devtools console. Click <code>stop()</code> to restore the global console.";
        frag.appendChild(p);   

        const mockConsole = new Console();
        Monitoring.#consoleInstance = mockConsole;
        const buttons = [
            {
                label: 'start("DEBUG")',
                action: () => {
                    Monitoring.#patchConsoleDebug();
                    window.BootstrapToggle.MONITOR.start("DEBUG");
                    mockConsole.log({
                        mode: "append",
                        data: `MONITOR.start("DEBUG") → getLevel(): ${window.BootstrapToggle.MONITOR.getLevel()}`,
                    });
                },
            },
            {
                label: 'setLevel("INFO")',
                action: () => {
                    Monitoring.#patchConsoleDebug();
                    window.BootstrapToggle.MONITOR.setLevel("INFO");
                    mockConsole.log({
                        mode: "append",
                        data: `MONITOR.setLevel("INFO") → getLevel(): ${window.BootstrapToggle.MONITOR.getLevel()}`,
                    });
                },
            },
            {
                label: "stop()",
                action: () => {
                    try {
                        window.BootstrapToggle.MONITOR.stop();
                    } catch {
                        // ignore: already stopped
                    }
                    Monitoring.#restoreConsoleDebug();
                    mockConsole.log({
                        mode: "append",
                        data: `MONITOR.stop() → getLevel(): ${window.BootstrapToggle.MONITOR.getLevel()}`,
                    });
                },
            },
        ];

        const controls = document.createElement("div");
        controls.className = "d-flex flex-wrap gap-2 mb-2";
        buttons.forEach(({ label, action }) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-outline-secondary btn-sm";
            btn.textContent = label;
            btn.addEventListener("click", action);
            controls.appendChild(btn);
        });
        frag.appendChild(controls);

        frag.appendChild(mockConsole.htmlElement);
        return frag;
    }

    static #logLevelTable() {
        const frag = document.createDocumentFragment();
        
        const title = document.createElement("h4");
        title.textContent = "Log-level behavior";
        title.className = "text-secondary";
        frag.appendChild(title);

        const description = document.createElement("div");
        description.innerHTML = `
<div class="table-responsive">
  <table class="table table-striped table-condensed">
    <caption>Log-level behavior</caption>
    <thead>
      <tr>
        <th>Level</th>
        <th>Lifecycle events<br><small>(<code>initialized</code>, <code>attached</code>, <code>disposed</code>, <code>destroyed</code>)</small></th>
        <th>Domain events<br><small>(<code>on</code>, <code>off</code>, <code>mixed</code>, <code>enabled</code>, <code>disabled</code>, <code>readonly</code>)</small></th>
        <th>Transition events<br><small>(<code>transition-cancelled</code>, <code>transition-invalid</code>)</small></th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>DEBUG</code></td><td>✔</td><td>✔</td><td>✔</td></tr>
      <tr><td><code>INFO</code></td><td>✘</td><td>✘</td><td>✔</td></tr>
      <tr><td><code>WARN</code></td><td>✘</td><td>✘</td><td>✔</td></tr>
      <tr><td><code>ERROR</code></td><td>✘</td><td>✘</td><td>✘</td></tr>
    </tbody>
  </table>
</div>`;
        frag.appendChild(description);

        return frag;
    }

    /**
     * Patches `console.debug` so DEBUG lines are mirrored into the docs
     * `Console` component. Idempotent; only the first call patches.
     */
    static #patchConsoleDebug() {
        if (Monitoring.#debugPatched) return;
        Monitoring.#originalDebug = console.debug;
        console.debug = (...args) => {
            Monitoring.#originalDebug.apply(console, args);
            if (Monitoring.#consoleInstance) {
                Monitoring.#consoleInstance.log({
                    mode: "append",
                    data: args
                        .map((a) =>
                            typeof a === "string" ? a : JSON.stringify(a)
                        )
                        .join(" "),
                });
            }
        };
        Monitoring.#debugPatched = true;
    }

    /**
     * Restores the original `console.debug` if it was patched.
     */
    static #restoreConsoleDebug() {
        if (!Monitoring.#debugPatched) return;
        console.debug = Monitoring.#originalDebug;
        Monitoring.#originalDebug = null;
        Monitoring.#debugPatched = false;
    }

}

export default Monitoring;
