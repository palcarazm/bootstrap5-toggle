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

  private checkbox: HTMLInputElement;
  private invCheckbox: HTMLInputElement | null;
  private toggle: HTMLElement;
  private toggleGroup: HTMLElement;
  private toggleOn: HTMLElement;
  private toggleOff: HTMLElement;
  private toggleHandle: HTMLElement;

  /**
   * Initializes a new instance of the DOMBuilder class.
   * @param checkbox HTMLInputElement element representing the toggle.
   * @param options ToggleOptions object containing options for the toggle.
   * @param state ToggleState object containing the initial state of the toggle.
   */
  constructor(
    checkbox: HTMLInputElement,
    options: ToggleOptions,
    state: ToggleState
  ) {
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
    this.renderToggle(options);

    this.render(state);
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
    invCheckbox.setAttribute("data-toggle", "invert-toggle");
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
    this.toggle.setAttribute("class", `toggle btn ${this.sizeClass} ${style}`);
    this.toggle.setAttribute("data-toggle", "toggle");
    this.toggle.tabIndex = tabindex;
    this.toggle.role = "button";

    this.checkbox.parentElement?.insertBefore(this.toggle, this.checkbox);
    this.toggle.appendChild(this.checkbox);
    if (this.invCheckbox) this.toggle.appendChild(this.invCheckbox);
    this.toggle.appendChild(this.toggleGroup);

    this.handleToggleSize(width, height);
  }

  /**
   * Creates a div element representing the toggle group.
   * The toggle group contains the on, off, and handle elements of the toggle.
   * @returns An HTMLElement representing the toggle group element.
   */
  private createToggleGroup(): HTMLElement {
    const toggleGroup = document.createElement("div");
    toggleGroup.setAttribute("class", "toggle-group");
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
    toggleSpan.setAttribute(
      "class",
      `btn ${this.sizeClass} ${style}`
    );
    toggleSpan.innerHTML = label;
    if (title) toggleSpan.setAttribute("title", title);
    return toggleSpan;
  }

  /**
   * Creates a span element representing the toggle handle.
   * The span element is given a class attribute with the provided size class.
   * @returns An HTMLElement representing the toggle handle element.
   */
  private createToggleHandle(): HTMLElement {
    const toggleHandle = document.createElement("span");
    toggleHandle.setAttribute("class", `toggle-handle btn ${this.sizeClass}`);
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
   * Renders the toggle element based on the provided state.
   * @param {ToggleState} state The state of the toggle element.
   */
  public render(state: ToggleState): void {
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
    }

    this.checkbox.checked = state.checked;
    if (this.invCheckbox) this.invCheckbox.checked = !state.checked;
    this.toggle.classList.add(state.checked ? this.onStyle : this.offStyle);

    switch (state.status) {
      case ToggleStateStatus.ENABLED:
        this.toggle.classList.remove("disabled");
        this.toggle.removeAttribute("disabled");
        this.checkbox.disabled = false;
        this.checkbox.readOnly = false;
        if (this.invCheckbox) {
          this.invCheckbox.disabled = false;
          this.invCheckbox.readOnly = false;
        }
        break;
      case ToggleStateStatus.DISABLED:
        this.toggle.classList.add("disabled");
        this.toggle.setAttribute("disabled", "");
        this.checkbox.disabled = true;
        this.checkbox.readOnly = false;
        if (this.invCheckbox) {
          this.invCheckbox.disabled = true;
          this.invCheckbox.readOnly = false;
        }
        break;
      case ToggleStateStatus.READONLY:
        this.toggle.classList.add("disabled");
        this.toggle.setAttribute("disabled", "");
        this.checkbox.disabled = false;
        this.checkbox.readOnly = true;
        if (this.invCheckbox) {
          this.invCheckbox.disabled = false;
          this.invCheckbox.readOnly = true;
        }
        break;
    }

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
}
