/* eslint-disable @typescript-eslint/no-explicit-any */

import { DOMBuilder } from "../../../main/ts/core/DOMBuilder";
import {
    ToggleStateStatus,
    ToggleStateValue,
    ToggleState,
} from "../../../main/ts/core/StateReducer.types";
import { PlacementOptions, ToggleOptions } from "../../../main/ts/core/OptionResolver.types";

function createCheckbox(): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "test";
    document.body.appendChild(input);
    return input;
}

const BASE_OPTIONS: ToggleOptions = {
    onlabel: "ON",
    offlabel: "OFF",
    onstyle: "primary",
    offstyle: "secondary",
    onvalue: "1",
    offvalue: "0",
    ontitle: null,
    offtitle: null,
    size: "",
    style: "",
    width: null,
    height: null,
    tabindex: 0,
    tristate: false,
    name: "myToggle",
    aria: {label: "Toggle"},
};

function state(
    value: ToggleStateValue,
    status: ToggleStateStatus,
    checked = false,
    indeterminate = false
): ToggleState {
    return {
        value,
        status,
        checked,
        indeterminate,
    };
}

describe("DOMBuilder", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("builds toggle DOM structure", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
        );

        const toggle = document.querySelector(".toggle");
        expect(toggle).not.toBeNull();
        expect(toggle!.querySelector(".toggle-group")).not.toBeNull();
        expect(toggle!.querySelector(".toggle-on")).not.toBeNull();
        expect(toggle!.querySelector(".toggle-off")).not.toBeNull();
        expect(toggle!.querySelector(".toggle-handle")).not.toBeNull();
    });

    it("defers render when parent not visible", () => {
        (globalThis as any).__dom_setup_setHidden();
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
        );
        expect(document.querySelector(".toggle")).toBeNull();
        (globalThis as any).__dom_setup_setVisible();
        (globalThis as any).__dom_setup_triggerResize(120, 40);
        expect(document.querySelector(".toggle")).not.toBeNull();
    });

    it("renders ON state", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
        );

        const toggle = document.querySelector(".toggle")!;
        expect(toggle.classList.contains("btn-primary")).toBe(true);
        expect(toggle.classList.contains("off")).toBe(false);
        expect(checkbox.checked).toBe(true);
        expect(checkbox.value).toBe("1");
    });

    it("renders OFF state", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED, false)
        );

        const toggle = document.querySelector(".toggle")!;
        expect(toggle.classList.contains("btn-secondary")).toBe(true);
        expect(toggle.classList.contains("off")).toBe(true);
        expect(checkbox.checked).toBe(false);
    });

    it("renders INDETERMINATE state", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(
                ToggleStateValue.MIXED,
                ToggleStateStatus.ENABLED,
                false,
                true
            )
        );

        expect(checkbox.indeterminate).toBe(true);
    });

    it("applies disabled state", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.DISABLED)
        );

        const toggle = document.querySelector(".toggle")!;
        expect(toggle.classList.contains("disabled")).toBe(true);
        expect(checkbox.disabled).toBe(true);
    });

    it("applies readonly state", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.READONLY)
        );

        const toggle = document.querySelector(".toggle")!;
        expect(toggle.classList.contains("disabled")).toBe(true);
        expect(checkbox.readOnly).toBe(true);
        expect(checkbox.disabled).toBe(false);
    });

    it("sets input name correctly", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
        );

        expect(checkbox.name).toBe("myToggle");
    });

    it("creates inverted checkbox when offvalue exists", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            BASE_OPTIONS,
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
        );

        const inv = document.querySelector(
            'input[data-toggle="invert-toggle"]'
        ) as HTMLInputElement;

        expect(inv).not.toBeNull();
        expect(inv.value).toBe("0");
    });

    it("applies explicit width and height", () => {
        const checkbox = createCheckbox();

        const _ = new DOMBuilder(
            checkbox,
            {
                ...BASE_OPTIONS,
                width: "120px",
                height: "40px",
            },
            state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
        );

        const toggle = document.querySelector(".toggle") as HTMLElement;
        expect(toggle.style.width).toBe("120px");
        expect(toggle.style.height).toBe("40px");
    });

    describe("ARIA accessibility", () => {
        it("sets role='switch' on toggle root", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("role")).toBe("switch");
        });

        it("sets aria-label from options", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                {
                    ...BASE_OPTIONS,
                    aria: { label: "Email notifications" },
                },
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-label")).toBe("Email notifications");
        });

        it("sets aria-checked='true' when ON", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-checked")).toBe("true");
        });

        it("sets aria-checked='false' when OFF", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED, false)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-checked")).toBe("false");
        });

        it("sets aria-checked='mixed' when MIXED", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(
                    ToggleStateValue.MIXED,
                    ToggleStateStatus.ENABLED,
                    false,
                    true
                )
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-checked")).toBe("mixed");
        });

        it("sets aria-disabled when disabled", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.DISABLED)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-disabled")).toBe("true");
            expect(toggle.getAttribute("aria-readonly")).toBe("false");
        });

        it("sets aria-readonly when readonly", () => {
            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.READONLY)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-readonly")).toBe("true");
            expect(toggle.getAttribute("aria-disabled")).toBe("false");
        });

        it("updates ARIA attributes when state changes", () => {
            const checkbox = createCheckbox();

            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED, false)
            );

            const toggle = document.querySelector(".toggle")!;

            // OFF (INITIAL STATE)

            // ON
            builder.render(
                state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
            );
            expect(toggle.getAttribute("aria-checked")).toBe("true");
            expect(toggle.getAttribute("aria-disabled")).toBe("false");
            expect(toggle.getAttribute("aria-readonly")).toBe("false");

            // MIXED
            builder.render(
                state(ToggleStateValue.MIXED, ToggleStateStatus.ENABLED, false, true)
            );
            expect(toggle.getAttribute("aria-checked")).toBe("mixed");
            expect(toggle.getAttribute("aria-disabled")).toBe("false");
            expect(toggle.getAttribute("aria-readonly")).toBe("false");

            // OFF
            builder.render(
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED, false)
            );
            expect(toggle.getAttribute("aria-checked")).toBe("false");
            expect(toggle.getAttribute("aria-disabled")).toBe("false");
            expect(toggle.getAttribute("aria-readonly")).toBe("false"); 

            // DISABLED
            builder.render(
                state(ToggleStateValue.OFF, ToggleStateStatus.DISABLED, false)
            );
            expect(toggle.getAttribute("aria-checked")).toBe("false");
            expect(toggle.getAttribute("aria-disabled")).toBe("true");
            expect(toggle.getAttribute("aria-readonly")).toBe("false");

            // READONLY
            builder.render(
                state(ToggleStateValue.ON, ToggleStateStatus.READONLY, true)
            );
            expect(toggle.getAttribute("aria-checked")).toBe("true");
            expect(toggle.getAttribute("aria-disabled")).toBe("false");
            expect(toggle.getAttribute("aria-readonly")).toBe("true");
        });


        it("uses associated <label> via aria-labelledby when present", () => {
            const label = document.createElement("label");
            label.id = "toggle-label";
            label.htmlFor = "test";
            label.textContent = "Dark mode";

            document.body.appendChild(label);

            const checkbox = createCheckbox();

            const _ = new DOMBuilder(
                checkbox,
                {
                    ...BASE_OPTIONS
                },
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const toggle = document.querySelector(".toggle")!;
            expect(toggle.getAttribute("aria-labelledby")).toBe("toggle-label");
            expect(toggle.hasAttribute("aria-label")).toBe(false);
        });
    });

    describe("cancelPendingAnimationFrame", () => {
        it("calls cancelAnimationFrame when requestAnimationFrameId exists", () => {
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            (builder as any).requestAnimationFrameId = 123;
            
            const builderAny = builder as any;
            builderAny.cancelPendingAnimationFrame();
            
            expect((globalThis as any).__dom_cancelRAF).toHaveBeenCalledWith(123);
            expect(builderAny.requestAnimationFrameId).toBeUndefined();
        });

        it("does nothing when requestAnimationFrameId is undefined", () => {
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const builderAny = builder as any;
            builderAny.requestAnimationFrameId = undefined;
            builderAny.cancelPendingAnimationFrame();
            
            expect((globalThis as any).__dom_cancelRAF).not.toHaveBeenCalled();
        });

        it("does nothing when cancelAnimationFrame is not a function", () => {
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            (globalThis as any).cancelAnimationFrame = undefined;
            
            const builderAny = builder as any;
            builderAny.requestAnimationFrameId = 123;
            builderAny.cancelPendingAnimationFrame();
            
            expect(builderAny.requestAnimationFrameId).toBe(123);
        });
    });

    describe("handleToggleSize - Error handling", () => {
        it("handles errors in calculateToggleSize gracefully", async () => {
            const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
            const checkbox = createCheckbox();
            
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const builderAny = builder as any;
            const originalCalculate = builderAny.calculateToggleSize;
            builderAny.calculateToggleSize = jest.fn(() => {
                throw new Error("Test error");
            });
            builderAny.handleToggleSize(null, null);
            
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                "Error calculating toggle size:",
                expect.any(Error)
            );
            
            builderAny.calculateToggleSize = originalCalculate;
            consoleWarnSpy.mockRestore();
        });

        it("uses fallback when requestAnimationFrame is not supported", () => {
            (globalThis as any).requestAnimationFrame = undefined;
            
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const builderAny = builder as any;
            const calculateSpy = jest.spyOn(builderAny, "calculateToggleSize");

            builderAny.handleToggleSize(null, null);

            expect(calculateSpy).toHaveBeenCalledWith(null, null);
            
            calculateSpy.mockRestore();
        });

        it("cancels pending animation frame before scheduling new one", () => {
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const builderAny = builder as any;
            const cancelSpy = jest.spyOn(builderAny, "cancelPendingAnimationFrame");
            
            builderAny.requestAnimationFrameId = 999;
            
            builderAny.handleToggleSize(null, null);
            
            expect(cancelSpy).toHaveBeenCalledTimes(1);
            
            cancelSpy.mockRestore();
        });
    });

    describe("Integration with destroy", () => {
        it("cancels animation frame on destroy", () => {
            const checkbox = createCheckbox();
            const builder = new DOMBuilder(
                checkbox,
                BASE_OPTIONS,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            const builderAny = builder as any;
            const cancelSpy = jest.spyOn(builderAny, "cancelPendingAnimationFrame");
            
            builder.destroy();
            
            expect(cancelSpy).toHaveBeenCalled();
            cancelSpy.mockRestore();
        }); 
    });

    describe("Tooltip functionality", () => {
        let checkbox: HTMLInputElement;
        let optionsWithTooltip: ToggleOptions;
        let mockTooltipInstance: any;
        let mockBootstrap: any;

        beforeEach(() => {
            checkbox = createCheckbox();
        
            optionsWithTooltip = {
                ...BASE_OPTIONS,
                tooltip: {
                    placement: PlacementOptions.TOP,
                    title: {
                        on: "Switch is ON",
                        off: "Switch is OFF", 
                        mixed: "Switch is MIXED"
                    }
                }
            };

            mockTooltipInstance = {
                dispose: jest.fn(),
                setContent: jest.fn(),
                update: jest.fn(),
                disable: jest.fn()
            };

            mockBootstrap = {
                Tooltip: jest.fn().mockReturnValue(mockTooltipInstance)
            };

            globalThis.window.bootstrap = mockBootstrap;
        });

        afterEach(() => {
            if (globalThis.window?.bootstrap) {
                delete (globalThis.window as any).bootstrap;
            }
        });

        it("creates tooltip when tooltip options are provided and Bootstrap is available", () => {
            const _ = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(mockBootstrap.Tooltip).toHaveBeenCalledWith(
                expect.any(HTMLElement),
                {
                    placement: "top",
                    html: true,
                    title: "Switch is ON"
                }
            );

            expect(mockTooltipInstance.setContent).toHaveBeenCalledWith({".tooltip-inner":"Switch is OFF"});
        });

        it("does not create tooltip when tooltip options are not provided", () => {
            const _ = new DOMBuilder(
                checkbox,
                { ...BASE_OPTIONS },
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(mockBootstrap.Tooltip).not.toHaveBeenCalled();
        });

        it("handles Bootstrap not being available gracefully", () => {
            delete (globalThis.window as any).bootstrap;

            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

            const _ = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Error creating tooltip:",
                expect.any(Error)
            );

            expect(document.querySelector(".toggle")).not.toBeNull();

            consoleErrorSpy.mockRestore();
        });

        it("updates tooltip content when state changes from OFF to ON", () => {
            const builder = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            builder.render(state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true));

            expect(mockTooltipInstance.setContent).toHaveBeenCalledWith({
                ".tooltip-inner": "Switch is ON"
            });
        });

        it("updates tooltip content when state changes to MIXED", () => {
            const builder = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
            );

            builder.render(state(
                ToggleStateValue.MIXED,
                ToggleStateStatus.ENABLED,
                false,
                true
            ));

            expect(mockTooltipInstance.setContent).toHaveBeenCalledWith({
                ".tooltip-inner": "Switch is MIXED"
            });
        });

        it("does not update tooltip when tooltipLabels is undefined", () => {
            const builder = new DOMBuilder(
                checkbox,
                { ...BASE_OPTIONS },
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            builder.render(state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true));

            expect(mockTooltipInstance.setContent).not.toHaveBeenCalled();
        });

        it("disposes tooltip when destroy is called", () => {
            const builder = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            builder.destroy();

            expect(mockTooltipInstance.dispose).toHaveBeenCalled();
        });

        it("handles destroy gracefully when tooltip is undefined", () => {
            const builder = new DOMBuilder(
                checkbox,
                { ...BASE_OPTIONS},
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(() => builder.destroy()).not.toThrow();
        });

        it("uses correct initial tooltip title based on initial state", () => {
            const _ = new DOMBuilder(
                checkbox,
                optionsWithTooltip,
                state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
            );

            expect(mockBootstrap.Tooltip).toHaveBeenCalledWith(
                expect.any(HTMLElement),
                expect.objectContaining({
                    title: "Switch is ON"
                })
            );
        });

        it("supports different tooltip placements", () => {
            const optionsWithBottomTooltip = {
                ...optionsWithTooltip,
                tooltip: {
                    ...optionsWithTooltip.tooltip!,
                    placement: PlacementOptions.BOTTOM
                }
            };

            const _ = new DOMBuilder(
                checkbox,
                optionsWithBottomTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(mockBootstrap.Tooltip).toHaveBeenCalledWith(
                expect.any(HTMLElement),
                expect.objectContaining({
                    placement: "bottom"
                })
            );
        });

        it("handles HTML content in tooltip titles", () => {
            const optionsWithHTMLTooltip = {
                ...BASE_OPTIONS,
                tooltip: {
                    placement: PlacementOptions.TOP,
                    title: {
                        on: "<b>ON</b> state",
                        off: "<i>OFF</i> state",
                        mixed: "<span>MIXED</span> state"
                    }
                }
            };

            const _ = new DOMBuilder(
                checkbox,
                optionsWithHTMLTooltip,
                state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
            );

            expect(mockBootstrap.Tooltip).toHaveBeenCalledWith(
                expect.any(HTMLElement),
                expect.objectContaining({
                    title: "<b>ON</b> state",
                    html: true
                })
            );

            expect(mockTooltipInstance.setContent).toHaveBeenCalledWith({".tooltip-inner":"<i>OFF</i> state"});
        });
    });
});
