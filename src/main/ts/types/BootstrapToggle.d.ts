import { BootstrapToggleElement, BootstrapToggleElementEventMap } from "./BootstrapToggleElement";

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
  interface HTMLInputElement extends BootstrapToggleElement{}

  interface HTMLInputElementEventMap extends BootstrapToggleElementEventMap {}
}

export {};
