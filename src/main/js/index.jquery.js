import { Toggle } from "./BootstrapToggle";
import { ToggleMethods } from "./types/ToggleMethods";

+(function ($) {
    function Plugin(options, silent) {
        const optArg = Array.prototype.slice.call(arguments, 1)[0];

        return ( this ).each(function () {
            const $this = $(this);
            let _bsToggle = this.bsToggle || new Toggle(this, (options && typeof options !== "string") ?  options : {});

            if (options && typeof options === "string") {
                switch (options.toLowerCase()) {
                case ToggleMethods.TOGGLE:
                    _bsToggle.toggle(silent);
                    break;
                case ToggleMethods.ON:
                    _bsToggle.on(silent);
                    break;
                case ToggleMethods.OFF:
                    _bsToggle.off(silent);
                    break;
                case ToggleMethods.INDETERMINATE:
                    _bsToggle.indeterminate(silent);
                    break;
                case ToggleMethods.DETERMINATE:
                    _bsToggle.determinate(silent);
                    break;
                case ToggleMethods.ENABLE:
                    _bsToggle.enable(silent);
                    break;
                case ToggleMethods.DISABLE:
                    _bsToggle.disable(silent);
                    break;
                case ToggleMethods.READONLY:
                    _bsToggle.readonly(silent);
                    break;
                case ToggleMethods.DESTROY:
                    _bsToggle.destroy();
                    break;
                case ToggleMethods.RERENDER:
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
