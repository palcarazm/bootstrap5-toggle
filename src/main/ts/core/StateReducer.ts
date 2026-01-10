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

        let status: ToggleStateStatus;
        if (element.disabled) {
            status = ToggleStateStatus.DISABLED;
        } else if (element.readOnly) {
            status = ToggleStateStatus.READONLY;
        } else {
            status = ToggleStateStatus.ENABLED;
        }

        const indeterminate = this.isTristate && element.indeterminate;

        let value: ToggleStateValue;
        if (indeterminate) {
            value = ToggleStateValue.INDETERMINATE;
        } else if (checked) {
            value = ToggleStateValue.ON;
        } else {
            value = ToggleStateValue.OFF;
        }

        return {
            value,
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
   * If the action is {@code ToggleActionType.NEXT} :
   *  - For a tristate toggle, the toggle will do ON -> INDETERMINATE -> OFF -> INDETERMINATE -> ON.
   *  - For a non-tristate toggle, the toggle will do ON -> OFF -> ON.
   */
    public do(action: ToggleActionType): boolean {
        const actionsRequiringInteract = [
            ToggleActionType.ON,
            ToggleActionType.OFF,
            ToggleActionType.TOGGLE,
            ToggleActionType.INDETERMINATE,
            ToggleActionType.DETERMINATE,
            ToggleActionType.NEXT,
            ToggleActionType.READONLY,
        ];
        if (actionsRequiringInteract.includes(action) && !this.canInteract()) return false;

        switch (action) {
        case ToggleActionType.ON:
            return this.setValueIfChanged(ToggleStateValue.ON, true, false);
        case ToggleActionType.OFF:
            return this.setValueIfChanged(ToggleStateValue.OFF, false, false);
        case ToggleActionType.TOGGLE:
            if (this.state.value === ToggleStateValue.ON) return this.do(ToggleActionType.OFF);
            if (this.state.value === ToggleStateValue.OFF) return this.do(ToggleActionType.ON);
            return false;
        case ToggleActionType.INDETERMINATE:
            return this.setValueIfChanged(ToggleStateValue.INDETERMINATE, undefined, true);
        case ToggleActionType.DETERMINATE:
            if (this.state.value != ToggleStateValue.INDETERMINATE) return false;
            return this.setValue(this.state.checked ? ToggleStateValue.ON : ToggleStateValue.OFF, this.state.checked, false);
        case ToggleActionType.NEXT:
            return this.doNext();
        case ToggleActionType.DISABLE:
            return this.setStatusIfChanged(ToggleStateStatus.DISABLED);
        case ToggleActionType.ENABLE:
            return this.setStatusIfChanged(ToggleStateStatus.ENABLED);
        case ToggleActionType.READONLY:
            return this.setStatus(ToggleStateStatus.READONLY);
        }
    }
    
    /**
     * Sets the state of the toggle to the provided value.
     * If checked or indeterminate is provided, sets the corresponding property of the state to the provided value.
     * Otherwise, leaves the property unchanged.
     * @param value The value of the toggle to set.
     * @param checked The checked state of the toggle to set. If not provided, the property is left unchanged.
     * @param indeterminate The indeterminate state of the toggle to set. If not provided, the property is left unchanged.
     * @returns A boolean indicating whether the state was updated.
     */
    private setValue(value: ToggleStateValue, checked?: boolean, indeterminate?: boolean): boolean {
        this.state = {
            ...this.state,
            value,
            checked: checked ?? this.state.checked,
            indeterminate: indeterminate ?? this.state.indeterminate,
        };
        return true;
    }

    /**
     * Sets the state of the toggle to the provided value if the value is different from the current state.
     * If checked or indeterminate is provided, sets the corresponding property of the state to the provided value.
     * Otherwise, leaves the property unchanged.
     * @returns A boolean indicating whether the state was updated.
     */
    private setValueIfChanged(value: ToggleStateValue, checked?: boolean, indeterminate?: boolean): boolean {
        if (this.state.value === value) return false;
        return this.setValue(value, checked, indeterminate);
    }

    /**
     * Sets the status of the toggle to the provided value.
     * @param status The new status of the toggle.
     * @returns A boolean indicating whether the state was updated.
     */
    private setStatus(status: ToggleStateStatus): boolean {
        this.state = { ...this.state, status };
        return true;
    }

    /**
     * Sets the status of the toggle to the provided value if the value is different from the current status.
     * @param status The new status of the toggle.
     * @returns A boolean indicating whether the state was updated.
     */
    private setStatusIfChanged(status: ToggleStateStatus): boolean {
        if (this.state.status === status) return false;
        return this.setStatus(status);
    }

    /**
     * Applies the next action based on the current state of the toggle.
     * If the toggle is tristate, cycles through the on, off, and indeterminate states.
     * If the toggle is not tristate, cycles through the on and off states.
     * @returns A boolean indicating whether the state was updated.
     */
    private doNext(): boolean {
        if (this.isTristate) {
            if (this.state.value === ToggleStateValue.ON || this.state.value === ToggleStateValue.OFF) {
                return this.do(ToggleActionType.INDETERMINATE);
            }
            if (this.state.value === ToggleStateValue.INDETERMINATE) {
                return this.state.checked
                    ? this.do(ToggleActionType.OFF)
                    : this.do(ToggleActionType.ON);
            }
        } else {
            return this.state.value === ToggleStateValue.ON
                ? this.do(ToggleActionType.OFF)
                : this.do(ToggleActionType.ON);
        }
        return false;
    }
}
