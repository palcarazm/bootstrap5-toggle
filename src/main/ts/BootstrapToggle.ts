import { DOMBuilder } from "./core/DOMBuilder";
import { OptionResolver } from "./core/OptionResolver";
import { ToggleOptions, UserOptions } from "./core/OptionResolver.types";
import { StateReducer } from "./core/StateReducer";
import { ToggleActionType, ToggleState, ToggleStateValue } from "./core/StateReducer.types";
import ToggleEvents, { ToggleEventDetail } from "./types/ToggleEvents";

export class Toggle {
    private readonly element: HTMLInputElement & { bsToggle?: Toggle };
    private readonly userOptions: UserOptions;
    private readonly options: ToggleOptions;
    private readonly stateReducer: StateReducer;
    private readonly domBuilder: DOMBuilder;

    private pointer: { x: number; y: number } | null = null;
    private readonly SCROLL_THRESHOLD = 10;
    private eventsBound = false;
    private suppressExternalSync  = false;
    private readonly originalDescriptors = new Map<string, PropertyDescriptor>();

    /**
   * Initializes a new instance of the BootstrapToggle class.
   * @param element The HTMLInputElement element which represents the toggle.
   * @param options The options for the toggle.
   * @returns The constructed BootstrapToggle instance.
   */
    constructor(element: HTMLInputElement, options: UserOptions) {
        this.element = element;
        this.userOptions = options;
        this.options = OptionResolver.resolve(element, options);
        this.stateReducer = new StateReducer(element, this.options.tristate);
        this.domBuilder = new DOMBuilder(
            element,
            this.options,
            this.stateReducer.get()
        );

        this.bindEventListeners();
        this.interceptInputProperties();

        this.element.bsToggle = this;
    }
    
    /**
     * Intercepts the following input properties to detect external changes:
     * - checked
     * - disabled
     * - readonly
     * - indeterminate
     * This method is used to detect changes made to the input element directly,
     * rather than through the BootstrapToggle API. It is used to maintain the
     * state of the toggle in cases where the user changes the input element
     * directly, rather than through the API.
     * @returns void
     */
    private interceptInputProperties() {
        const props = ["checked", "disabled", "readOnly", "indeterminate"] as const;

        props.forEach((prop) => {
            const descriptor = Object.getOwnPropertyDescriptor(
                Object.getPrototypeOf(this.element),
                prop
            );

            if (!descriptor?.set) return;
            
            this.originalDescriptors.set(prop, descriptor);

            Object.defineProperty(this.element, prop, {
                configurable: true,
                get: () => descriptor.get!.call(this.element),
                set: (value) => {
                    descriptor.set!.call(this.element, value);
                    if (this.suppressExternalSync ) return;
                    this.onExternalChange();
                },
            });
        });
    }

    /**
     * Restores the original input properties of the toggle element.
     * This method is used to restore the original descriptors of the input properties
     * which were intercepted by the BootstrapToggle to detect external changes.
     * @returns void
     */
    private restoreInputProperties() {
        this.originalDescriptors.forEach((descriptor, prop) => {
            Object.defineProperty(this.element, prop, descriptor);
        });

        this.originalDescriptors.clear();
    }

