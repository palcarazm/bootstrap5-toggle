import { StateReducer } from "../../../main/ts/core/StateReducer";
import {
  ToggleActionType,
  ToggleStateStatus,
  ToggleStateValue,
} from "../../../main/ts/core/StateReducer.types";

function createInput({
  checked,
  disabled = false,
  readOnly = false,
  indeterminate = false,
}: Partial<HTMLInputElement> & { checked: boolean }): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.disabled = disabled;
  input.readOnly = readOnly;
  input.indeterminate = indeterminate;
  return input;
}

describe("StateReducer", () => {
  describe("constructor", () => {
    it("initializes OFF state", () => {
      const reducer = new StateReducer(createInput({ checked: false }), false);

      expect(reducer.get()).toEqual({
        value: ToggleStateValue.OFF,
        checked: false,
        status: ToggleStateStatus.ENABLED,
        indeterminate: false,
      });
    });

    it("initializes ON state", () => {
      const reducer = new StateReducer(createInput({ checked: true }), false);

      expect(reducer.get().value).toBe(ToggleStateValue.ON);
    });

    it("initializes INDETERMINATE only if tristate", () => {
      const tristate = new StateReducer(createInput({ checked: false, indeterminate: true }), true);
      expect(tristate.get().value).toBe(ToggleStateValue.INDETERMINATE);

      const nonTristate = new StateReducer(createInput({ checked: false, indeterminate: true }), false);
      expect(nonTristate.get().value).toBe(ToggleStateValue.OFF);
    });

    it("marks disabled and readonly state", () => {
      const disabled = new StateReducer(
        createInput({ checked: false, disabled: true }),
        false
      );
      expect(disabled.get().status).toBe(ToggleStateStatus.DISABLED);

      const readonly = new StateReducer(
        createInput({ checked: false, readOnly: true }),
        false
      );
      expect(readonly.get().status).toBe(ToggleStateStatus.READONLY);
    });

    it("set priority to disabled state", () => {
      const disabled = new StateReducer(
        createInput({ checked: false, disabled: true, readOnly: true }),
        false
      );
      expect(disabled.get().status).toBe(ToggleStateStatus.DISABLED);
    });
  });

  describe("get()", () => {
    it("returns an immutable copy", () => {
      const reducer = new StateReducer(createInput({ checked: false }), false);
      const state = reducer.get();

      expect(Object.isFrozen(state)).toBe(true);
    });
  });

    describe("canInteract()", () => {
    it("returns true if input is enabled", () => {
      const reducer = new StateReducer(createInput({ checked: false, disabled: false, readOnly: false }), false);
      expect(reducer.canInteract()).toBe(true);
    });

    it("returns false if input is disabled", () => {
      const reducer = new StateReducer(createInput({ checked: false, disabled: true, readOnly: false }), false);
      expect(reducer.canInteract()).toBe(false);
    });

    it("returns false if input is readonly", () => {
      const reducer = new StateReducer(createInput({ checked: false, disabled: false, readOnly: true }), false);
      expect(reducer.canInteract()).toBe(false);
    });
  });

  describe("sync(element: HTMLInputElement)", () => {
    it("updates checked state when element is checked", () => {
      const input = createInput({ checked: false });
      const reducer = new StateReducer(input, false);
      input.checked = true;
      reducer.sync(input);
      expect(reducer.get().checked).toBe(true);
      expect(reducer.get().value).toBe(ToggleStateValue.ON);
    })

    it("updates checked state when element is unchecked", () => {
      const input = createInput({ checked: true });
      const reducer = new StateReducer(input, false);
      input.checked = false;
      reducer.sync(input);
      expect(reducer.get().checked).toBe(false);
      expect(reducer.get().value).toBe(ToggleStateValue.OFF);
    })

    it("updates status state when element is disabled", () => {
      const input = createInput({ checked: false, disabled: false, readOnly: false });
      const reducer = new StateReducer(input, false);
      input.disabled = true;
      reducer.sync(input);
      expect(reducer.get().status).toBe(ToggleStateStatus.DISABLED);
    })

    it("updates status state when element is readonly", () => {
      const input = createInput({ checked: false, disabled: false, readOnly: false });
      const reducer = new StateReducer(input, false);
      input.readOnly = true;
      reducer.sync(input);
      expect(reducer.get().status).toBe(ToggleStateStatus.READONLY);
    })

    it("updates indeterminate when element is indeterminate", () => {
      const input = createInput({ checked: false, disabled: false, readOnly: false });
      const reducer = new StateReducer(input, true);
      input.indeterminate = true;
      reducer.sync(input);
      expect(reducer.get().value).toBe(ToggleStateValue.INDETERMINATE);
      expect(reducer.get().indeterminate).toBe(true);
    })
  });

  describe("do()", () => {
    describe("basic actions", () => {
      it("sets ON", () => {
        const reducer = new StateReducer(
          createInput({ checked: false }),
          false
        );

        expect(reducer.do(ToggleActionType.ON)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.ON);
      });

      it("sets OFF", () => {
        const reducer = new StateReducer(createInput({ checked: true }), false);

        expect(reducer.do(ToggleActionType.OFF)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);
      });

      it("sets TOGGLE", () => {
        const reducer = new StateReducer(createInput({ checked: true }), false);

        expect(reducer.do(ToggleActionType.TOGGLE)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);

        expect(reducer.do(ToggleActionType.TOGGLE)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.ON);
      });

      it("sets INDETERMINATE", () => {
        const reducer = new StateReducer(createInput({ checked: false }), true);

        expect(reducer.do(ToggleActionType.INDETERMINATE)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.INDETERMINATE);
        expect(reducer.get().checked).toBe(false);
      });

      it("determinate from indeterminate", () => {
        const reducer = new StateReducer(
          createInput({ checked: true, indeterminate: true }),
          true
        );

        expect(reducer.do(ToggleActionType.DETERMINATE)).toBe(true);
        expect(reducer.get().value).toBe(ToggleStateValue.ON);
        expect(reducer.get().indeterminate).toBe(false);
        expect(reducer.get().checked).toBe(true);
      });

      it("sets DISABLE", () => {
        const reducer = new StateReducer(
          createInput({ checked: false }),
          false
        );

        expect(reducer.do(ToggleActionType.DISABLE)).toBe(true);
        expect(reducer.get().status).toBe(ToggleStateStatus.DISABLED);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);
      });

      it("sets READONLY", () => {
        const reducer = new StateReducer(
          createInput({ checked: false }),
          false
        );

        expect(reducer.do(ToggleActionType.READONLY)).toBe(true);
        expect(reducer.get().status).toBe(ToggleStateStatus.READONLY);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);
      });

      it("sets ENABLE", () => {
        const reducer = new StateReducer(
          createInput({ checked: false, disabled: true }),
          false
        );

        expect(reducer.do(ToggleActionType.ENABLE)).toBe(true);
        expect(reducer.get().status).toBe(ToggleStateStatus.ENABLED);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);
      });
    });

    describe("no-ops actions", () => {
      it("returns false if disabled", () => {
        const reducer = new StateReducer(
          createInput({ checked: false, disabled: true }),
          false
        );

        expect(reducer.do(ToggleActionType.ON)).toBe(false);
        expect(reducer.do(ToggleActionType.OFF)).toBe(false);
        expect(reducer.do(ToggleActionType.TOGGLE)).toBe(false);
        expect(reducer.do(ToggleActionType.DETERMINATE)).toBe(false);
        expect(reducer.do(ToggleActionType.INDETERMINATE)).toBe(false);
        expect(reducer.do(ToggleActionType.NEXT)).toBe(false);
        expect(reducer.do(ToggleActionType.READONLY)).toBe(false);
      });

      it("returns false if already in target state", () => {
        const reducerOn = new StateReducer(createInput({ checked: true }), false);
        expect(reducerOn.do(ToggleActionType.ON)).toBe(false);

        const reducerOff = new StateReducer(createInput({ checked: false }), false);
        expect(reducerOff.do(ToggleActionType.OFF)).toBe(false);

        const reducerIndeterminate = new StateReducer(createInput({ checked: false, indeterminate: true }), true);
        expect(reducerIndeterminate.do(ToggleActionType.INDETERMINATE)).toBe(false);

        const reducerDeterminate = new StateReducer(createInput({ checked: false, indeterminate: false }), true);
        expect(reducerDeterminate.do(ToggleActionType.DETERMINATE)).toBe(false);

        const reducerEnabled = new StateReducer(createInput({ checked: false, disabled: false, readOnly: false }), false);
        expect(reducerEnabled.do(ToggleActionType.ENABLE)).toBe(false);

        const reducerDisabled = new StateReducer(createInput({ checked: false, disabled: true, readOnly: false }), false);
        expect(reducerDisabled.do(ToggleActionType.DISABLE)).toBe(false);

        const reducerReadOnlu = new StateReducer(createInput({ checked: false, disabled: false, readOnly: true }), false);
        expect(reducerReadOnlu.do(ToggleActionType.READONLY)).toBe(false);
      });

      it("returns false on toggle if indeterminate", () => {
        const reducer = new StateReducer(
          createInput({ checked: false, indeterminate: true }),
          true
        );

        expect(reducer.do(ToggleActionType.TOGGLE)).toBe(false);
      });
    });

    describe("NEXT non-tristate", () => {
      it("ON -> OFF -> ON", () => {
        const reducer = new StateReducer(createInput({ checked: true }), false);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.ON);
      });
    });

    describe("NEXT tristate", () => {
      it("ON -> INDETERMINATE -> OFF -> INDETERMINATE -> ON", () => {
        const reducer = new StateReducer(createInput({ checked: true }), true);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.INDETERMINATE);
        expect(reducer.get().checked).toBe(true);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.OFF);
        expect(reducer.get().checked).toBe(false);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.INDETERMINATE);
        expect(reducer.get().checked).toBe(false);

        reducer.do(ToggleActionType.NEXT);
        expect(reducer.get().value).toBe(ToggleStateValue.ON);
        expect(reducer.get().checked).toBe(true);
      });
    });
  });
});
