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
        this.state = this.getElementState(element);
    }

    /**
   * Retrieves the current state of the toggle based on the HTMLInputElement.
   * The state is determined by the following:
   * - The checked property of the input element
   * - The disabled property of the input element
   * - The readonly property of the input element
   * - The indeterminate property of the input element if the toggle is tristate
   * @returns An object containing the state of the toggle.
   */
    private getElementState(element: HTMLInputElement): ToggleState{
        const checked = element.checked;
        const status = element.disabled ? ToggleStateStatus.DISABLED : element.readOnly ? ToggleStateStatus.READONLY : ToggleStateStatus.ENABLED;
        const indeterminate = this.isTristate && element.indeterminate;

        return {
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
   * Determines whether the toggle is enabled and can be interacted with.
   * @returns True if the toggle is enabled and can be interacted with, false otherwise.
   */
    public canInteract(): boolean {
        return this.state.status === ToggleStateStatus.ENABLED;
    }

    /**
   * Synchronizes the internal state of the toggle with the provided HTMLInputElement.
   * This method is useful when you need to update the internal state of the toggle
   * manually, such as when the toggle is updated programmatically.
   * @param element The HTMLInputElement to synchronize the toggle state with.
   */
    public sync(element: HTMLInputElement): void { 
        this.state = this.getElementState(element);
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
            if (!this.canInteract()) return false;
            if (this.state.value === ToggleStateValue.ON) return false;
            this.state = {
                ...this.state,
                value: ToggleStateValue.ON,
                checked: true,
                indeterminate: false,
            };
            return true;
        case ToggleActionType.OFF:
            if (!this.canInteract()) return false;
            if (this.state.value === ToggleStateValue.OFF) return false;
            this.state = {
                ...this.state,
                value: ToggleStateValue.OFF,
                checked: false,
                indeterminate: false,
            };
            return true;
        case ToggleActionType.TOGGLE:
            if (!this.canInteract()) return false;
            if (this.state.value === ToggleStateValue.ON) return this.do(ToggleActionType.OFF);
            if (this.state.value === ToggleStateValue.OFF) return this.do(ToggleActionType.ON);
            return false;
        case ToggleActionType.INDETERMINATE:
            if (!this.canInteract()) return false;
            if (this.state.value === ToggleStateValue.INDETERMINATE) return false;
            this.state = {
                ...this.state,
                value: ToggleStateValue.INDETERMINATE,
                indeterminate: true,
            };
            return true;
        case ToggleActionType.DETERMINATE:
            if (!this.canInteract()) return false;
            if (this.state.value != ToggleStateValue.INDETERMINATE) return false;
            this.state = {
                ...this.state,
                value: this.state.checked
                    ? ToggleStateValue.ON
                    : ToggleStateValue.OFF,
                indeterminate: false,
            };
            return true;
        case ToggleActionType.NEXT:
            if (!this.canInteract()) return false;
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
            };
            return true;
        case ToggleActionType.ENABLE:
            if(this.state.status === ToggleStateStatus.ENABLED) return false;
            this.state = {
                ...this.state,
                status: ToggleStateStatus.ENABLED
            };
            return true;
        case ToggleActionType.READONLY:
            if(!this.canInteract()) return false;
            this.state = {
                ...this.state,
                status: ToggleStateStatus.READONLY
            };
            return true;
        }
    }
}
