import { Toggle } from "../../main/ts/BootstrapToggle";
import { ToggleActionType } from "../../main/ts/core/StateReducer.types";

/* =========================
   Mocks inline
   ========================= */

const renderMock = jest.fn();
const destroyMock = jest.fn();
const doMock = jest.fn(() => true);
const getMock = jest.fn(() => ({}));
const syncMock = jest.fn();

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

      const toggle = new Toggle(input, {});

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
        "pointerdown",
        expect.any(Function),
        expect.objectContaining({ passive: false })
      );

      addEventListenerSpyDiv.mockRestore();
      addEventListenerSpyLabel.mockRestore();
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

    it("unbind events listeners", () => {
      input.id = "test-toggle";
      const label = document.createElement("label");
      label.setAttribute("for", "test-toggle");
      document.body.appendChild(label);

      const removeEventListenerSpyDiv = jest.spyOn(
        HTMLDivElement.prototype,
        "removeEventListener"
      );

      const removeEventListenerSpyLabel = jest.spyOn(
        HTMLLabelElement.prototype,
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
        "pointerdown",
        expect.any(Function)
      );

      removeEventListenerSpyDiv.mockRestore();
      removeEventListenerSpyLabel.mockRestore();
    });
  });

  describe("rerender()", () =>{
    it("rerender destroys and reinitializes toggle", () => {
      (input as any).bootstrapToggle = jest.fn();

      const toggle = new Toggle(input, {});
      toggle.rerender();

      expect(destroyMock).toHaveBeenCalled();
      expect((input as any).bootstrapToggle).toHaveBeenCalled();
    });
  });
});
