import { DOMBuilder } from "../../../main/ts/core/DOMBuilder";
import {
  ToggleStateStatus,
  ToggleStateValue,
  ToggleState,
} from "../../../main/ts/core/StateReducer.types";
import { ToggleOptions } from "../../../main/ts/core/OptionResolver.types";

function createCheckbox(): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "test";
  document.body.appendChild(input);
  return input;
}

const BASE_OPTIONS: ToggleOptions = {
  onlabel: "ON",
  offlabel: "OFF",
  onstyle: "primary",
  offstyle: "secondary",
  onvalue: "1",
  offvalue: "0",
  ontitle: null,
  offtitle: null,
  size: "",
  style: "",
  width: null,
  height: null,
  tabindex: 0,
  tristate: false,
  name: "myToggle",
};

function state(
  value: ToggleStateValue,
  status: ToggleStateStatus,
  checked = false,
  indeterminate = false
): ToggleState {
  return {
    value,
    status,
    checked,
    indeterminate,
  };
}

describe("DOMBuilder", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("builds toggle DOM structure", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
    );

    const toggle = document.querySelector(".toggle");
    expect(toggle).not.toBeNull();
    expect(toggle!.querySelector(".toggle-group")).not.toBeNull();
    expect(toggle!.querySelector(".toggle-on")).not.toBeNull();
    expect(toggle!.querySelector(".toggle-off")).not.toBeNull();
    expect(toggle!.querySelector(".toggle-handle")).not.toBeNull();
  });

  it("defers render when parent not visible", () => {
    (global as any).__dom_setup_setHidden();
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
    );
    expect(document.querySelector(".toggle")).toBeNull();
    (global as any).__dom_setup_setVisible();
    (global as any).__dom_setup_triggerResize(120, 40);
    expect(document.querySelector(".toggle")).not.toBeNull();
  });

  it("renders ON state", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.ON, ToggleStateStatus.ENABLED, true)
    );

    const toggle = document.querySelector(".toggle")!;
    expect(toggle.classList.contains("btn-primary")).toBe(true);
    expect(toggle.classList.contains("off")).toBe(false);
    expect(checkbox.checked).toBe(true);
    expect(checkbox.value).toBe("1");
  });

  it("renders OFF state", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED, false)
    );

    const toggle = document.querySelector(".toggle")!;
    expect(toggle.classList.contains("btn-secondary")).toBe(true);
    expect(toggle.classList.contains("off")).toBe(true);
    expect(checkbox.checked).toBe(false);
  });

  it("renders INDETERMINATE state", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(
        ToggleStateValue.INDETERMINATE,
        ToggleStateStatus.ENABLED,
        false,
        true
      )
    );

    expect(checkbox.indeterminate).toBe(true);
  });

  it("applies disabled state", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.DISABLED)
    );

    const toggle = document.querySelector(".toggle")!;
    expect(toggle.classList.contains("disabled")).toBe(true);
    expect(checkbox.disabled).toBe(true);
  });

  it("applies readonly state", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.READONLY)
    );

    const toggle = document.querySelector(".toggle")!;
    expect(toggle.classList.contains("disabled")).toBe(true);
    expect(checkbox.readOnly).toBe(true);
    expect(checkbox.disabled).toBe(false);
  });

  it("sets input name correctly", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
    );

    expect(checkbox.name).toBe("myToggle");
  });

  it("creates inverted checkbox when offvalue exists", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      BASE_OPTIONS,
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
    );

    const inv = document.querySelector(
      'input[data-toggle="invert-toggle"]'
    ) as HTMLInputElement;

    expect(inv).not.toBeNull();
    expect(inv.value).toBe("0");
  });

  it("applies explicit width and height", () => {
    const checkbox = createCheckbox();

    new DOMBuilder(
      checkbox,
      {
        ...BASE_OPTIONS,
        width: "120px",
        height: "40px",
      },
      state(ToggleStateValue.OFF, ToggleStateStatus.ENABLED)
    );

    const toggle = document.querySelector(".toggle") as HTMLElement;
    expect(toggle.style.width).toBe("120px");
    expect(toggle.style.height).toBe("40px");
  });
});
