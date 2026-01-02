import { Toggle } from "./BootstrapToggle";
import { ToggleMethods } from "./core/types";

+(function ($) {
  function Plugin(options, silent) {
    const optArg = Array.prototype.slice.call(arguments, 1)[0];

    return ( this ).each(function () {
      const $this = $(this);
      let _bsToggle = this.bsToggle || new Toggle(this, (options && typeof options !== "string") ?  options : {});

      if (options && typeof options === "string") {
        switch (options) {
          case ToggleMethods.TOGGLE:
          case ToggleMethods.toggle:
            _bsToggle.toggle(silent);
            break;
          case ToggleMethods.ON:
          case ToggleMethods.on:
            _bsToggle.on(silent);
            break;
          case ToggleMethods.OFF:
          case ToggleMethods.off:
            _bsToggle.off(silent);
            break;
          case ToggleMethods.INDETERMINATE:
          case ToggleMethods.indeterminate:
            _bsToggle.indeterminate(silent);
            break;
          case ToggleMethods.DETERMINATE:
          case ToggleMethods.determinate:
            _bsToggle.determinate(silent);
            break;
          case ToggleMethods.ENABLE:
          case ToggleMethods.enable:
            _bsToggle.enable();
            break;
          case ToggleMethods.DISABLE:
          case ToggleMethods.disable:
            _bsToggle.disable();
            break;
          case ToggleMethods.READONLY:
          case ToggleMethods.readonly:
            _bsToggle.readonly();
            break;
          case ToggleMethods.DESTROY:
          case ToggleMethods.destroy:
            _bsToggle.destroy();
            break;
          case ToggleMethods.RENDERER:
          case ToggleMethods.rerender:
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
