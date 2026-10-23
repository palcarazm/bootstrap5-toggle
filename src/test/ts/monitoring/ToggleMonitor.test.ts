/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Monitor, LogLevels } from "component-lifecycle";
import { ToggleMonitor } from "../../../main/ts/monitoring/ToggleMonitor";

describe("ToggleMonitor", () => {
    let monitor: ToggleMonitor;

    beforeEach(() => {
        monitor = new ToggleMonitor();
    });

    afterEach(() => {
        try {
            monitor.stop();
        } catch {
            // Ignore: stop() on a non-started monitor throws.
        }
    });
    
    describe("construction", () => {
        it("extends Monitor", () => {
            expect(monitor).toBeInstanceOf(Monitor);
        });
    });

    describe("setupDebug()", () => {
        it("calls super.setupDebug() and registers listeners for all six domain events", () => {
            const onSpy = jest.spyOn(monitor as any, "on");

            monitor.start(LogLevels.DEBUG);

            ["on", "off", "mixed", "enabled", "disabled", "readonly"].forEach((eventName) => {
                expect(onSpy).toHaveBeenCalledWith(
                    eventName,
                    expect.any(Function)
                );
            });

            onSpy.mockRestore();
        });

        it("logs a line for a dispatched domain event", () => {
            const debugSpy = jest.spyOn(console, "debug").mockImplementation();

            monitor.start(LogLevels.DEBUG);

            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = "my-toggle";
            document.body.appendChild(input);

            const ev = new CustomEvent("toggle:on", {
                detail: { state: { value: "on", checked: true } },
                bubbles: true,
            });
            input.dispatchEvent(ev);

            expect(debugSpy).toHaveBeenCalledWith(
                expect.stringContaining("[toggle:DEBUG] on"),
                expect.objectContaining({
                    target: "my-toggle",
                    state: expect.objectContaining({ value: "on" }),
                })
            );

            debugSpy.mockRestore();
            document.body.innerHTML = "";
        });

        it("falls back to '<anonymous>' when target has no id or name", () => {
            const debugSpy = jest.spyOn(console, "debug").mockImplementation();

            monitor.start(LogLevels.DEBUG);

            const input = document.createElement("input");
            input.type = "checkbox";
            document.body.appendChild(input);

            const ev = new CustomEvent("toggle:off", {
                detail: { state: { value: "off", checked: false } },
                bubbles: true,
            });
            input.dispatchEvent(ev);

            expect(debugSpy).toHaveBeenCalledWith(
                expect.stringContaining("[toggle:DEBUG] off"),
                expect.objectContaining({ target: "<anonymous>" })
            );

            debugSpy.mockRestore();
            document.body.innerHTML = "";
        });
    });
});