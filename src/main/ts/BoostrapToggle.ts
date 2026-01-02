import { DOMBuilder } from "./core/DOMBuilder";
import { OptionResolver } from "./core/OptionResolver";
import { ToggleOptions, UserOptions } from "./core/OptionResolver.types";
import { StateReducer } from "./core/StateReducer";
import { ToggleActionType } from "./core/StateReducer.types";

  export class Toggle {
    private element: HTMLInputElement & { bsToggle?: Toggle };
    private options: ToggleOptions;
    private stateReducer: StateReducer;
    private domBuilder: DOMBuilder;

    constructor(element: HTMLInputElement, options: UserOptions) {
      this.element = element;
      this.options = OptionResolver.resolve(element, options);
      this.stateReducer = new StateReducer(element,this.options.tristate);
      this.domBuilder = new DOMBuilder(element, this.options, this.stateReducer.get());
      
      this.blindEventListeners();

      this.element.bsToggle = this;
    }
    private blindEventListeners() {
      this.domBuilder.root.addEventListener(
        "pointerdown",
        (e) => {
            this.apply(ToggleActionType.NEXT);
        },
        { passive: true }
      );
      this.domBuilder.root.addEventListener(
        "keypress",
        (e) => {
          if (e.key == " ") {
            this.apply(ToggleActionType.NEXT);
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
                this.apply(ToggleActionType.NEXT);
                this.domBuilder.root.focus();
              },
              { passive: false }
            );
          });
      }
    }

    private apply(action: ToggleActionType, silent = false) {
      if(this.stateReducer.do(action)){
        this.domBuilder.render(this.stateReducer.get());
        if (!silent) this.trigger();
      }
    }

    toggle(silent = false) {
        this.apply(ToggleActionType.TOGGLE, silent);
    }

    on(silent = false) {
      this.apply(ToggleActionType.ON, silent);
    }

    off(silent = false) {
      this.apply(ToggleActionType.OFF, silent);
    }

    indeterminate(silent = false) {
      this.apply(ToggleActionType.INDETERMINATE, silent);
    }

    determinate(silent = false) {
       this.apply(ToggleActionType.DETERMINATE, silent);
    }

    enable() {
      this.apply(ToggleActionType.ENABLE);
    }

    disable() {
            this.apply(ToggleActionType.DISABLE);
    }

    readonly() {
        this.apply(ToggleActionType.READONLY);
    }

    update(silent:boolean) {
      if (this.element.disabled) this.disable();
      else if (this.element.readOnly) this.readonly();
      else this.enable();
      if (this.element.checked) this.on(silent);
      else this.off(silent);
    }

    private trigger(silent:boolean = false) {
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