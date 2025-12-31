import { sanitize } from "./sanitize"
import { UserOptions, ToggleOptions, DeprecationConfig } from "./options.types"

const DEFAULT: ToggleOptions = {
        onlabel: "On",
        onstyle: "primary",
        onvalue: null,
        ontitle: null,
        offlabel: "Off",
        offstyle: "secondary",
        offvalue: null,
        offtitle: null,
        size: "",
        style: "",
        width: null,
        height: null,
        tabindex: 0,
        tristate: false,
        name: null,
      };

const DEPRECATION: DeprecationConfig = {
        value:
          "BOOTSTRAP TOGGLE DEPRECATION CHECK -- a0Jhux0QySypjjs4tLtEo8xT2kx0AbYaq9K6mgNjWSs0HF0L8T8J0M0o3Kr7zkm7 --",
        ATTRIBUTE: "attribute",
        OPTION: "option",
        log: function (type, oldlabel, newlabel) {
          console.warn(
            `Bootstrap Toggle deprecation warning: Using ${oldlabel} ${type} is deprecated. Use ${newlabel} instead.`
          );
        },
      };

export function resolveOptions(
  element: HTMLInputElement,
  userOptions: UserOptions = {}
): ToggleOptions {
  const getAttr = (name: string) => sanitize(element.getAttribute(name))

  const options: ToggleOptions = {
    onlabel:
      element.getAttribute("data-onlabel") ||
      userOptions.onlabel ||
      DEPRECATION.value ||
      DEFAULT.onlabel,

    offlabel:
      element.getAttribute("data-offlabel") ||
      userOptions.offlabel ||
      DEPRECATION.value ||
      DEFAULT.offlabel,

    onstyle: getAttr("data-onstyle") || userOptions.onstyle || DEFAULT.onstyle,
    offstyle:
      getAttr("data-offstyle") || userOptions.offstyle || DEFAULT.offstyle,

    onvalue:
      getAttr("value") ||
      getAttr("data-onvalue") ||
      userOptions.onvalue ||
      DEFAULT.onvalue,

    offvalue:
      getAttr("data-offvalue") ||
      userOptions.offvalue ||
      DEFAULT.offvalue,

    ontitle:
      getAttr("data-ontitle") ||
      userOptions.ontitle ||
      getAttr("title") ||
      DEFAULT.ontitle,

    offtitle:
      getAttr("data-offtitle") ||
      userOptions.offtitle ||
      getAttr("title") ||
      DEFAULT.offtitle,

    size: getAttr("data-size") || userOptions.size || DEFAULT.size,
    style: getAttr("data-style") || userOptions.style || DEFAULT.style,
    width: getAttr("data-width") || userOptions.width || DEFAULT.width,
    height: getAttr("data-height") || userOptions.height || DEFAULT.height,

    tabindex:
      Number(getAttr("tabindex")) ||
      userOptions.tabindex ||
      DEFAULT.tabindex,

    tristate:
      element.hasAttribute("tristate") ||
      userOptions.tristate ||
      DEFAULT.tristate,

    name: getAttr("name") || userOptions.name || DEFAULT.name
  }

  applyDEPRECATIONs(options, element, userOptions)

  return options
}

function applyDEPRECATIONs(
  options: ToggleOptions,
  element: HTMLInputElement,
  userOptions: UserOptions
) {
  if (options.onlabel === DEPRECATION.value) {
    const deprecatedAttr = sanitize(element.getAttribute("data-on"))
    if (deprecatedAttr) {
      DEPRECATION.log(DEPRECATION.ATTRIBUTE, "data-on", "data-onlabel")
      options.onlabel = deprecatedAttr
    } else if (userOptions.on) {
      DEPRECATION.log(DEPRECATION.OPTION, "on", "onlabel")
      options.onlabel = userOptions.on
    } else {
      options.onlabel = DEFAULT.onlabel
    }
  }

  if (options.offlabel === DEPRECATION.value) {
    const deprecatedAttr = sanitize(element.getAttribute("data-off"))
    if (deprecatedAttr) {
      DEPRECATION.log(DEPRECATION.ATTRIBUTE, "data-off", "data-offlabel")
      options.offlabel = deprecatedAttr
    } else if (userOptions.off) {
      DEPRECATION.log(DEPRECATION.OPTION, "off", "offlabel")
      options.offlabel = userOptions.off
    } else {
      options.offlabel = DEFAULT.offlabel
    }
  }
}
