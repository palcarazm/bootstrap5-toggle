import { Toggle } from "./BootstrapToggle";
import { ToggleMonitor } from "./monitoring/ToggleMonitor";
import Events from "./types/ToggleEvents";
import { ToggleStateValue as StateValue, ToggleStateStatus as StateStatus } from "./core/StateReducer.types";
import { ToggleMethods as Methods } from "./types/ToggleMethods";

+(function ($) {
    /**
     * Add `BootstrapToggle` prototype function to Window
     * Enables execution when used with ECMAScript
     */
    globalThis.window.BootstrapToggle = globalThis.window.BootstrapToggle || {};
    Object.assign(globalThis.window.BootstrapToggle, {
        Events,
        Methods,
        StateValue,
        StateStatus,
        MONITOR: new ToggleMonitor(),
    });

    function Plugin(options, silent) {
        return ( this ).each(function () {
            let _bsToggle = this.bsToggle;

            if (!_bsToggle) {
                _bsToggle = new Toggle(this, (options && typeof options !== "string") ? options : {});
                void _bsToggle.init().then(() => _bsToggle.attach());
                return;
            }

            if (options && typeof options === "string") {
                switch (options.toLowerCase()) {
                case Methods.TOGGLE:
                    _bsToggle.toggle(silent);
                    break;
                case Methods.ON:
                    _bsToggle.toggleOn(silent);
                    break;
                case Methods.OFF:
                    _bsToggle.toggleOff(silent);
                    break;
                case Methods.INDETERMINATE:
                    _bsToggle.indeterminate(silent);
                    break;
                case Methods.DETERMINATE:
                    _bsToggle.determinate(silent);
                    break;
                case Methods.ENABLE:
                    _bsToggle.enable(silent);
                    break;
                case Methods.DISABLE:
                    _bsToggle.disable(silent);
                    break;
                case Methods.READONLY:
                    _bsToggle.readonly(silent);
                    break;
                case Methods.DESTROY:
                    _bsToggle.destroy();
                    break;
                case Methods.RERENDER:
                    _bsToggle.rerender();
                    break;
                }
            }
        });
    }

    let old = $.fn.bootstrapToggle;

    $.fn.bootstrapToggle = Plugin;
    $.fn.bootstrapToggle.Constructor = Toggle;

    // TOGGLE NO CONFLICT
    // ==================

    $.fn.toggle.noConflict = function () {
        $.fn.bootstrapToggle = old;
        return this;
    };

    /**
   * Replace all `input[type=checkbox][data-toggle="toggle"]` inputs with "Bootstrap-Toggle"
   * Executes once page elements have rendered enabling script to be placed in `<head>`
   */
    $(function () {
        $("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle();
    });
})(jQuery);
