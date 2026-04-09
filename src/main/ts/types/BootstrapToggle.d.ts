import { ToggleMethods, BootstrapToggleElementEventMap } from "./BootstrapToggleElement";

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
  interface HTMLInputElement{
    bootstrapToggle(
          options?: ToggleMethods | Record<string, unknown>,
          silent?: boolean
        ): void;
  }

  interface HTMLInputElementEventMap extends BootstrapToggleElementEventMap {}
}

export {};
