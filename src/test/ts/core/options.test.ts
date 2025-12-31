import { resolveOptions } from "../../../main/ts/core/options"
import { ToggleDefaults } from "../../../main/ts/core/options.types"

function createElement(attrs: Record<string, any> = {}) {
  const el = document.createElement("input")
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === true) el.setAttribute(key, "")
    else el.setAttribute(key, value)
  })
  return el as HTMLInputElement
}

const DEFAULTS: ToggleDefaults = {
  onlabel: "On",
  offlabel: "Off",
  onstyle: "primary",
  offstyle: "secondary",
  onvalue: null,
  offvalue: null,
  ontitle: null,
  offtitle: null,
  size: "",
  style: "",
  width: null,
  height: null,
  tabindex: 0,
  tristate: false,
  name: null
}

const DEPRECATION = {
  value: "__DEPRECATED__",
  ATTRIBUTE: "attribute",
  OPTION: "option",
  log: jest.fn()
}

describe("resolveOptions", () => {
  beforeEach(() => {
    DEPRECATION.log.mockClear()
  })

  it("uses data attributes over defaults", () => {
    const el = createElement({ "data-onlabel": "YES" })

    const options = resolveOptions({
      element: el,
      defaults: DEFAULTS,
      deprecation: DEPRECATION
    })

    expect(options.onlabel).toBe("YES")
  })

  it("falls back to defaults", () => {
    const el = createElement()

    const options = resolveOptions({
      element: el,
      defaults: DEFAULTS,
      deprecation: DEPRECATION
    })

    expect(options.onlabel).toBe("On")
    expect(options.offlabel).toBe("Off")
  })

  it("handles deprecated attributes", () => {
    const el = createElement({
      "data-onlabel": DEPRECATION.value,
      "data-on": "OLD"
    })

    const options = resolveOptions({
      element: el,
      defaults: DEFAULTS,
      deprecation: DEPRECATION
    })

    expect(options.onlabel).toBe("OLD")
    expect(DEPRECATION.log).toHaveBeenCalled()
  })

  it("detects tristate attribute", () => {
    const el = createElement({ tristate: true })

    const options = resolveOptions({
      element: el,
      defaults: DEFAULTS,
      deprecation: DEPRECATION
    })

    expect(options.tristate).toBe(true)
  })
})
