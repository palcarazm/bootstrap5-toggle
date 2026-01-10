import { Toggle } from "./BootstrapToggle";
import { UserOptions } from "./core/OptionResolver.types";
import { ToggleMethods } from "./types/ToggleMethods";

(function () {

    /**
   * Add `bootstrapToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bootstrapToggle('on')`
   */
    HTMLInputElement.prototype.bootstrapToggle = function (options?: UserOptions | ToggleMethods, silent?: boolean) {
        let _bsToggle = (this as HTMLInputElement & { bsToggle?: Toggle }).bsToggle || new Toggle(this, (options && typeof options !== "string") ?  options : {});

        // Execute method calls
        if (options && typeof options === "string") {
            switch (options) {
            case ToggleMethods.TOGGLE:
            case ToggleMethods.toggle:
                return _bsToggle.toggle(silent);
            case ToggleMethods.ON:
            case ToggleMethods.on:
                return _bsToggle.on(silent);
            case ToggleMethods.OFF:
            case ToggleMethods.off:
                return _bsToggle.off(silent);
            case ToggleMethods.INDETERMINATE:
            case ToggleMethods.indeterminate:
                return _bsToggle.indeterminate(silent);
            case ToggleMethods.DETERMINATE:
            case ToggleMethods.determinate:
                return _bsToggle.determinate(silent);
            case ToggleMethods.ENABLE:
            case ToggleMethods.enable:
                return _bsToggle.enable();
            case ToggleMethods.DISABLE:
            case ToggleMethods.disable:
                return _bsToggle.disable();
            case ToggleMethods.READONLY:
            case ToggleMethods.readonly:
                return _bsToggle.readonly();
            case ToggleMethods.DESTROY:
            case ToggleMethods.destroy:
                return _bsToggle.destroy();
            case ToggleMethods.RENDERER:
            case ToggleMethods.rerender:
                return _bsToggle.rerender();
            }
        }
    };

    /**
   * Replace all `input[type=checkbox][data-toggle="toggle"]` inputs with "Bootstrap-Toggle"
   * Executes once page elements have rendered enabling script to be placed in `<head>`
   */
    if (globalThis.window !== undefined)
        globalThis.window.onload = function () {
            document
                .querySelectorAll('input[type=checkbox][data-toggle="toggle"]')
                .forEach(function (ele) {
                    (ele as HTMLInputElement).bootstrapToggle();
                });
        };

    // Export library if possible
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Toggle;
    }
})();
