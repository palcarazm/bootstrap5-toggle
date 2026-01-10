import { ToggleOptions, ToggleSize } from "./OptionResolver.types";
import {
    ToggleState,
    ToggleStateStatus,
    ToggleStateValue,
} from "./StateReducer.types";

export class DOMBuilder {
    private readonly sizeClass: string;
    private readonly onStyle: string;
    private readonly offStyle: string;
    private readonly name: string | null;

    private readonly checkbox: HTMLInputElement;
    private readonly invCheckbox: HTMLInputElement | null;
    private readonly toggle: HTMLElement;
    private readonly toggleGroup: HTMLElement;
    private readonly toggleOn: HTMLElement;
    private readonly toggleOff: HTMLElement;
    private readonly toggleHandle: HTMLElement;

    private isBuilt: boolean = false;
    private lastState: ToggleState;
    private resizeObserver?: ResizeObserver;

    /**
   * Initializes a new instance of the DOMBuilder class.
   * This renders the toggle if the parent element is visible, otherwise defers rendering until it becomes visible.
   * @param checkbox HTMLInputElement element representing the toggle.
   * @param options ToggleOptions object containing options for the toggle.
   * @param state ToggleState object containing the initial state of the toggle.
   */
    constructor(
        checkbox: HTMLInputElement,
        options: ToggleOptions,
        state: ToggleState
    ) {
        this.lastState = state;
        this.onStyle = `btn-${options.onstyle}`;
        this.offStyle = `btn-${options.offstyle}`;
        this.name = options.name;

        this.checkbox = checkbox;
        if (options.onvalue) this.checkbox.value = options.onvalue;

        this.invCheckbox = options.offvalue
            ? this.createInvCheckbox(options.offvalue)
            : null;

        this.sizeClass = DOMBuilder.sizeResolver(options.size);

        this.toggleOn = this.createToggleSpan(
            options.onlabel,
            this.onStyle,
            options.ontitle
        );
        this.toggleOff = this.createToggleSpan(
            options.offlabel,
            this.offStyle,
            options.offtitle
        );
        this.toggleHandle = this.createToggleHandle();
        this.toggleGroup = this.createToggleGroup();
        this.toggle = document.createElement("div");

        if(this.isVisible()){
            this.renderToggle(options);
            this.render(state);
        }else{
            this.deferRender(options);
        }
    }

    /**
   * Checks if the parent element of the checkbox is visible.
   * A parent element is considered visible if its `offsetWidth` and `offsetHeight` are greater than `0`.
   * @returns boolean indicating whether the parent element is visible or not.
   */
    private isVisible(): boolean {
        const parent = this.checkbox.parentElement;
        return !!parent && parent.offsetWidth > 0 && parent.offsetHeight > 0;
    }

