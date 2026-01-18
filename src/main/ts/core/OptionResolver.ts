import { isNumeric, sanitize, SanitizeMode } from "./Tools";
import {
    UserOptions,
    ToggleOptions,
    OptionWithDeprecationRemap,
    OptionDeprecated,
    ToggleStyle,
    ToggleSize,
    TooltipOptions,
    PlacementOptions,
} from "./OptionResolver.types";

/**
 * OptionResolver is responsible for reading HTML attributes and user options
 * to build a complete ToggleOptions object.
 * It also handles deprecated options.
 */
export class OptionResolver {
    /** Default values for all toggle options */
    static readonly DEFAULT: ToggleOptions = {
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
        aria:{label: "Toggle",},
        tooltip: undefined,
    };

    /**
   * Gets a sanitized attribute value from an HTML element
   * @param element HTMLInputElement to read
   * @param attrName Attribute name
   * @param options method options
   * @param options.sanitized Flag to indicate if the sanitized mode needs to be used (default: `TEXT`)
   * @returns Sanitized attribute value or null
   */
    private static getAttr (element: HTMLInputElement, attrName: string, opts?: {sanitized?:SanitizeMode}) {
        const { sanitized = SanitizeMode.TEXT } = opts ?? {};
        const value = element.getAttribute(attrName);
        return sanitize(value, { mode: sanitized }); ;
    }

    /**
   * Returns the value of an attribute, user-provided value, or default value
   * @param element HTMLInputElement to read
   * @param attrName Attribute name
   * @param userValue Value provided by the user
   * @param defaultValue Default value if neither attribute nor user value exists
   * @param sanitized Flag to indicate if the sanitized mode needs to be used (default: `TEXT`)
   * @returns Final attribute value
   */
    private static getAttrOrDefault<T>(
        element: HTMLInputElement,
        attrName: string,
        userValue: T | undefined,
        defaultValue: T,
        sanitized:SanitizeMode = SanitizeMode.TEXT
    ){
        const sanitizedUserValue = typeof userValue === "string" ? sanitize(userValue as string, { mode: sanitized }) : userValue;
        return OptionResolver.getAttr(element, attrName, {sanitized}) || 
            sanitizedUserValue ||
            defaultValue;
    }

    /**
   * Returns the value of an attribute, user-provided value, or marks as deprecated
   * @param element HTMLInputElement to read
   * @param attrName Attribute name
   * @param userValue Value provided by the user
   * @param sanitized Flag to indicate if the sanitized mode needs to be used (default: `TEXT`)
   * @returns Final attribute value or DeprecationConfig.value if not found
   */
    private static getAttrOrDeprecation<T>(
        element: HTMLInputElement,
        attrName: string,
        userValue: T,
        sanitized:SanitizeMode = SanitizeMode.TEXT
    ){
        const sanitizedUserValue = typeof userValue === "string" ? sanitize(userValue as string, { mode: sanitized }) : userValue;
        return OptionResolver.getAttr(element, attrName, {sanitized}) ||
            sanitizedUserValue ||
            DeprecationConfig.value;
    }

    /**
   * Resolves all toggle options from the element and user options
   * @param element HTMLInputElement representing the toggle
   * @param userOptions Options provided by the user
   * @returns Complete ToggleOptions object
   */
    static resolve(
        element: HTMLInputElement,
        userOptions: UserOptions = {}
    ): ToggleOptions {
        const options: ToggleOptions = {
            onlabel: this.getAttrOrDeprecation(
                element,
                "data-onlabel",
                userOptions.onlabel,
                SanitizeMode.HTML
            ),
            offlabel: this.getAttrOrDeprecation(
                element,
                "data-offlabel",
                userOptions.offlabel,
                SanitizeMode.HTML
            ),
            onstyle: this.getAttrOrDefault(
                element,
                "data-onstyle",
                userOptions.onstyle,
                OptionResolver.DEFAULT.onstyle
            ) as ToggleStyle,
            offstyle: this.getAttrOrDefault(
                element,
                "data-offstyle",
                userOptions.offstyle,
                OptionResolver.DEFAULT.offstyle
            ) as ToggleStyle,
            onvalue: this.getAttr(element,"value") || this.getAttrOrDefault(
                element,
                "data-onvalue",
                userOptions.onvalue,
                OptionResolver.DEFAULT.onvalue
            ),
            offvalue: this.getAttrOrDefault(
                element,
                "data-offvalue",
                userOptions.offvalue,
                OptionResolver.DEFAULT.offvalue
            ),
            ontitle: this.getAttrOrDefault(
                element,
                "data-ontitle",
                userOptions.ontitle,
                OptionResolver.getAttr(element, "title") ||
          OptionResolver.DEFAULT.ontitle
            ),
            offtitle: this.getAttrOrDefault(
                element,
                "data-offtitle",
                userOptions.offtitle,
                OptionResolver.getAttr(element, "title") ||
          OptionResolver.DEFAULT.offtitle
            ),
            size: this.getAttrOrDefault(
                element,
                "data-size",
                userOptions.size,
                this.DEFAULT.size
            ) as ToggleSize,
            style: this.getAttrOrDefault(
                element,
                "data-style",
                userOptions.style,
                this.DEFAULT.style
            ),
            width: this.getAttrOrDefault(
                element,
                "data-width",
                userOptions.width,
                this.DEFAULT.width
            ),
            height: this.getAttrOrDefault(
                element,
                "data-height",
                userOptions.height,
                this.DEFAULT.height
            ),
            tabindex: Number(
                this.getAttrOrDefault(
                    element,
                    "tabindex",
                    userOptions.tabindex,
                    this.DEFAULT.tabindex
                )
            ),
            tristate:
        element.hasAttribute("tristate") ||
        userOptions.tristate ||
        OptionResolver.DEFAULT.tristate,
            name: this.getAttrOrDefault(
                element,
                "name",
                userOptions.name,
                this.DEFAULT.name
            ),
            aria:{
                label: this.getAttrOrDefault(
                    element,
                    "aria-label",
                    userOptions.aria?.label,
                    this.DEFAULT.aria.label
                ),
            },
            tooltip: OptionResolver.resolveTooltipOptions(element, userOptions),
        };

        if(options.width && isNumeric(options.width)) options.width = `${options.width}px`;
        if(options.height && isNumeric(options.height)) options.height = `${options.height}px`;

        DeprecationConfig.handle(options, element, userOptions);

        return options;
    }

