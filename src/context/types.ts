export type ThemeName = 'light' | 'dark' | 'green'

export interface ThemeColors {
  bg: string
  surface: string
  text: string
  textSecondary: string
  border: string
}

export interface Theme {
  name: ThemeName
  colors: ThemeColors
  primary: Record<number, string>
  success: string
  warning: string
  error: string
  info: string
}