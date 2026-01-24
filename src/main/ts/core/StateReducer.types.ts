export interface ToggleState {
    value: ToggleStateValue;
    checked: boolean;
    status: ToggleStateStatus;
    indeterminate: boolean;
}

export enum ToggleStateValue {
    ON = "on",
    OFF = "off",
    MIXED = "mixed"
}

export enum ToggleStateStatus {
    ENABLED = "enabled",
    DISABLED = "disabled",
    READONLY = "readonly"
}

export enum ToggleActionType {
    NEXT = "next",
    ON = "on",
    OFF = "off",
    TOGGLE = "toggle",
    DETERMINATE = "determinate",
    INDETERMINATE = "indeterminate",
    READONLY = "readonly",
    DISABLE="disable",
    ENABLE="enable"
}