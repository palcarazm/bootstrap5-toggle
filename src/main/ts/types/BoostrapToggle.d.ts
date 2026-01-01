import { ToggleMethods } from "../core/types";

declare global {
  interface HTMLInputElement {
    bootstrapToggle(
      options?: ToggleMethods | Record<string, unknown>,
      silent?: boolean
    ): void;
  }
}

export {};
