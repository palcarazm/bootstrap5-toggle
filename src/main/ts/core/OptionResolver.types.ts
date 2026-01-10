export interface ToggleOptions {
  onlabel: string
  offlabel: string
  onstyle: ToggleStyle
  offstyle: ToggleStyle
  onvalue: string | null
  offvalue: string | null
  ontitle: string | null
  offtitle: string | null
  size: ToggleSize | ""
  style: string
  width: string | null
  height: string | null
  tabindex: number
  tristate: boolean
  name: string | null
  aria:AriaToggleOptions
}

export type AriaToggleOptions = {
    label: string
};

export type UserOptions =
 Partial<ToggleOptions> & {
    on?: string
    off?: string
    width?: string | number
    height?: string | number
  };

export type ToggleStyle = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark";
export type ToggleSize = "large" | "normal" | "small" | "mini" | "lg" | "md" | "sm" | "xs";
export type OptionWithDeprecationRemap = "onlabel" | "offlabel";
export type OptionDeprecated = "on" | "off";
