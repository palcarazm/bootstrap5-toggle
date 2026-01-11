/* eslint-disable @typescript-eslint/no-explicit-any */

import { Toggle } from "../../main/ts/BootstrapToggle";
import { DOMBuilder } from "../../main/ts/core/DOMBuilder";
import { ToggleActionType } from "../../main/ts/core/StateReducer.types";

/* =========================
   Mocks inline
   ========================= */

const renderMock = jest.fn();
const destroyMock = jest.fn();
const doMock = jest.fn(() => true);
const getMock = jest.fn(() => ({}));
const syncMock = jest.fn();
const canInteractMock = jest.fn(() => true);

jest.mock("../../main/ts/core/DOMBuilder", () => {
    return {
        DOMBuilder: jest.fn().mockImplementation(() => ({
            root: document.createElement("div"),
            render: renderMock,
            destroy: destroyMock,
        })),
    };
});

jest.mock("../../main/ts/core/StateReducer", () => {
    return {
        StateReducer: jest.fn().mockImplementation(() => ({
            do: doMock,
            get: getMock,
            sync: syncMock,
            canInteract: canInteractMock,
        })),
    };
});

jest.mock("../../main/ts/core/OptionResolver", () => ({
    OptionResolver: {
        resolve: jest.fn(() => ({
            tristate: false,
            size: "",
            style: "",
            tabindex: 0,
            name: null,
            onlabel: "On",
            offlabel: "Off",
            onstyle: "primary",
            offstyle: "secondary",
            ontitle: null,
            offtitle: null,
            onvalue: null,
            offvalue: null,
            width: null,
            height: null,
        })),
    },
}));

/* =========================
   Tests
   ========================= */

