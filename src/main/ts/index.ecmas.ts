import { DOMBuilder } from "./core/DOMBuilder";
import{OptionResolver}from"./core/OptionResolver";
import { ToggleOptions, UserOptions } from "./core/OptionResolver.types";
import { StateReducer } from "./core/StateReducer";
import { ToggleActionType } from "./core/StateReducer.types";
import { ToggleMethods } from "./core/types";

(function () {
  class Toggle {
    private element: HTMLInputElement & { bsToggle?: Toggle };
    private options: ToggleOptions;
    private stateReducer: StateReducer;
    private domBuilder: DOMBuilder;

    constructor(element: HTMLInputElement, options: UserOptions) {
      this.element = element;
      this.options = OptionResolver.resolve(element, options);
      this.stateReducer = new StateReducer(element,this.options.tristate);
      this.domBuilder = new DOMBuilder(element, this.options, this.stateReducer.get());

      this.render();
    }
    render() {
    

      // 9: Add listeners
      this.domBuilder.root.addEventListener(
        "pointerdown",
        (e) => {
            if(this.stateReducer.do(ToggleActionType.NEXT)){
              this.domBuilder.render(this.stateReducer.get());
              this.trigger();
            }
        },
        { passive: true }
      );
      this.domBuilder.root.addEventListener(
        "keypress",
        (e) => {
          if (e.key == " ") {
            if(this.stateReducer.do(ToggleActionType.NEXT)){
              this.domBuilder.render(this.stateReducer.get());
              this.trigger();
            }
          }
        },
        { passive: true }
      );

      if (this.element.id) {
        document
          .querySelectorAll('label[for="' + this.element.id + '"]')
          .forEach((label) => {
            label.addEventListener(
              "pointerdown",
              (e) => {
                e.preventDefault();
                if(this.stateReducer.do(ToggleActionType.NEXT)){
                  this.domBuilder.render(this.stateReducer.get());
                  this.trigger();
                }
                this.domBuilder.root.focus();
              },
              { passive: true }
            );
          });
      }

      // 12: Keep reference to this instance for subsequent calls via `getElementById().bootstrapToggle()`
      this.element.bsToggle = this;
    }

    toggle(silent = false) {
      if(this.stateReducer.do(ToggleActionType.TOGGLE)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    on(silent = false) {
      if(this.stateReducer.do(ToggleActionType.ON)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    off(silent = false) {
      if(this.stateReducer.do(ToggleActionType.OFF)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    indeterminate(silent = false) {
      if(this.stateReducer.do(ToggleActionType.INDETERMINATE)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    determinate(silent = false) {
            if(this.stateReducer.do(ToggleActionType.DETERMINATE)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    enable() {
           if(this.stateReducer.do(ToggleActionType.ENABLE)){
        this.domBuilder.render(this.stateReducer.get());
      }
    }

    disable() {
            if(this.stateReducer.do(ToggleActionType.DISABLE)){
              this.domBuilder.render(this.stateReducer.get());
      }
    }

    readonly() {
            if(this.stateReducer.do(ToggleActionType.READONLY)){
        this.domBuilder.render(this.stateReducer.get());
      }
    }

    update(silent:boolean) {
      if (this.element.disabled) this.disable();
      else if (this.element.readOnly) this.readonly();
      else this.enable();
      if (this.element.checked) this.on(silent);
      else this.off(silent);
    }

    trigger(silent:boolean = false) {
      if (!silent)
        this.element.dispatchEvent(new Event("change", { bubbles: true }));
    }

    destroy() {
      // A: Remove button-group from UI, replace checkbox element
      this.domBuilder.root.parentNode?.insertBefore(this.element, this.domBuilder.root);
      this.domBuilder.root.parentNode?.removeChild(this.domBuilder.root);

      // B: Delete internal refs
      delete this.element.bsToggle;
    }

    rerender() {
      this.destroy();
      this.element.bootstrapToggle();
    }
  }

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
  if (typeof window !== "undefined")
    window.onload = function () {
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
