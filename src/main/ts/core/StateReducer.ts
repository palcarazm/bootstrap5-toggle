import {
  ToggleActionType,
  ToggleState,
  ToggleStateStatus,
  ToggleStateValue,
} from "./StateReducer.types";

export class StateReducer {
  private state: ToggleState;
  private readonly isTristate: boolean;

  /**
   * Constructor for the StateReducer class.
   * @param element The HTMLInputElement which represents the toggle.
   * @param isTristate A boolean indicating whether the toggle is tristate.
   * Initializes the toggle state with the given element and tristate value.
   */
  constructor(element: HTMLInputElement, isTristate: boolean) {
    this.isTristate = isTristate;

    const checked = element.checked;
    const status = element.disabled ? ToggleStateStatus.DISABLED : element.readOnly ? ToggleStateStatus.READONLY : ToggleStateStatus.ENABLED;
    const indeterminate = isTristate && element.indeterminate;

    this.state = {
      value: indeterminate
        ? ToggleStateValue.INDETERMINATE
        : checked
        ? ToggleStateValue.ON
        : ToggleStateValue.OFF,
      checked,
      status,
      indeterminate,
    };
  }

  /**
   * Get the current toggle state.
   * @returns An immutable copy of the current toggle state.
   */
  public get(): ToggleState {
    return Object.freeze({ ...this.state });
  }


  /**
   * Apply a toggle action to the toggle state.
   * @param action The toggle action to apply.
   * @returns A boolean indicating whether the action was successful.
   * If the toggle is disabled, any action execpect {@code ToggleActionType.ENABLE} will return {@code false}.
   * If the toggle is currently in the target state of the action, the action will return {@code false}.
   * If the toggle is in the indeterminate state and the action is {@code ToggleActionType.DETERMINATE},
   * the toggle will be set to the checked state.
   * If the action is {@code ToggleActionType.TOGGLE} :
   *  - For a tristate toggle, the toggle will do ON -> INDETERMINATE -> OFF -> INDETERMINATE -> ON.
   *  - For a non-tristate toggle, the toggle will do ON -> OFF -> ON.
   */
  public do(action: ToggleActionType): boolean {
    switch (action) {
      case ToggleActionType.ON:
        if (this.state.status != ToggleStateStatus.ENABLED) return false;
        if (this.state.value === ToggleStateValue.ON) return false;
        this.state = {
          ...this.state,
          value: ToggleStateValue.ON,
          checked: true,
          indeterminate: false,
        };
        return true;
      case ToggleActionType.OFF:
         if (this.state.status != ToggleStateStatus.ENABLED) return false;
        if (this.state.value === ToggleStateValue.OFF) return false;
        this.state = {
          ...this.state,
          value: ToggleStateValue.OFF,
          checked: false,
          indeterminate: false,
        };
        return true;
      case ToggleActionType.INDETERMINATE:
         if (this.state.status != ToggleStateStatus.ENABLED) return false;
        if (this.state.value === ToggleStateValue.INDETERMINATE) return false;
        this.state = {
          ...this.state,
          value: ToggleStateValue.INDETERMINATE,
          indeterminate: true,
        };
        return true;
      case ToggleActionType.DETERMINATE:
         if (this.state.status != ToggleStateStatus.ENABLED) return false;
        if (this.state.value != ToggleStateValue.INDETERMINATE) return false;
        this.state = {
          ...this.state,
          value: this.state.checked
            ? ToggleStateValue.ON
            : ToggleStateValue.OFF,
          indeterminate: false,
        };
        return true;
      case ToggleActionType.TOGGLE:
         if (this.state.status != ToggleStateStatus.ENABLED) return false;
        if (this.isTristate) {
          if (
            this.state.value === ToggleStateValue.ON ||
            this.state.value === ToggleStateValue.OFF
          )
            return this.do(ToggleActionType.INDETERMINATE);
          if (
            this.state.value === ToggleStateValue.INDETERMINATE &&
            this.state.checked
          )
            return this.do(ToggleActionType.OFF);
          if (
            this.state.value === ToggleStateValue.INDETERMINATE &&
            !this.state.checked
          )
            return this.do(ToggleActionType.ON);
        } else {
          if (this.state.value === ToggleStateValue.ON)
            return this.do(ToggleActionType.OFF);
          if (this.state.value === ToggleStateValue.OFF)
            return this.do(ToggleActionType.ON);
        }
        return false;
      case ToggleActionType.DISABLE:
         if (this.state.status === ToggleStateStatus.DISABLED) return false;
        this.state = {
          ...this.state,
          status: ToggleStateStatus.DISABLED,
        }
        return true;
      case ToggleActionType.ENABLE:
        if(this.state.status === ToggleStateStatus.ENABLED) return false;
        this.state = {
          ...this.state,
          status: ToggleStateStatus.ENABLED
        }
        return true;
      case ToggleActionType.READONLY:
        if(this.state.status != ToggleStateStatus.ENABLED) return false;
        this.state = {
          ...this.state,
          status: ToggleStateStatus.READONLY
        }
        return true;
    }
  }
}
