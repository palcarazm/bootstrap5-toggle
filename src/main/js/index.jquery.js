import { resolveOptions } from "./core/options";

"use strict";
function sanitize(text) {
  if (!text) return text; // handle null or undefined
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'/]/g, function (m) {
    return map[m];
  });
}

+(function ($) {
  // TOGGLE PUBLIC CLASS DEFINITION
  // ==============================

  let Toggle = function (element, options) {
    // A: Capture ref to HMTL element
    this.$element = $(element);

    // B: Set options
    this.options = resolveOptions(element, options);

    // LAST: Render Toggle
    this.render();
  };

  Toggle.prototype.render = function () {
    // 0: Parse size
    let size;
    switch (this.options.size) {
      case "large":
      case "lg":
        size = "btn-lg";
        break;
      case "small":
      case "sm":
        size = "btn-sm";
        break;
      case "mini":
      case "xs":
        size = "btn-xs";
        break;
      default:
        size = "";
        break;
    }

    // 1: On
    let $toggleOn = $('<span class="btn">')
      .html(this.options.onlabel)
      .addClass("btn-" + this.options.onstyle + " " + size);
    if (this.options.ontitle) {
      $toggleOn.attr("title", this.options.ontitle);
    }

    // 2: Off
    let $toggleOff = $('<span class="btn">')
      .html(this.options.offlabel)
      .addClass("btn-" + this.options.offstyle + " " + size);
    if (this.options.offtitle) {
      $toggleOff.attr("title", this.options.offtitle);
    }

    // 3: Handle
    let $toggleHandle = $('<span class="toggle-handle btn">').addClass(size);

    // 4: Toggle Group
    let $toggleGroup = $('<div class="toggle-group">').append(
      $toggleOn,
      $toggleOff,
      $toggleHandle
    );

    // 5: Toggle
    let $toggle = $(
      '<div class="toggle btn" data-toggle="toggle" role="button">'
    )
      .addClass(
        this.$element.prop("checked")
          ? "btn-" + this.options.onstyle
          : "btn-" + this.options.offstyle + " off"
      )
      .addClass(size)
      .addClass(this.options.style)
      .attr("tabindex", this.options.tabindex);
    if (this.$element.prop("disabled") || this.$element.prop("readonly")) {
      $toggle.addClass("disabled");
      $toggle.attr("disabled", "disabled");
    }

    // 6: Set form values
    if (this.options.onvalue) this.$element.val(this.options.onvalue);
    let $invElement = null;
    if (this.options.offvalue) {
      $invElement = this.$element.clone();
      $invElement.val(this.options.offvalue);
      $invElement.attr("data-toggle", "invert-toggle");
      $invElement.removeAttr("id");
      $invElement.prop("checked", !this.$element.prop("checked"));
    }

    // 7: Replace HTML checkbox with Toggle-Button
    this.$element.wrap($toggle);
    $.extend(this, {
      $toggle: this.$element.parent(),
      $toggleOn: $toggleOn,
      $toggleOff: $toggleOff,
      $toggleGroup: $toggleGroup,
      $invElement: $invElement,
    });
    this.$toggle.append($invElement, $toggleGroup);

    // 8: Set button W/H, lineHeight
    {
      // A: Set style W/H
      if (this.options.width) {
        this.$toggle.css("width", this.options.width);
      } else {
        this.$toggle.css("min-width", "100px"); // First approach for better calculation
        this.$toggle.css(
          "min-width",
          `${
            Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth()) +
            $toggleHandle.outerWidth() / 2
          }px`
        );
      }

      if (this.options.height) {
        this.$toggle.css("height", this.options.height);
      } else {
        this.$toggle.css("min-height", "36px"); // First approach for better calculation
        this.$toggle.css(
          "min-height",
          `${Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())}px`
        );
      }

      // B: Apply on/off class
      $toggleOn.addClass("toggle-on");
      $toggleOff.addClass("toggle-off");

      // C: Finally, set lineHeight if needed
      if (this.options.height) {
        $toggleOn.css("line-height", $toggleOn.height() + "px");
        $toggleOff.css("line-height", $toggleOff.height() + "px");
      }
    }

    // 9: Add listeners
    this.$toggle.on("pointerdown", (e) => {
      toggleActionPerformed(e, this);
    });
    this.$toggle.on("keypress", (e) => {
      if (e.key == " ") {
        toggleActionPerformed(e, this);
      }
    });

    if (this.$element.prop("id")) {
      $('label[for="' + this.$element.prop("id") + '"]').on(
        "click touchstart",
        (e) => {
          e.preventDefault();
          this.toggle();
          this.$toggle.focus();
        }
      );
    }

    // 10: Set elements to bootstrap object (NOT NEEDED)
    // 11: Handle indeterminate state
      if(this.options.tristate && this.$element.prop("indeterminate")) {
        this.indeterminate(true);
      }
    // 12: Keep reference to this instance for subsequent calls via `getElementById().bootstrapToggle()` (NOT NEEDED)
  };

  /**
   * Trigger actions
   * @param {Event} e event
   * @param {Toggle} target Toggle
   */
  function toggleActionPerformed(e, target) {
    if (target.options.tristate) {
      if (target.$toggle.hasClass("indeterminate")) {
        target.determinate(true);
        target.toggle();
      } else {
        target.indeterminate();
      }
    } else {
      target.toggle();
    }
  }

  Toggle.prototype.toggle = function (silent = false) {
    if (this.$element.prop("checked")) this.off(silent);
    else this.on(silent);
  };

  Toggle.prototype.on = function (silent = false) {
    if (this.$element.prop("disabled") || this.$element.prop("readonly"))
      return false;
    this.$toggle
      .removeClass("btn-" + this.options.offstyle + " off")
      .addClass("btn-" + this.options.onstyle);
    this.$element.prop("checked", true);
    if (this.$invElement) this.$invElement.prop("checked", false);
    if (!silent) this.trigger();
  };

  Toggle.prototype.off = function (silent = false) {
    if (this.$element.prop("disabled") || this.$element.prop("readonly"))
      return false;
    this.$toggle
      .removeClass("btn-" + this.options.onstyle)
      .addClass("btn-" + this.options.offstyle + " off");
    this.$element.prop("checked", false);
    if (this.$invElement) this.$invElement.prop("checked", true);
    if (!silent) this.trigger();
  };

  Toggle.prototype.indeterminate = function (silent = false) {
    if (
      !this.options.tristate ||
      this.$element.prop("disabled") ||
      this.$element.prop("readonly")
    )
      return false;
    this.$toggle.addClass("indeterminate");
    this.$element.prop("indeterminate", true);
    this.$element.removeAttr("name");
    if (this.$invElement) this.$invElement.prop("indeterminate", true);
    if (this.$invElement) this.$invElement.removeAttr("name");
    if (!silent) this.trigger();
  };

  Toggle.prototype.determinate = function (silent = false) {
    if (
      !this.options.tristate ||
      this.$element.prop("disabled") ||
      this.$element.prop("readonly")
    )
      return false;
    this.$toggle.removeClass("indeterminate");
    this.$element.prop("indeterminate", false);
    if (this.options.name) this.$element.attr("name", this.options.name);
    if (this.$invElement) this.$invElement.prop("indeterminate", false);
    if (this.$invElement && this.options.name)
      this.$invElement.attr("name", this.options.name);
    if (!silent) this.trigger();
  };

  Toggle.prototype.enable = function () {
    this.$toggle.removeClass("disabled");
    this.$toggle.removeAttr("disabled");
    this.$element.prop("disabled", false);
    this.$element.prop("readonly", false);
    if (this.$invElement) {
      this.$invElement.prop("disabled", false);
      this.$invElement.prop("readonly", false);
    }
  };

  Toggle.prototype.disable = function () {
    this.$toggle.addClass("disabled");
    this.$toggle.attr("disabled", "disabled");
    this.$element.prop("disabled", true);
    this.$element.prop("readonly", false);
    if (this.$invElement) {
      this.$invElement.prop("disabled", true);
      this.$invElement.prop("readonly", false);
    }
  };

  Toggle.prototype.readonly = function () {
    this.$toggle.addClass("disabled");
    this.$toggle.attr("disabled", "disabled");
    this.$element.prop("disabled", false);
    this.$element.prop("readonly", true);
    if (this.$invElement) {
      this.$invElement.prop("disabled", false);
      this.$invElement.prop("readonly", true);
    }
  };

  Toggle.prototype.update = function (silent) {
    if (this.$element.prop("disabled")) this.disable();
    else if (this.$element.prop("readonly")) this.readonly();
    else this.enable();
    if (this.$element.prop("checked")) this.on(silent);
    else this.off(silent);
  };

  Toggle.prototype.trigger = function (silent) {
    this.$element.off("change.bs.toggle");
    if (!silent) this.$element.change();
    this.$element.on(
      "change.bs.toggle",
      $.proxy(function () {
        this.update();
      }, this)
    );
  };

  Toggle.prototype.destroy = function () {
    // A: Remove button-group from UI, replace checkbox element
    this.$element.off("change.bs.toggle");
    this.$toggleGroup.remove();
    if (this.$invElement) this.$invElement.remove();

    // B: Delete internal refs
    this.$element.removeData("bs.toggle");
    this.$element.unwrap();
  };

  Toggle.prototype.rerender = function () {
    this.destroy();
    this.$element.bootstrapToggle();
  };

  // TOGGLE PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    let optArg = Array.prototype.slice.call(arguments, 1)[0];

    return this.each(function () {
      let $this = $(this);
      let data = $this.data("bs.toggle");
      let options = typeof option == "object" && option;

      if (!data) {
        data = new Toggle(this, options);
        $this.data("bs.toggle", data);
      }
      if (
        typeof option === "string" &&
        data[option] &&
        typeof optArg === "boolean"
      )
        data[option](optArg);
      else if (typeof option === "string" && data[option]) data[option]();
      //else if (option && !data[option]) console.log('bootstrap-toggle: error: method `'+ option +'` does not exist!');
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
