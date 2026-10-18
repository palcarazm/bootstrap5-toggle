import { ExtendableEventMap } from "component-lifecycle";
import { ToggleState } from "../core/StateReducer.types";

enum ToggleEvents{
    ON = "on",
    OFF = "off",
    MIXED = "mixed",
    ENABLED = "enabled",
    DISABLED = "disabled",
    READONLY = "readonly"
}

export interface ToggleEventDetail {
    state: ToggleState;
}

/**
 * Domain events emitted by the Toggle component.
 * Keys are the un-prefixed event names; the prefix "toggle:" is added by the base class.
 */
export type ToggleDomainEvents = {
    "on": ToggleEventDetail;
    "off": ToggleEventDetail;
    "mixed": ToggleEventDetail;
    "enabled": ToggleEventDetail;
    "disabled": ToggleEventDetail;
    "readonly": ToggleEventDetail;
};

/**
 * Full event map of the Toggle component.
 * Includes all lifecycle events (initialized, attached, disposed, destroyed, transition-*)
 * plus the domain events on/off/mixed/enabled/disabled/readonly.
 */
export type ToggleEventMap = ExtendableEventMap<"toggle", ToggleDomainEvents>;

export default ToggleEvents;