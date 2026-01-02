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
  private eventsBound = false;

  /**
   * Initializes a new instance of the BootstrapToggle class.
   * @param element The HTMLInputElement element which represents the toggle.
   * @param options The options for the toggle.
   * @returns The constructed BootstrapToggle instance.
   */
  constructor(element: HTMLInputElement, options: UserOptions) {
    this.element = element;
    this.options = OptionResolver.resolve(element, options);
    this.stateReducer = new StateReducer(element, this.options.tristate);
    this.domBuilder = new DOMBuilder(
      element,
      this.options,
      this.stateReducer.get()
    );

    this.bindEventListeners();

    this.element.bsToggle = this;
  }

  /**
   * Binds event listeners to the toggle element.
   * This method is called by the constructor and is responsible for
   * binding the following event listeners:
   * - Pointer events (click, touchstart, touchend)
   * - Keyboard events (keydown, keyup)
   * - Label events (click)
   * If the event listeners are already bound (i.e. this.eventsBound is true),
   * this method does nothing.
   * @returns void
   */
  private bindEventListeners() {
    if (this.eventsBound) return;
    this.bindPointerEventListener();
    this.bindKeyboardEventListener();
    this.bindLabelEventListener();
    this.eventsBound = true;
  }

  /**
   * Unbinds all event listeners from the toggle element.
   * This method is called by the destructor and is responsible for
   * unbinding the following event listeners:
   * - Pointer events (click, touchstart, touchend)
   * - Keyboard events (keydown, keyup)
   * - Label events (click)
   * If the event listeners are not bound (i.e. this.eventsBound is false),
   * this method does nothing.
   * @returns void
   */
  private unbindEventListeners() {
    if (!this.eventsBound) return;
    this.unbindPointerEventListener();
    this.unbindKeyboardEventListener();
    this.unbindLabelEventListener();
    this.eventsBound = false;
  }

  /**
   * Binds a pointerdown event listener to the root element of the toggle.
   * The event listener is responsible for handling pointer events (e.g. mouse clicks, touch events)
   * and triggering the toggle's state change when a pointer event occurs.
   * The event listener is bound with the passive option, which means that it will not block
   * other event listeners from being triggered.
   */
  private bindPointerEventListener() {
    this.domBuilder.root.addEventListener(
      "pointerdown",
      this.handlePointerEvent,
      { passive: true }
    );
  }

  /**
   * Unbinds the pointerdown event listener from the root element of the toggle.
   * This method is responsible for unbinding the pointerdown event listener that was
   * previously bound by the bindPointerEventListener method.
   * If the event listener is not bound (i.e. this.eventsBound is false), this method does nothing.
   * @returns void
   */
  private unbindPointerEventListener() {
    this.domBuilder.root.removeEventListener(
      "pointerdown",
      this.handlePointerEvent
    );
  }

  private handlePointerEvent = (e: PointerEvent) => {
    this.apply(ToggleActionType.NEXT);
  };

  /**
   * Binds a keypress event listener to the root element of the toggle.
   * The event listener is responsible for handling keypress events
   * and triggering the toggle's state change when a keypress event occurs.
   * The event listener is bound with the passive option, which means that it will not block
   * other event listeners from being triggered.
   */
  private bindKeyboardEventListener() {
    this.domBuilder.root.addEventListener(
      "keypress",
      this.handlerKeyboardEvent,
      { passive: true }
    );
  }

  /**
   * Unbinds the keypress event listener from the root element of the toggle.
   * This method is responsible for unbinding the keypress event listener that was
   * previously bound by the bindKeyboardEventListener method.
   * If the event listener is not bound (i.e. this.eventsBound is false), this method does nothing.
   * @returns void
   */
  private unbindKeyboardEventListener() {
    this.domBuilder.root.removeEventListener(
      "keypress",
      this.handlerKeyboardEvent
    );
  }
  private handlerKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key == " ") {
      this.apply(ToggleActionType.NEXT);
    }
  };

  /**
   * Binds a click event listener to all labels that are associated with the toggle's input element.
   * The event listener is responsible for handling click events and triggering the toggle's state change when a click event occurs.
   * The event listener is bound with the passive option set to false, which means that it will block other event listeners from being triggered until it has finished its execution.
   * This method is called by the constructor and is responsible for binding the event listener to the toggle's labels.
   * If the toggle's input element does not have an id (i.e. this.element.id is null or undefined), this method does nothing.
   * @returns void
   */
  private bindLabelEventListener() {
    if (this.element.id) {
      document
        .querySelectorAll('label[for="' + this.element.id + '"]')
        .forEach((label) => {
          label.addEventListener("click", this.handlerLabelEvent, {
            passive: false,
          });
        });
    }
  }

  /**
   * Unbinds the click event listener from all labels that are associated with the toggle's input element.
   * This method is responsible for unbinding the event listener that was previously bound by the bindLabelEventListener method.
   * If the toggle's input element does not have an id (i.e. this.element.id is null or undefined), this method does nothing.
   * @returns void
   */
  private unbindLabelEventListener() {
    if (this.element.id) {
      document
        .querySelectorAll('label[for="' + this.element.id + '"]')
        .forEach((label) => {
          label.removeEventListener("click", this.handlerLabelEvent);
        });
    }
  }

  private handlerLabelEvent = (e: Event) => {
    e.preventDefault();
    this.apply(ToggleActionType.NEXT);
    this.domBuilder.root.focus();
  };

  /**
   * Applies a toggle action to the toggle state and renders the toggle element.
   * If the action is successful, this method will render the toggle element with the new state.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param action The toggle action to apply.
   * @param silent A boolean indicating whether to trigger the change event after applying the action.
   */
  private apply(action: ToggleActionType, silent = false) {
    if (this.stateReducer.do(action)) {
      this.domBuilder.render(this.stateReducer.get());
      if (!silent) this.trigger();
    }
  }

  /**
   * Toggles the state of the toggle.
   * If the toggle is currently in the on state, it will be set to the off state.
   * If the toggle is currently in the off state, it will be set to the on state.
   * If the toggle is currently in the indeterminate state, it will be set to the on state.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param silent A boolean indicating whether to trigger the change event after applying the action.
   */
  toggle(silent = false) {
    this.apply(ToggleActionType.TOGGLE, silent);
  }

  /**
   * Sets the toggle state to on.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param silent A boolean indicating whether to trigger the change event after applying the action.
   */
  on(silent = false) {
    this.apply(ToggleActionType.ON, silent);
  }

  /**
   * Sets the toggle state to off.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param silent A boolean indicating whether to trigger the change event after applying the action.
   */
  off(silent = false) {
    this.apply(ToggleActionType.OFF, silent);
  }

  /**
   * Sets the toggle state to indeterminate.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param {boolean} silent A boolean indicating whether to trigger the change event after applying the action.
   */
  indeterminate(silent = false) {
    this.apply(ToggleActionType.INDETERMINATE, silent);
  }

  /**
   * Sets the toggle state to determinate.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param {boolean} silent A boolean indicating whether to trigger the change event after applying the action.
   */
  determinate(silent = false) {
    this.apply(ToggleActionType.DETERMINATE, silent);
  }

  /**
   * Enables the toggle.
   * If the toggle is currently disabled, this method will set the toggle state to enabled.
   * If the silent parameter is false, this method will also trigger the change event.
   * @returns void
   */
  enable() {
    this.apply(ToggleActionType.ENABLE);
  }

  /**
   * Disables the toggle.
   * If the toggle is currently enabled, this method will set the toggle state to disabled.
   * If the silent parameter is false, this method will also trigger the change event.
   */
  disable() {
    this.apply(ToggleActionType.DISABLE);
  }

  /**
   * Sets the toggle state to readonly.
   * If the toggle is currently disabled or enabled, this method will set the toggle state to readonly.
   * If the silent parameter is false, this method will also trigger the change event.
   * @returns void
   */
  readonly() {
    this.apply(ToggleActionType.READONLY);
  }

  /**
   * Synchronizes the toggle state with the input element and renders the toggle.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param {boolean} silent A boolean indicating whether to trigger the change event after synchronizing the toggle state.
   */
  update(silent: boolean) {
    this.stateReducer.sync(this.element);
    this.domBuilder.render(this.stateReducer.get());
    if (!silent) this.trigger();
  }

  /**
   * Triggers the change event on the toggle's input element.
   * @param {boolean} silent A boolean indicating whether to trigger the change event.
   * If the silent parameter is false, this method will trigger the change event.
   */
  private trigger(silent: boolean = false) {
    if (!silent)
      this.element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /**
   * Destroys the toggle element and unbinds all event listeners.
   *This method is useful when you need to remove the toggle element from the DOM.
   *After calling this method, the toggle element will be removed from the DOM and all event listeners will be unbound.
   */
  destroy() {
    this.unbindEventListeners();
    this.domBuilder.destroy();
    delete this.element.bsToggle;
  }

  /**
   * Destroys the toggle element and reinitializes it with the same options.
   *This method is useful when you need to reinitialize the toggle element with the same options.
   */
  rerender() {
    this.destroy();
    this.element.bootstrapToggle();
  }
}
