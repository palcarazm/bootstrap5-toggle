export interface ToggleOptions {
  onlabel: string
  offlabel: string
  onstyle: string
  offstyle: string
  onvalue: string | null
  offvalue: string | null
  ontitle: string | null
  offtitle: string | null
  size: string
  style: string
  width: number | string | null
  height: number | string | null
  tabindex: number
  tristate: boolean
  name: string | null
}

export interface DeprecationConfig {
  value: string
  ATTRIBUTE: string
  OPTION: string
  log: (type: string, oldLabel: string, newLabel: string) => void
}

export type UserOptions =
 Partial<ToggleOptions> & {
    on?: string
    off?: string
  };

