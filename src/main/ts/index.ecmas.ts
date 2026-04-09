import { Toggle as BootstrapToggle } from "./BootstrapToggle";
import { default as Events } from "./types/ToggleEvents";
import { UserOptions} from "./core/OptionResolver.types";
import { ToggleStateValue as StateValue, ToggleStateStatus as StateStatus } from "./core/StateReducer.types";
import { ToggleMethods as Methods } from "./types/ToggleMethods";
import { BootstrapToggleElement } from "./types/BootstrapToggleElement";

(function () {
    /**
     * Add `BootstrapToggle` prototype function to Window
     * Enables execution when used with ECMAScript
     */
    globalThis.window.BootstrapToggle = globalThis.window.BootstrapToggle || {};
    Object.assign(globalThis.window.BootstrapToggle, {Events, Methods, StateValue, StateStatus});

    /**
   * Add `bootstrapToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bootstrapToggle('on')`
   */
    HTMLInputElement.prototype.bootstrapToggle = function (options?: UserOptions | Methods, silent?: boolean) {
        let _bsToggle = (this as BootstrapToggleElement).bsToggle || new BootstrapToggle(this, (options && typeof options !== "string") ?  options : {});

        // Execute method calls
        if (options && typeof options === "string") {
            switch (options.toLowerCase()) {
            case Methods.TOGGLE:
                return _bsToggle.toggle(silent);
            case Methods.ON:
                return _bsToggle.on(silent);
            case Methods.OFF:
                return _bsToggle.off(silent);
            case Methods.INDETERMINATE:
                return _bsToggle.indeterminate(silent);
            case Methods.DETERMINATE:
                return _bsToggle.determinate(silent);
            case Methods.ENABLE:
                return _bsToggle.enable(silent);
            case Methods.DISABLE:
                return _bsToggle.disable(silent);
            case Methods.READONLY:
                return _bsToggle.readonly(silent);
            case Methods.DESTROY:
                return _bsToggle.destroy();
            case Methods.RERENDER:
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
        module.exports = BootstrapToggle;
        module.exports.Events = Events;
        module.exports.Methods = Methods;
        module.exports.StateValue = StateValue;
        module.exports.StateStatus = StateStatus;
    }
})();
