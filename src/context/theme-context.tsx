import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type ThemeName = 'light' | 'dark' | 'green'

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>('green') // Default to green theme

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeName | null
    if (savedTheme && ['light', 'dark', 'green'].includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      // Default to green theme if no preference is set
      setTheme('green')
    }
  }, [])

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('light', 'dark', 'green')
    // Add current theme class
    document.documentElement.classList.add(theme)
    // Also set data-theme attribute for better CSS targeting
    document.documentElement.setAttribute('data-theme', theme)
    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      switch (prev) {
        case 'light': return 'dark'
        case 'dark': return 'green'
        case 'green': return 'light'
        default: return 'green'
      }
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}