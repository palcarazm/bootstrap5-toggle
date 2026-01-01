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
        const reducer = new StateReducer(createInput({ checked: true }), false);

        expect(reducer.do(ToggleActionType.ON)).toBe(false);
      });

      it("returns false on invalid determinate", () => {
        const reducer = new StateReducer(
          createInput({ checked: false, indeterminate: false }),
          true
        );

        expect(reducer.do(ToggleActionType.DETERMINATE)).toBe(false);
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