    /**
     * Resolve tooltip options from element attributes and user options.
     * @param element HTMLInputElement representing the toggle
     * @param userOptions Options provided by the user
     * @returns Resolved tooltip options or undefined if not found.
     */
    private static resolveTooltipOptions(
        element: HTMLInputElement,
        userOptions: UserOptions
    ): TooltipOptions | undefined {
        const getTitle = (attr:string, userOption?:string) => this.getAttrOrDefault(
            element,
            attr,
            userOption,
            null,
            SanitizeMode.HTML
        ) || this.getAttr(element, "data-tooltip-title", {sanitized: SanitizeMode.HTML});

        const titleOn = getTitle("data-tooltip-title-on", userOptions.tooltip?.title.on);
        const titleOff = getTitle("data-tooltip-title-off", userOptions.tooltip?.title.off);
        const titleMixed = getTitle("data-tooltip-title-mixed", userOptions.tooltip?.title.mixed);
        if(!titleOn || !titleOff ) return OptionResolver.DEFAULT.tooltip;

        const placement = this.getAttrOrDefault(
            element,
            "data-tooltip-placement",
            userOptions.tooltip?.placement,
            PlacementOptions.TOP
        ) as PlacementOptions;

        return{
            placement: Object.values(PlacementOptions).includes(placement) ? placement : PlacementOptions.TOP,
            title:{
                on: titleOn,
                off: titleOff,
                mixed: titleMixed ?? undefined,
            },
        };
    }
}

/** Types of deprecation source */
enum OptionType {
  ATTRIBUTE = "attribute",
  OPTION = "option",
}

/**
 * Handles deprecated attributes and options for Bootstrap Toggle.
 */
class DeprecationConfig {
    /** Unique string used to detect deprecated placeholders */
    static readonly value: string =
        "BOOTSTRAP TOGGLE DEPRECATION CHECK -- a0Jhux0QySypjjs4tLtEo8xT2kx0AbYaq9K6mgNjWSs0HF0L8T8J0M0o3Kr7zkm7 --";

    /** Mapping of current option, deprecated attribute, and deprecated user option */
    private static readonly deprecatedOptions: {
    currentOpt: OptionWithDeprecationRemap;
    deprecatedAttr: string;
    deprecatedOpt: OptionDeprecated;
    mode: SanitizeMode
  }[] = [
            {
                currentOpt: "onlabel",
                deprecatedAttr: "data-on",
                deprecatedOpt: "on",
                mode: SanitizeMode.HTML 
            },
            {
                currentOpt: "offlabel",
                deprecatedAttr: "data-off",
                deprecatedOpt: "off",
                mode: SanitizeMode.HTML
            },
        ];

    /**
   * Processes deprecated options and attributes and logs warnings
   * @param options ToggleOptions object to update
   * @param element HTMLInputElement to read deprecated attributes from
   * @param userOptions UserOptions provided by the user
   */
    static handle(
        options: ToggleOptions,
        element: HTMLInputElement,
        userOptions: UserOptions
    ): void {
        this.deprecatedOptions.forEach(
            ({ currentOpt, deprecatedAttr, deprecatedOpt, mode }) => {
                if (options[currentOpt] === DeprecationConfig.value) {
                    const deprecatedAttrSanitized = sanitize(
                        element.getAttribute(deprecatedAttr),
                        {mode}
                    );
                    if (deprecatedAttrSanitized) {
                        this.log(
                            OptionType.ATTRIBUTE,
                            deprecatedAttr,
                            `data-${currentOpt}`
                        );
                        options[currentOpt] = deprecatedAttrSanitized;
                    } else if (userOptions[deprecatedOpt]) {
                        this.log(OptionType.OPTION, deprecatedOpt, currentOpt);
                        options[currentOpt] = userOptions[deprecatedOpt];
                    } else {
                        options[currentOpt] = OptionResolver.DEFAULT[currentOpt];
                    }
                }
            }
        );
    }

    /**
   * Logs a deprecation warning to the console
   * @param type Source of the deprecated option (ATTRIBUTE | OPTION)
   * @param oldLabel Deprecated attribute or option name
   * @param newLabel Recommended replacement option name
   */
    private static log(
        type: OptionType,
        oldLabel: string,
        newLabel: string
    ): void {
        console.warn(
            `Bootstrap Toggle deprecation warning: Using ${oldLabel} ${type} is deprecated. Use ${newLabel} instead.`
        );
    }
}
