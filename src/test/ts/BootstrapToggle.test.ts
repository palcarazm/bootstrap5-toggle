/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Toggle } from "../../main/ts/BootstrapToggle";
import { DOMBuilder } from "../../main/ts/core/DOMBuilder";
import { OptionResolver } from "../../main/ts/core/OptionResolver";
import { ToggleActionType, ToggleStateValue } from "../../main/ts/core/StateReducer.types";
import ToggleEvents from "../../main/ts/types/ToggleEvents";

/* =========================
   Mocks inline
   ========================= */

const renderMock = jest.fn();
const destroyMock = jest.fn();
const doMock = jest.fn(() => true);
const getMock = jest.fn(() => ({ value: "on" }));
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

async function attachToggleToInput(input: HTMLInputElement, options: Record<string, unknown> = {}) {
    const toggle = new Toggle(input, options);
    await toggle.init();
    await toggle.attach();
    return toggle;
}

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

        it("does NOT auto-start lifecycle", async () => {
            const initSpy = jest.spyOn(Toggle.prototype, "init");
            const attachSpy = jest.spyOn(Toggle.prototype, "attach");
            const _ = new Toggle(input, {});

            await Promise.resolve();

            expect(initSpy).not.toHaveBeenCalled();
            expect(attachSpy).not.toHaveBeenCalled();
        });
    });

    describe("lifecycle", () => {
        it("init() → initialized state, doInit() creates stateReducer", async () => {
            const toggle = new Toggle(input, {});
            await toggle.init();
            expect(toggle.isInitialized()).toBe(true);
            expect((toggle as any).stateReducer).toBeDefined();
        });

        it("attach() → attached state, doAttach() builds DOM and binds listeners", async () => {
            const toggle = new Toggle(input, {});
            const addDiv = jest.spyOn(HTMLDivElement.prototype, "addEventListener");
            await toggle.init();
            await toggle.attach();
            expect(toggle.isAttached()).toBe(true);
            expect(addDiv).toHaveBeenCalledWith("pointerdown", expect.any(Function), expect.any(Object));
            expect(addDiv).toHaveBeenCalledWith("keydown", expect.any(Function), expect.any(Object));
            addDiv.mockRestore();
        });

        it("dispose() → disposed state, doDispose() unbinds and destroys DOM", async () => {
            const toggle = new Toggle(input, {});
            await toggle.init();
            await toggle.attach();
            await toggle.dispose();
            expect(toggle.isDisposed()).toBe(true);
            expect(document.querySelector(".toggle")).toBeNull();
        });

        it("destroy() → destroyed state, doDestroy() deletes bsToggle", async () => {
            const toggle = new Toggle(input, {});
            await toggle.init();
            await toggle.attach();
            await toggle.destroy();
            expect(toggle.isDestroyed()).toBe(true);
            expect((input as any).bsToggle).toBeUndefined();
        });

        it("destroy() from attached runs dispose() first then destroy()", async () => {
            const toggle = new Toggle(input, {});
            await toggle.init();
            await toggle.attach();
            const disposeSpy = jest.spyOn(toggle as any, "doDispose");
            await toggle.destroy();
            expect(disposeSpy).toHaveBeenCalled();
            expect(toggle.isDestroyed()).toBe(true);
        });
    });

    describe("interceptInputProperties()", () => {
        it("reacts to checked property change", async () => {
            const toggle = await attachToggleToInput(input);
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            input.checked = true;

            expect(spy).toHaveBeenCalled();
        });

        it("reacts to disabled property change", async () => {
            const toggle = await attachToggleToInput(input);
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            input.disabled = true;

            expect(spy).toHaveBeenCalled();
        });

        it("does not throw when setting same value", async () => {
            const _ = await attachToggleToInput(input);

            expect(() => {
                input.checked = false;
            }).not.toThrow();
        });
    });


    describe("Pointer interactions", () => {
        let root: HTMLElement;

        beforeEach(async () => {
            const toggle = await attachToggleToInput(input);
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

        beforeEach(async () => {
            const _ = await attachToggleToInput(input);
            root = (DOMBuilder as any).mock.results[0].value.root;
        });

        it("toggles on space keydown", () => {
            root.dispatchEvent(
                new KeyboardEvent("keydown", { key: " " })
            );

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
        });

        it("toggles on Enter keydown", () => {
            root.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Enter" })
            );

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
        });

        it("ignores other keys", () => {
            root.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Ctrl" })
            );

            expect(doMock).not.toHaveBeenCalled();
        });
    });

    describe("Label interaction", () => {
        it("clicking label toggles and focuses root", async () => {
            input.id = "toggle-id";

            const label = document.createElement("label");
            label.setAttribute("for", "toggle-id");
            document.body.appendChild(label);

            const _ = await attachToggleToInput(input);
            const root = (DOMBuilder as any).mock.results[0].value.root;
            const focusSpy = jest.spyOn(root, "focus");

            label.click();

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.NEXT);
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    describe("form reset handling", () => {
        it("syncs after form reset", async () => {
            jest.useFakeTimers();

            const form = document.createElement("form");
            form.appendChild(input);
            document.body.appendChild(form);

            const toggle = await attachToggleToInput(input);
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            form.reset();

            expect(spy).not.toHaveBeenCalled();

            jest.runAllTimers();

            expect(spy).toHaveBeenCalled();

            jest.useRealTimers();
        });
    });

    describe("apply(action: ToggleActionType, silent = false)", () => {
        it("calls StateReducer.do and DOMBuilder.render", async () => {
            const toggle = await attachToggleToInput(input);

            (toggle as any).apply(ToggleActionType.TOGGLE);

            expect(doMock).toHaveBeenCalledWith(ToggleActionType.TOGGLE);
            expect(renderMock).toHaveBeenCalled();
        });

        it("dispatches change event when not silent", async () => {
            const toggle = await attachToggleToInput(input);
            const spy = jest.fn();

            input.addEventListener("change", spy);

            (toggle as any).apply(ToggleActionType.TOGGLE, false);

            expect(spy).toHaveBeenCalled();
        });

        it("does not dispatch change event when silent", async () => {
            const toggle = await attachToggleToInput(input);
            const spy = jest.fn();

            input.addEventListener("change", spy);

            (toggle as any).apply(ToggleActionType.TOGGLE, true);

            expect(spy).not.toHaveBeenCalled();
        });

        it("guard against sync loops:does not react to internal apply-triggered input change", async () => {
            const toggle = await attachToggleToInput(input);
            const spy = jest.spyOn(toggle as any, "onExternalChange");

            (toggle as any).apply(ToggleActionType.TOGGLE);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("custom events are triggered on apply", () => {
        let onEventSpy: jest.Mock;
        let offEventSpy: jest.Mock;
        let mixedEventSpy: jest.Mock;
        let enableEventSpy: jest.Mock;
        let disableEventSpy: jest.Mock;
        let readonlyEventSpy: jest.Mock;

        beforeEach(() => {
            onEventSpy = jest.fn();
            offEventSpy = jest.fn();
            mixedEventSpy = jest.fn();
            enableEventSpy = jest.fn();
            disableEventSpy = jest.fn();
            readonlyEventSpy = jest.fn();

            input.addEventListener("toggle:on", onEventSpy);
            input.addEventListener("toggle:off", offEventSpy);
            input.addEventListener("toggle:mixed", mixedEventSpy);
            input.addEventListener("toggle:enabled", enableEventSpy);
            input.addEventListener("toggle:disabled", disableEventSpy);
            input.addEventListener("toggle:readonly", readonlyEventSpy);
        });

        const customEventsCases =  [{
            eventSpy: ()=> onEventSpy,
            eventName: ToggleEvents.ON,
            action: ToggleActionType.ON,
        },
        {
            eventSpy: ()=> offEventSpy,
            eventName: ToggleEvents.OFF,
            action: ToggleActionType.OFF,
        },
        {
            eventSpy: ()=> mixedEventSpy,
            eventName: ToggleEvents.MIXED,
            action: ToggleActionType.INDETERMINATE,
        },
        {
            eventSpy: ()=> enableEventSpy,
            eventName: ToggleEvents.ENABLED,
            action: ToggleActionType.ENABLE,
        },
        {
            eventSpy: ()=> disableEventSpy,
            eventName: ToggleEvents.DISABLED,
            action: ToggleActionType.DISABLE,
        },{
            eventSpy: ()=> readonlyEventSpy,
            eventName: ToggleEvents.READONLY,
            action: ToggleActionType.READONLY,
        }];

        it.each(customEventsCases)("dispatches $eventName event for $action action", async ({ eventName, action}) => {
            input.disabled = action === ToggleActionType.ENABLE;
            input.checked = action !== ToggleActionType.ON;
 
            const toggle = await attachToggleToInput(input);

            (toggle as any).apply(action, false);

            customEventsCases.forEach((evtSpy)=>{
                if(evtSpy.eventName === eventName){
                    expect(evtSpy.eventSpy()).toHaveBeenCalled();
                    const eventDetail = evtSpy.eventSpy().mock.calls[0][0].detail;
                    expect(eventDetail).toEqual({
                        state: expect.objectContaining({
                            value: expect.any(String),
                        }),
                    });
                    expect(eventDetail.state).toEqual({ value: "on" });
                } else {
                    expect(evtSpy.eventSpy()).not.toHaveBeenCalled();
                }
            });
        });

        const valueBasedEventCases =  [{
            eventName: ToggleEvents.ON,
            action: ToggleActionType.TOGGLE,
            mockStateValue:ToggleStateValue.ON,
        },
        {
            eventName: ToggleEvents.OFF,
            action: ToggleActionType.TOGGLE,
            mockStateValue: ToggleStateValue.OFF,
        },
        {
            eventName: ToggleEvents.ON,
            action: ToggleActionType.NEXT,
            mockStateValue: ToggleStateValue.ON,
        },
        {
            eventName: ToggleEvents.OFF,
            action: ToggleActionType.NEXT,
            mockStateValue: ToggleStateValue.OFF,
        },
        {
            eventName: ToggleEvents.MIXED,
            action: ToggleActionType.NEXT,
            mockStateValue: ToggleStateValue.MIXED,
        }];

        it.each(valueBasedEventCases)("dispatches $eventName event for $action action based on state value $mockStateValue", async ({ eventName, action, mockStateValue}) => {
            const mockState = { value: mockStateValue };
            getMock.mockReturnValue(mockState);

            input.disabled = action === ToggleActionType.ENABLE;
            input.checked = action !== ToggleActionType.ON;

            const toggle = await attachToggleToInput(input);

            (toggle as any).apply(action, false);

            customEventsCases.forEach((evtSpy)=>{
                if(evtSpy.eventName === eventName){
                    expect(evtSpy.eventSpy()).toHaveBeenCalled();
                } else {
                    expect(evtSpy.eventSpy()).not.toHaveBeenCalled();
                }
            });
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

        it("toggle(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.toggle();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.TOGGLE, false);

            toggle.toggle(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.TOGGLE, true);
        });

        it("toggleOn(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.toggleOn();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ON, false);

            toggle.toggleOn(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ON, true);
        });

        it("toggleOff(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.toggleOff();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.OFF, false);

            toggle.toggleOff(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.OFF, true);
        });

        it("determinate(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.determinate();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DETERMINATE, false);

            toggle.determinate(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DETERMINATE, true);
        });

        it("indeterminate(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.indeterminate();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.INDETERMINATE, false);

            toggle.indeterminate(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.INDETERMINATE, true);
        });

        it("enable(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.enable();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ENABLE, false);

            toggle.enable(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.ENABLE, true);
        });

        it("disable(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.disable();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DISABLE, false);

            toggle.disable(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.DISABLE, true);
        });

        it("readonly(silent=false)", async () => {
            const toggle = await attachToggleToInput(input);

            toggle.readonly();
            expect(apply).toHaveBeenCalledWith(ToggleActionType.READONLY, false);

            toggle.readonly(true);
            expect(apply).toHaveBeenCalledWith(ToggleActionType.READONLY, true);
        });
    });

    describe("update()", () => {
        it("syncs state and renders on update()", async () => {
            const toggle = await attachToggleToInput(input);

            await toggle.update();

            expect(syncMock).toHaveBeenCalledWith(input);
            expect(renderMock).toHaveBeenCalled();
        });
    });

    describe("destroy()", () => {
        it("destroys DOM and unlink instance on destroy()", async () => {
            const toggle = await attachToggleToInput(input);

            await toggle.destroy();

            expect(destroyMock).toHaveBeenCalled();
            expect((input as any).bsToggle).toBeUndefined();
        });
        it("restores native input descriptors allowing reinitialization", async () => {
            const toggle1 = await attachToggleToInput(input);
            toggle1.destroy();

            expect(async () => {
                const _ = await attachToggleToInput(input);
            }).not.toThrow();
        });
        it("unbind events listeners", async () => {
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

            const toggle = await attachToggleToInput(input);
            toggle.destroy();

            expect(removeEventListenerSpyDiv).toHaveBeenCalledWith(
                "pointerdown",
                expect.any(Function)
            );
            expect(removeEventListenerSpyDiv).toHaveBeenCalledWith(
                "keydown",
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

    describe("rerender()", () => {
        it("routes through dispose() → attach() (emits lifecycle events)", async () => {
            const toggle = await attachToggleToInput(input);

            const disposed = jest.fn();
            const attached = jest.fn();
            toggle.on("toggle:disposed", disposed).on("toggle:attached", attached);

            await toggle.rerender();

            expect(disposed).toHaveBeenCalledTimes(1);
            expect(attached).toHaveBeenCalledTimes(1);
            expect(toggle.isAttached()).toBe(true);
        });
        
        it("re-resolves options from HTML attributes after change", async () => {
            
            const toggle = await attachToggleToInput(input, { onlabel: "Old" });

            const resolveSpy = jest.spyOn(OptionResolver, "resolve");
            input.dataset.onlabel = "New";

            await toggle.rerender();
            
            expect(resolveSpy).toHaveBeenCalledWith(input, toggle["userOptions"]);
            resolveSpy.mockRestore();
        });
    });
});