    /**
     * Handles the change event of the input element of the toggle.
     * This event listener is responsible for detecting when the input element
     * of the toggle changes its state and triggering the update method to keep the toggle in sync.
     */
    private readonly onExternalChange = () => {
        this.update();
    };

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
        this.bindFormResetListener();
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
        this.unbindFormResetListener();
        this.unbindPointerEventListener();
        this.unbindKeyboardEventListener();
        this.unbindLabelEventListener();
        this.eventsBound = false;
    }

    private bindFormResetListener() {
        const form = this.element.form;
        if (!form) return;
        form.addEventListener("reset", this.onFormReset);
    }

    private unbindFormResetListener() {
        const form = this.element.form;
        if (!form) return;
        form.removeEventListener("reset", this.onFormReset);
    }

    private readonly onFormReset = () => {
        setTimeout(() => this.onExternalChange(), 0);
    };

    /**
   * Binds a pointerdown event listener to the root element of the toggle.
   * The event listener is responsible for handling pointer events (e.g. mouse clicks, touch events)
   * and triggering the toggle's state change when a pointer event occurs.
   * The event listener is bound with the passive option, which means that it will not block
   * other event listeners from being triggered.
   */
    private bindPointerEventListener() {
        this.domBuilder.root.addEventListener("pointerdown", this.onPointerDown, {
            passive: true,
        });
    }

    /**
   * Unbinds the pointerdown event listener from the root element of the toggle.
   * This method is responsible for unbinding the pointerdown event listener that was
   * previously bound by the bindPointerEventListener method.
   * If the event listener is not bound (i.e. this.eventsBound is false), this method does nothing.
   * @returns void
   */
    private unbindPointerEventListener() {
        this.domBuilder.root.removeEventListener("pointerdown", this.onPointerDown);
    }

    /**
   * Handles pointer down events by initiating the toggle action and setting up
   * listeners for pointer movement, release, and cancellation.
   *
   * The method early exits if:
   * - the pointer event is not a primary mouse button click
   * - the toggle cannot be interacted with (`disabled` or `readonly`)
   * @param e The PointerEvent object representing the pointer down event.
   */
    private readonly onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (!this.stateReducer.canInteract()) return;

        this.pointer = { x: e.clientX, y: e.clientY };
        this.domBuilder.root.addEventListener("pointermove", this.onPointerMove, {
            passive: true,
        });
        this.domBuilder.root.addEventListener("pointerup", this.onPointerUp, {
            passive: true,
        });
        this.domBuilder.root.addEventListener(
            "pointercancel",
            this.onPointerCancel,
            { passive: true }
        );
    };

    /**
   * Handles pointer move events by checking the distance moved from the initial pointer down position.
   * If the pointer has moved beyond a certain threshold, the pointer interaction is cancelled.
   *
   * Allows dragging within the width of the toggle but cancels if vertical movement exceeds the scroll threshold.
   * @param e The PointerEvent object representing the pointer move event.
   */
    private readonly onPointerMove = (e: PointerEvent) => {
        const dx = Math.abs(e.clientX - this.pointer!.x);
        const dy = Math.abs(e.clientY - this.pointer!.y);

        if (dy > this.SCROLL_THRESHOLD || dx > this.domBuilder.root.offsetWidth) {
            this.onPointerCancel();
        }
    };

    /**
   * Handles pointer up events by determining if the pointer interaction
   * should trigger a toggle action based on the distance moved.
   *
   * If the pointer has moved beyond a certain threshold, the pointer interaction is cancelled.
   * Allows dragging within the width of the toggle but cancels if vertical movement exceeds the scroll threshold.
   * Finally, it cleans up by calling the pointer cancel handler.
   * 
   * If the pointer event is not a primary mouse button click, the interaction is cancelled.
   * @param e The PointerEvent object representing the pointer up event.
   */
    private readonly onPointerUp = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) {
            this.onPointerCancel();
            return;
        }
        const dx = Math.abs(e.clientX - this.pointer!.x);
        const dy = Math.abs(e.clientY - this.pointer!.y);

        if (dy <= this.SCROLL_THRESHOLD && dx <= this.domBuilder.root.offsetWidth) {
            this.apply(ToggleActionType.NEXT);
        }

        this.onPointerCancel();
    };

    /**
   * Cleans up pointer event listeners after a pointer interaction is completed or cancelled.
   *
   * This method removes the `pointermove`, `pointerup`, and `pointercancel` event listeners
   * from the root element of the toggle.
   * However, `pointerdown` listener remains active for future interactions.
   */
    private readonly onPointerCancel = () => {
        this.domBuilder.root.removeEventListener("pointermove", this.onPointerMove);
        this.domBuilder.root.removeEventListener("pointerup", this.onPointerUp);
        this.domBuilder.root.removeEventListener(
            "pointercancel",
            this.onPointerCancel
        );
    };

    /**
   * Binds a keydown event listener to the root element of the toggle.
   * The event listener is responsible for handling keydown events
   * and triggering the toggle's state change when a keydown event occurs.
   */
    private bindKeyboardEventListener() {
        this.domBuilder.root.addEventListener(
            "keydown",
            this.handlerKeyboardEvent,
            { passive: false }
        );
    }

    /**
   * Unbinds the keydown event listener from the root element of the toggle.
   * This method is responsible for unbinding the keydown event listener that was
   * previously bound by the bindKeyboardEventListener method.
   * If the event listener is not bound (i.e. this.eventsBound is false), this method does nothing.
   * @returns void
   */
    private unbindKeyboardEventListener() {
        this.domBuilder.root.removeEventListener(
            "keydown",
            this.handlerKeyboardEvent
        );
    }
    private readonly handlerKeyboardEvent = (e: KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
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

    private readonly handlerLabelEvent = (e: Event) => {
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
        if (!this.stateReducer.do(action)) return;
        this.suppressExternalSync  = true;
        try {
            const state = this.stateReducer.get();
            this.domBuilder.render(state);
            if (!silent) this.trigger(action, state);
        } finally {
            this.suppressExternalSync  = false;
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
   * @param {boolean} silent A boolean indicating whether to trigger the change event after applying the action.
   * @returns void
   */
    enable(silent = false) {
        this.apply(ToggleActionType.ENABLE, silent);
    }

    /**
   * Disables the toggle.
   * If the toggle is currently enabled, this method will set the toggle state to disabled.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param {boolean} silent A boolean indicating whether to trigger the change event after applying the action.
   */
    disable(silent = false) {
        this.apply(ToggleActionType.DISABLE, silent);
    }

    /**
   * Sets the toggle state to readonly.
   * If the toggle is currently disabled or enabled, this method will set the toggle state to readonly.
   * If the silent parameter is false, this method will also trigger the change event.
   * @param {boolean} silent A boolean indicating whether to trigger the change event after applying the action.
   * @returns void
   */
    readonly(silent = false) {
        this.apply(ToggleActionType.READONLY, silent);
    }

    /**
     * Synchronizes the toggle state with the input element and renders the toggle.
     */
    update() {
        this.suppressExternalSync  = true;
        try {
            this.stateReducer.sync(this.element);
            this.domBuilder.render(this.stateReducer.get());
        } finally {
            this.suppressExternalSync  = false;
        }
    }

    /**
     * Triggers the change event on the toggle's input element and the appropriate toggle event.
     * This method is called after a toggle action is applied to notify listeners of the state change.
     * @param {ToggleActionType} action The toggle action that was applied.
     * @param {ToggleState} state The state of the toggle once the action was applied.
     */
    private trigger(action: ToggleActionType, state: ToggleState) {
        this.element.dispatchEvent(new Event("change", { bubbles: true }));
        
        const eventName = this.getEventForAction(action, state);
        const detail: ToggleEventDetail = { state: state };
        
        this.element.dispatchEvent(
            new CustomEvent(eventName, { 
                bubbles: true, 
                detail: detail 
            })
        );
    }
    
    /**
     * Returns the corresponding toggle event for the given toggle action and state.
     * This method is used to determine which toggle event to trigger after a toggle action is applied.
     * @param {ToggleActionType} action The toggle action that was applied.
     * @param {ToggleState} state The previous state of the toggle before the action was applied.
     * @returns {ToggleEvents} The corresponding toggle event for the given toggle action and state.
     */
    private getEventForAction(action: ToggleActionType, state: ToggleState): ToggleEvents {
        switch (action) {
        case ToggleActionType.ON:
            return ToggleEvents.ON;
        case ToggleActionType.OFF:
            return ToggleEvents.OFF;
        case ToggleActionType.INDETERMINATE:
            return ToggleEvents.MIXED;
        case ToggleActionType.ENABLE:
            return ToggleEvents.ENABLED;
        case ToggleActionType.DISABLE:
            return ToggleEvents.DISABLED;
        case ToggleActionType.READONLY:
            return ToggleEvents.READONLY;
        case ToggleActionType.DETERMINATE:
        case ToggleActionType.TOGGLE:
        case ToggleActionType.NEXT:
            return this.getValueEvent(state);
        }
    }


    /**
     * Returns the corresponding toggle event for the given toggle state.
     * This method is used to determine which toggle event to trigger after a toggle action is applied.
     * @param {ToggleState} state The previous state of the toggle before the action was applied.
     * @returns {ToggleEvents} The corresponding toggle event for the given toggle state.
     */
    private getValueEvent(state: ToggleState): ToggleEvents {
        switch (state.value) {
        case ToggleStateValue.ON:
            return ToggleEvents.ON;
        case ToggleStateValue.OFF:
            return ToggleEvents.OFF;
        case ToggleStateValue.MIXED:
            return ToggleEvents.MIXED;
        }
    }
    
    /**
   * Destroys the toggle element and unbinds all event listeners.
   *This method is useful when you need to remove the toggle element from the DOM.
   *After calling this method, the toggle element will be removed from the DOM and all event listeners will be unbound.
   */
    destroy() {
        this.restoreInputProperties();
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
        const _ = new Toggle(this.element, this.userOptions);
    }
}