describe("Toggle", () => {
    let input: HTMLInputElement;

    beforeEach(() => {
        jest.clearAllMocks();
        input = document.createElement("input");
        input.type = "checkbox";
        document.body.appendChild(input);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    describe("constructor", () => {
        it("initializes and stores instance on element", () => {
            const toggle = new Toggle(input, {});

            expect(toggle).toBeDefined();
            expect((input as any).bsToggle).toBe(toggle);
        });

        it("bind events listeners", () => {
            input.id = "test-toggle";
            const label = document.createElement("label");
            label.setAttribute("for", "test-toggle");
            document.body.appendChild(label);

            const addEventListenerSpyDiv = jest.spyOn(
                HTMLDivElement.prototype,
                "addEventListener"
            );

            const addEventListenerSpyLabel = jest.spyOn(
                HTMLLabelElement.prototype,
                "addEventListener"
            );

            const _ = new Toggle(input, {});

            expect(addEventListenerSpyDiv).toHaveBeenCalledWith(
                "pointerdown",
                expect.any(Function),
                expect.any(Object)
            );
            expect(addEventListenerSpyDiv).toHaveBeenCalledWith(
                "keypress",
                expect.any(Function),
                expect.any(Object)
            );

            expect(addEventListenerSpyLabel).toHaveBeenCalledWith(
                "click",
                expect.any(Function),
                expect.objectContaining({ passive: false })
            );

            addEventListenerSpyDiv.mockRestore();
            addEventListenerSpyLabel.mockRestore();
        });
    });

    describe("interceptInputProperties()", () => {
        it("reacts to checked property change", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            input.checked = true;

            expect(spy).toHaveBeenCalled();
        });

        it("reacts to disabled property change", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            input.disabled = true;

            expect(spy).toHaveBeenCalled();
        });

        it("does not throw when setting same value", () => {
            new Toggle(input, {});

            expect(() => {
                input.checked = false;
            }).not.toThrow();
        });
    });


    describe("Pointer interactions", () => {
        let root: HTMLElement;

        beforeEach(() => {
            const toggle = new Toggle(input, {});
            root = (DOMBuilder as any).mock.results[0].value.root;
            jest.spyOn(toggle as any, "apply");
        });

        it("toggles on pointerdown + pointerup", () => {
            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 10,
                    clientY: 10,
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointerup", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 12,
                    clientY: 12,
                })
            );

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
        });

        it("cancels interaction when vertical scroll exceeds threshold on move", () => {
            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 10,
                    clientY: 10,
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointermove", {
                    clientX: 12,
                    clientY: 50, // Exceeds SCROLL_THRESHOLD >> CANCEL
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointerup", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 12,
                    clientY: 12, // Not exceeds SCROLL_THRESHOLD
                })
            );

            expect(doMock).not.toHaveBeenCalled();
        });

        it("cancels interaction when vertical scroll exceeds threshold on up", () => {
            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 10,
                    clientY: 10,
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointerup", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 12,
                    clientY: 50, // Exceeds SCROLL_THRESHOLD >> CANCEL
                })
            );

            expect(doMock).not.toHaveBeenCalled();
        });

        it("ignores non-primary mouse button on pointerdown", () => {
            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 2,
                    clientX: 10,
                    clientY: 10,
                })
            );

            expect(doMock).not.toHaveBeenCalled();
        });

        it("ignores non-primary mouse button on pointerup", () => {
            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 10,
                    clientY: 10,
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointerup", {
                    pointerType: "mouse",
                    button: 2,
                    clientX: 10,
                    clientY: 10,
                })
            );

            expect(doMock).not.toHaveBeenCalled();
        });

        it("does not interact when canInteract is false", () => {
            canInteractMock.mockReturnValueOnce(false);

            root.dispatchEvent(
                new PointerEvent("pointerdown", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 10,
                    clientY: 10,
                })
            );

            root.dispatchEvent(
                new PointerEvent("pointerup", {
                    pointerType: "mouse",
                    button: 0,
                    clientX: 12,
                    clientY: 12,
                })
            );

            expect(doMock).not.toHaveBeenCalled();
        });
    });

    describe("Keyboard interactions", () => {
        let root: HTMLElement;

        beforeEach(() => {
            const _ = new Toggle(input, {});
            root = (DOMBuilder as any).mock.results[0].value.root;
        });

        it("toggles on space keypress", () => {
            root.dispatchEvent(
                new KeyboardEvent("keypress", { key: " " })
            );

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
        });

        it("ignores other keys", () => {
            root.dispatchEvent(
                new KeyboardEvent("keypress", { key: "Enter" })
            );

            expect(doMock).not.toHaveBeenCalled();
        });
    });

    describe("Label interaction", () => {
        it("clicking label toggles and focuses root", () => {
            input.id = "toggle-id";

            const label = document.createElement("label");
            label.setAttribute("for", "toggle-id");
            document.body.appendChild(label);

            const _ = new Toggle(input, {});
            const root = (DOMBuilder as any).mock.results[0].value.root;
            const focusSpy = jest.spyOn(root, "focus");

            label.click();

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    describe("form reset handling", () => {
        it("syncs after form reset", () => {
            jest.useFakeTimers();

            const form = document.createElement("form");
            form.appendChild(input);
            document.body.appendChild(form);

            const toggle = new Toggle(input, {});
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            form.reset();

            expect(spy).not.toHaveBeenCalled();

            jest.runAllTimers();

            expect(spy).toHaveBeenCalled();

            jest.useRealTimers();
        });
    });



    describe("apply(action: ToggleActionType, silent = false)", () => {
        it("calls StateReducer.do and DOMBuilder.render", () => {
            const toggle = new Toggle(input, {});

            (toggle as any).apply(ToggleActionType.TOGGLE);

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.TOGGLE);
            expect(renderMock).toHaveBeenCalled();
        });

        it("dispatches change event when not silent", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.fn();

            input.addEventListener("change", spy);

            (toggle as any).apply(ToggleActionType.TOGGLE, false);

            expect(spy).toHaveBeenCalled();
        });

        it("does not dispatch change event when silent", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.fn();

            input.addEventListener("change", spy);

            (toggle as any).apply(ToggleActionType.TOGGLE, true);

            expect(spy).not.toHaveBeenCalled();
        });

        it("guard against sync loops:does not react to internal apply-triggered input change", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            (toggle as any).apply(ToggleActionType.TOGGLE);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("delegate to apply(action: ToggleActionType, silent = false)", () => {
        let apply: jest.SpyInstance;

        beforeEach(() => {
            apply = jest.spyOn(Toggle.prototype as any, "apply");
        });

        afterAll(() => {
            apply.mockRestore();
        });

        it("toggle(silent=false)", () => {
            const toggle = new Toggle(input, {});

            toggle.toggle();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.TOGGLE, false);

            toggle.toggle(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.TOGGLE, true);
        });

        it("on(silent=false)", () => {
            const toggle = new Toggle(input, {});

            toggle.on();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ON, false);

            toggle.on(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ON, true);
        });

        it("off(silent=false)", () => {
            const toggle = new Toggle(input, {});

            toggle.off();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.OFF, false);

            toggle.off(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.OFF, true);
        });

        it("determinate(silent=false)", () => {
            const toggle = new Toggle(input, {});

            toggle.determinate();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DETERMINATE, false);

            toggle.determinate(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DETERMINATE, true);
        });

        it("indeterminate(silent=false)", () => {
            const toggle = new Toggle(input, {});

            toggle.indeterminate();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.INDETERMINATE, false);

            toggle.indeterminate(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.INDETERMINATE, true);
        });

        it("enable()", () => {
            const toggle = new Toggle(input, {});

            toggle.enable();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ENABLE);
        });

        it("disable()", () => {
            const toggle = new Toggle(input, {});

            toggle.disable();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DISABLE);
        });

        it("readonly()", () => {
            const toggle = new Toggle(input, {});

            toggle.readonly();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.READONLY);
        });
    });

    describe("update(silent: boolean)", () => {
        it("syncs state and renders on update()", () => {
            const toggle = new Toggle(input, {});

            toggle.update(true);

            expect(syncMock).toHaveBeenCalledWith(input);
            expect(renderMock).toHaveBeenCalled();
        });

        it("dispatches change event when not silent", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.fn();

            input.addEventListener("change", spy);

            toggle.update(false);

            expect(spy).toHaveBeenCalled();
        });
    
        it("does not dispatch change event when silent", () => {
            const toggle = new Toggle(input, {});
            const spy = jest.fn();

            input.addEventListener("change", spy);

            toggle.update(true);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("destroy()", () => {
        it("destroys DOM and unlink instance on destroy()", () => {
            const toggle = new Toggle(input, {});

            toggle.destroy();

            expect(destroyMock).toHaveBeenCalled();
            expect((input as any).bsToggle).toBeUndefined();
        });
        it("restores native input descriptors allowing reinitialization", () => {
            const toggle1 = new Toggle(input, {});
            toggle1.destroy();

            expect(() => {
                new Toggle(input, {});
            }).not.toThrow();
        });
        it("unbind events listeners", () => {
            input.id = "test-toggle";

            const label = document.createElement("label");
            label.setAttribute("for", "test-toggle");

            const form = document.createElement("form");
            form.appendChild(input);
            form.appendChild(label);
            document.body.appendChild(form);

            const removeEventListenerSpyDiv = jest.spyOn(
                HTMLDivElement.prototype,
                "removeEventListener"
            );

            const removeEventListenerSpyLabel = jest.spyOn(
                HTMLLabelElement.prototype,
                "removeEventListener"
            );

            const removeEventListenerSpyForm = jest.spyOn(
                HTMLFormElement.prototype,
                "removeEventListener"
            );

            const toggle = new Toggle(input, {});
            toggle.destroy();

            expect(removeEventListenerSpyDiv).toHaveBeenCalledWith(
                "pointerdown",
                expect.any(Function)
            );
            expect(removeEventListenerSpyDiv).toHaveBeenCalledWith(
                "keypress",
                expect.any(Function)
            );

            expect(removeEventListenerSpyLabel).toHaveBeenCalledWith(
                "click",
                expect.any(Function)
            );

            expect(removeEventListenerSpyForm).toHaveBeenCalledWith(
                "reset",
                expect.any(Function)
            );

            removeEventListenerSpyDiv.mockRestore();
            removeEventListenerSpyLabel.mockRestore();
            removeEventListenerSpyForm.mockRestore();
        });
    });

    describe("rerender()", () =>{
        it("rerender destroys and reinitializes toggle", () => {
            (input as any).bootstrapToggle = jest.fn();

            const toggle = new Toggle(input, {});
            toggle.rerender();

            expect(destroyMock).toHaveBeenCalled();
            expect(DOMBuilder).toHaveBeenCalledTimes(2);
        });
    });
});