    /**
   * Defer rendering the toggle until the parent element is visible.
   * It does this by observing the parent element's bounding rectangle and only rendering the toggle once the width and height of the bounding rectangle are greater than 0.
   * @param options ToggleOptions object containing options for the toggle.
   */
    private deferRender(options: ToggleOptions): void {
        this.resizeObserver = new ResizeObserver(entries => {
            if (this.isBuilt) {
        this.resizeObserver!.disconnect();
        return;
            }
            for (const entry of entries) {
                if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                    this.renderToggle(options);
                    this.render(this.lastState);
                    this.isBuilt = true;
          this.resizeObserver!.disconnect();
          return;
                }
            }
        });
        this.resizeObserver.observe(this.checkbox.parentElement!);
    }

    /**
   * Resolves the size class for the toggle based on the provided size.
   * If size is not provided or is invalid, returns an empty string.
   * @param size ToggleSize value representing the size of the toggle.
   * @returns string representing the size class for the toggle.
   */
    private static sizeResolver(size: ToggleSize | ""): string {
        const sizeMap: Record<string, string> = {
            large: "btn-lg",
            lg: "btn-lg",
            small: "btn-sm",
            sm: "btn-sm",
            mini: "btn-xs",
            xs: "btn-xs",
        };
        return sizeMap[size] ?? "";
    }

    /**
   * Creates an inverted checkbox element that is used in the toggle.
   * This checkbox is used to create the toggle's "off" state.
   * @param offValue The value of the checkbox when the toggle is in the "off" state.
   * @returns An HTMLInputElement representing the inverted checkbox element.
   */
    private createInvCheckbox(offValue: string): HTMLInputElement {
        const invCheckbox = this.checkbox.cloneNode(true) as HTMLInputElement;
        invCheckbox.value = offValue;
        invCheckbox.dataset.toggle = "invert-toggle";
        invCheckbox.removeAttribute("id");
        return invCheckbox;
    }

    /**
   * Renders the toggle element and its children.
   * Sets the class attribute of the toggle with the provided style and size class.
   * Sets the tabindex attribute of the toggle with the provided tabindex.
   * Inserts the toggle element before the original checkbox element.
   * Appends the checkbox, inverted checkbox (if exists) and toggle group elements to the toggle element.
   * Handles the toggle size by setting the width and height attributes of the toggle element.
   * @param options - ToggleOptions object containing the style, width, height and tabindex for the toggle.
   */
    private renderToggle({
        style,
        width,
        height,
        tabindex,
    }: ToggleOptions): void {
        this.toggle.className= `toggle btn ${this.sizeClass} ${style}`;
        this.toggle.dataset.toggle =  "toggle";
        this.toggle.tabIndex = tabindex;
        this.toggle.role = "button";

        this.checkbox.parentElement?.insertBefore(this.toggle, this.checkbox);
        this.toggle.appendChild(this.checkbox);
        if (this.invCheckbox) this.toggle.appendChild(this.invCheckbox);
        this.toggle.appendChild(this.toggleGroup);

        this.handleToggleSize(width, height);

        this.isBuilt = true;
    }

    /**
   * Creates a div element representing the toggle group.
   * The toggle group contains the on, off, and handle elements of the toggle.
   * @returns An HTMLElement representing the toggle group element.
   */
    private createToggleGroup(): HTMLElement {
        const toggleGroup = document.createElement("div");
        toggleGroup.className = "toggle-group";
        toggleGroup.appendChild(this.toggleOn);
        toggleGroup.appendChild(this.toggleOff);
        toggleGroup.appendChild(this.toggleHandle);
        return toggleGroup;
    }

    /**
   * Creates a span element representing a toggle option (on/off).
   * The span element is given a class attribute with the provided style and size class.
   * The innerHTML of the span element is set to the provided label.
   * If a title is provided, the span element is given a title attribute with the provided title.
   * @param label The text to be displayed in the toggle option.
   * @param style The style of the toggle option (primary, secondary, etc.).
   * @param title The title of the toggle option.
   * @returns An HTMLElement representing the toggle option element.
   */
    private createToggleSpan(
        label: string,
        style: string,
        title: string | null
    ): HTMLElement {
        const toggleSpan = document.createElement("span");
        toggleSpan.className = `btn ${this.sizeClass} ${style}`;
        toggleSpan.innerHTML = label;
        if (title) toggleSpan.title = title;
        return toggleSpan;
    }

    /**
   * Creates a span element representing the toggle handle.
   * The span element is given a class attribute with the provided size class.
   * @returns An HTMLElement representing the toggle handle element.
   */
    private createToggleHandle(): HTMLElement {
        const toggleHandle = document.createElement("span");
        toggleHandle.className = `toggle-handle btn ${this.sizeClass}`;
        return toggleHandle;
    }

    /**
   * Sets the width and height of the toggle element.
   * If a width or height is not provided, the toggle element will be given a minimum width and height
   * that is calculated based on the size of the toggle on and off options.
   * @param width The width of the toggle element.
   * @param height The height of the toggle element.
   */
    private handleToggleSize(
        width: string  | null,
        height: string | null
    ): void {
        function calcH(toggleSpan: HTMLElement) {
            const styles = window.getComputedStyle(toggleSpan);
            const height = toggleSpan.offsetHeight;
            const borderTopWidth = parseFloat(styles.borderTopWidth);
            const borderBottomWidth = parseFloat(styles.borderBottomWidth);
            const paddingTop = parseFloat(styles.paddingTop);
            const paddingBottom = parseFloat(styles.paddingBottom);

            return (
                height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
            );
        }
        if (width) {
            this.toggle.style.width = width;
        } else {
            this.toggle.style.minWidth = "100px"; // First approach for better calculation
            this.toggle.style.minWidth = `${
                Math.max(
                    this.toggleOn.getBoundingClientRect().width,
                    this.toggleOff.getBoundingClientRect().width
                ) +
        this.toggleHandle.getBoundingClientRect().width / 2
            }px`;
        }

        if (height) {
            this.toggle.style.height = height;
        } else {
            this.toggle.style.minHeight = "36px"; // First approach for better calculation
            this.toggle.style.minHeight = `${Math.max(
                this.toggleOn.getBoundingClientRect().height,
                this.toggleOff.getBoundingClientRect().height
            )}px`;
        }

        // B: Apply on/off class
        this.toggleOn.classList.add("toggle-on");
        this.toggleOff.classList.add("toggle-off");

        // C: Finally, set lineHeight if needed
        if (height) {
            this.toggleOn.style.lineHeight = calcH(this.toggleOn) + "px";
            this.toggleOff.style.lineHeight = calcH(this.toggleOff) + "px";
        }
    }

    /**
   * Renders the toggle element based on the provided state if the toggle is already built.
   * This method should be called whenever the state of the toggle changes.
   * @param {ToggleState} state The state of the toggle element.
   */
    public render(state: ToggleState): void {
        this.lastState = state;
    
        if (!this.isBuilt) return;

        this.updateToggleByValue(state);
        this.updateToggleByChecked(state);
        this.updateToggleByState(state);
    }

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Updates the class of the toggle element based on the provided state.
     * Removes any existing on/off/indeterminate classes and adds the appropriate class based on the state.
     * If the state is indeterminate, adds the 'indeterminate' class and either the on or off class based on the checked attribute.
     * @param {ToggleState} state The state of the toggle element.
     */
    /*******  9e620de0-7e60-44a0-b26d-be36099794af  *******/
    private updateToggleByValue(state: ToggleState) {
        this.toggle.classList.remove(
            this.onStyle,
            this.offStyle,
            "off",
            "indeterminate"
        );
        switch (state.value) {
        case ToggleStateValue.ON:
            this.toggle.classList.add(this.onStyle);
            break;
        case ToggleStateValue.OFF:
            this.toggle.classList.add(this.offStyle, "off");
            break;
        case ToggleStateValue.INDETERMINATE:
            this.toggle.classList.add("indeterminate");

            if (state.checked) {
                this.toggle.classList.add(this.onStyle);
            } else {
                this.toggle.classList.add(this.offStyle, "off");
            }
            break;
        }
    }

    /**
     * Updates the toggle element based on the provided state.
     * Calls {@link DOMBuilder.updateCheckboxByChecked} and {@link DOMBuilder.updateInvCheckboxByChecked} to update the checkbox and inverted checkbox elements respectively.
     * @param {ToggleState} state The state of the toggle element.
     */
    private updateToggleByChecked(state: ToggleState) {
        this.updateCheckboxByChecked(state);
        this.updateInvCheckboxByChecked(state);
    }

    /**
     * Updates the checkbox element based on the provided state.
     * Sets the checked attribute of the checkbox based on the state's checked attribute.
     * Sets the disabled and readonly attributes of the checkbox based on the state's status.
     * Adds or removes the 'disabled' class from the toggle element based on the state's status.
     * @param {ToggleState} state The state of the toggle element.
     */
    private updateCheckboxByChecked(state: ToggleState) {
        this.checkbox.checked = state.checked;

        switch (state.status) {
        case ToggleStateStatus.ENABLED:
            this.checkbox.disabled = false;
            this.checkbox.readOnly = false;
            this.toggle.classList.remove("disabled");
            this.toggle.removeAttribute("disabled");
            break;
        case ToggleStateStatus.DISABLED:
            this.checkbox.disabled = true;
            this.checkbox.readOnly = false;
            this.toggle.classList.add("disabled");
            this.toggle.setAttribute("disabled", "");
            break;
        case ToggleStateStatus.READONLY:
            this.checkbox.disabled = false;
            this.checkbox.readOnly = true;
            this.toggle.classList.add("disabled");
            this.toggle.setAttribute("disabled", "");
            break;
        }
    }

    /**
     * Updates the inverted checkbox element based on the provided state.
     * Sets the checked attribute of the inverted checkbox to the opposite of the state's checked attribute.
     * Sets the disabled and readonly attributes of the inverted checkbox based on the state's status.
     * @param {ToggleState} state The state of the toggle element.
     */
    private updateInvCheckboxByChecked(state: ToggleState) {
        if (!this.invCheckbox) return;

        this.invCheckbox.checked = !state.checked;

        switch (state.status) {
        case ToggleStateStatus.ENABLED:
            this.invCheckbox.disabled = false;
            this.invCheckbox.readOnly = false;
            break;
        case ToggleStateStatus.DISABLED:
            this.invCheckbox.disabled = true;
            this.invCheckbox.readOnly = false;
            break;
        case ToggleStateStatus.READONLY:
            this.invCheckbox.disabled = false;
            this.invCheckbox.readOnly = true;
            break;
        }
    }

    /**
     * Updates the indeterminate attribute of the checkbox and inverted checkbox elements based on the provided state.
     * If the state is indeterminate, sets the indeterminate attribute of the checkbox and inverted checkbox to true and removes the name attribute.
     * If the state is not indeterminate, sets the indeterminate attribute of the checkbox and inverted checkbox to false and sets the name attribute to the provided name.
     * @param {ToggleState} state The state of the toggle element.
     */
    private updateToggleByState(state: ToggleState) {
        if (state.indeterminate) {
            this.checkbox.indeterminate = true;
            this.checkbox.removeAttribute("name");
            if (this.invCheckbox) this.invCheckbox.indeterminate = true;
            if (this.invCheckbox) this.invCheckbox.removeAttribute("name");
        } else {
            this.checkbox.indeterminate = false;
            if (this.name) this.checkbox.name = this.name;
            if (this.invCheckbox) this.invCheckbox.indeterminate = false;
            if (this.invCheckbox && this.name) this.invCheckbox.name = this.name;
        }
    }

    /**
   * Returns the root element of the toggle, which is the container of all toggle elements.
   * @returns {HTMLElement} The root element of the toggle.
   */
    public get root(): HTMLElement {
        return this.toggle;
    }

    /**
   * Destroys the toggle by removing the toggle element from the DOM and
   * inserting the original checkbox element back into its original position.
   * Also disconnects the ResizeObserver if it was used.
   */
    public destroy(): void {
        this.toggle.parentNode?.insertBefore(this.checkbox, this.toggle);
        this.toggle.parentNode?.removeChild(this.toggle);

        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;

        this.isBuilt = false;
    }
}
