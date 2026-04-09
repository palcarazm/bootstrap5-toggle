import { Toggle } from "./BootstrapToggle";
import { UserOptions } from "./core/OptionResolver.types";
import { BootstrapToggleElement } from "./types/BootstrapToggleElement";
import { ToggleMethods } from "./types/ToggleMethods";

(function () {

    /**
   * Add `bootstrapToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bootstrapToggle('on')`
   */
    HTMLInputElement.prototype.bootstrapToggle = function (options?: UserOptions | ToggleMethods, silent?: boolean) {
        let _bsToggle = (this as BootstrapToggleElement).bsToggle || new Toggle(this, (options && typeof options !== "string") ?  options : {});

        // Execute method calls
        if (options && typeof options === "string") {
            switch (options.toLowerCase()) {
            case ToggleMethods.TOGGLE:
                return _bsToggle.toggle(silent);
            case ToggleMethods.ON:
                return _bsToggle.on(silent);
            case ToggleMethods.OFF:
                return _bsToggle.off(silent);
            case ToggleMethods.INDETERMINATE:
                return _bsToggle.indeterminate(silent);
            case ToggleMethods.DETERMINATE:
                return _bsToggle.determinate(silent);
            case ToggleMethods.ENABLE:
                return _bsToggle.enable(silent);
            case ToggleMethods.DISABLE:
                return _bsToggle.disable(silent);
            case ToggleMethods.READONLY:
                return _bsToggle.readonly(silent);
            case ToggleMethods.DESTROY:
                return _bsToggle.destroy();
            case ToggleMethods.RERENDER:
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
                .querySelectorAll<HTMLInputElement>('input[type=checkbox][data-toggle="toggle"]')
                .forEach(function (ele) {
                    ele.bootstrapToggle();
                });
        };

    // Export library if possible
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Toggle;
    }
})();
