import { Toggle } from "../BootstrapToggle";
import { ToggleEventDetail } from "./ToggleEvents";
import { ToggleMethods } from "./ToggleMethods";

export interface BootstrapToggleElement {
    bootstrapToggle(
      options?: ToggleMethods | Record<string, unknown>,
      silent?: boolean
    ): void;
    bsToggle?: Toggle;
  }

export interface BootstrapToggleElementEventMap{
    "toggle:on": CustomEvent<ToggleEventDetail>;
    "toggle:off": CustomEvent<ToggleEventDetail>;
    "toggle:mixed": CustomEvent<ToggleEventDetail>;
    "toggle:enabled": CustomEvent<ToggleEventDetail>;
    "toggle:disabled": CustomEvent<ToggleEventDetail>;
    "toggle:readonly": CustomEvent<ToggleEventDetail>;
  }