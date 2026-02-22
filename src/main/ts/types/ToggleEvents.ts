import { ToggleState } from "../core/StateReducer.types";

enum ToggleEvents{
    ON = "toggle:on",
    OFF = "toggle:off",
    MIXED = "toggle:mixed",
    ENABLED = "toggle:enabled",
    DISABLED = "toggle:disabled",
    READONLY = "toggle:readonly"
}

export interface ToggleEventDetail {
    state: ToggleState;
}

export default ToggleEvents;