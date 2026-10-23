import { Monitor } from "component-lifecycle";
import ToggleEvents, { ToggleEventDetail } from "../types/ToggleEvents";

/**
 * Global singleton monitor for the Bootstrap5-Toggle component.
 *
 * Attached at module load to `globalThis.window.BootstrapToggle.MONITOR`
 * and starts stopped. Start manually from devtools:
 *
 *   window.BootstrapToggle.MONITOR.start("DEBUG");
 *
 * The prefix argument MUST match `Toggle.PREFIX` ("toggle").
 *
 * @remarks
 * `MONITOR` visibility relies on `Toggle` being constructed with
 * `{ bubbleEvents: true }`, which is the current default and is not
 * configurable via the public API.
 */
export class ToggleMonitor extends Monitor<"toggle"> {
    /**
     * Constructs a new `ToggleMonitor` bound to the `"toggle"` event prefix.
     */
    constructor() {
        super("toggle");
    }

    /**
     * Sets up DEBUG-level listeners.
     *
     * Calls `super.setupDebug()` first (which attaches lifecycle and
     * transition listeners), then adds document-level listeners for all
     * six domain events (`on`, `off`, `mixed`, `enabled`, `disabled`,
     * `readonly`).
     *
     */
    protected setupDebug(): void {
        super.setupDebug();

        this.on("on", (ev) => this.logDebug(ToggleEvents.ON, ev));
        this.on("off", (ev) => this.logDebug(ToggleEvents.OFF, ev));
        this.on("mixed", (ev) => this.logDebug(ToggleEvents.MIXED, ev));
        this.on("enabled", (ev) => this.logDebug(ToggleEvents.ENABLED, ev));
        this.on("disabled", (ev) => this.logDebug(ToggleEvents.DISABLED, ev));
        this.on("readonly", (ev) => this.logDebug(ToggleEvents.READONLY, ev));
    }

    /**
     * Emits a DEBUG log line for the given domain event.
     *
     * @param name The domain event name (e.g. `"on"`).
     * @param ev The dispatched `CustomEvent`.
     */
    private logDebug(name: ToggleEvents, ev: Event): void {
        const target = ev.target as HTMLElement | null;
        const id = target?.id || target?.getAttribute("name") || "<anonymous>";
        const detail = (ev as CustomEvent<ToggleEventDetail>).detail;

        console.debug(`[toggle:DEBUG] ${name}`, {
            state: detail?.state,
            target: id,
        });
    }
}
