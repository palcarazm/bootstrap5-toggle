import Events from "./ToggleEvents";
import { ToggleMethods } from "./ToggleMethods";
import { ToggleStateValue, ToggleStateStatus } from "./core/StateReducer.types";
import { BootstrapToggleElementEventMap } from "./BootstrapToggleElement";
import type { Monitor } from "component-lifecycle";

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
  interface HTMLInputElement{
    bootstrapToggle(
          options?: ToggleMethods | Record<string, unknown>,
          silent?: boolean
        ): void;
  }

  interface HTMLInputElementEventMap extends BootstrapToggleElementEventMap {}

  interface Window {
    BootstrapToggle: {
      Events: typeof Events; 
      Methods: typeof ToggleMethods;
      StateValue: typeof ToggleStateValue, 
      StateStatus: typeof ToggleStateStatus,
      MONITOR: Monitor<"toggle">;
    };
  }
}

export {};
