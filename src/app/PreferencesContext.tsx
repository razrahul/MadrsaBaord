import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'

export type Language = 'en' | 'hi'

export type ThemeId =
  | 'navy-saffron'
  | 'maroon-gold'
  | 'royal-blue-teal'
  | 'emerald-sage'
  | 'clean-white'
  | 'chaiui'

const STORAGE_KEYS = {
  language: 'bsmeb-language',
  fontStep: 'bsmeb-font-step',
  theme: 'bsmeb-theme',
} as const

export const MIN_FONT_STEP = -2
export const MAX_FONT_STEP = 2
const BASE_FONT_PX = 16

const VALID_THEMES: readonly ThemeId[] = [
  'navy-saffron',
  'maroon-gold',
  'royal-blue-teal',
  'emerald-sage',
  'clean-white',
  'chaiui',
]

function clampFontStep(value: number): number {
  return Math.max(MIN_FONT_STEP, Math.min(MAX_FONT_STEP, value))
}

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEYS.language)
  return saved === 'hi' ? 'hi' : 'en'
}

function readInitialFontStep(): number {
  if (typeof window === 'undefined') return 0
  const raw = Number(window.localStorage.getItem(STORAGE_KEYS.fontStep))
  return Number.isFinite(raw) ? clampFontStep(raw) : 0
}

function readInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'navy-saffron'
  const saved = window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeId | null
  return saved && VALID_THEMES.includes(saved) ? saved : 'navy-saffron'
}

interface PreferencesState {
  language: Language
  fontStep: number
  theme: ThemeId
}

type PreferencesAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_FONT_STEP'; payload: number }
  | { type: 'STEP_FONT'; payload: -1 | 1 }
  | { type: 'SET_THEME'; payload: ThemeId }

function preferencesReducer(
  state: PreferencesState,
  action: PreferencesAction
): PreferencesState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'SET_FONT_STEP':
      return { ...state, fontStep: clampFontStep(action.payload) }
    case 'STEP_FONT':
      return { ...state, fontStep: clampFontStep(state.fontStep + action.payload) }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
  }
}

interface PreferencesContextValue extends PreferencesState {
  setLanguage: (lang: Language) => void
  setFontStep: (step: number) => void
  stepFont: (delta: -1 | 1) => void
  setTheme: (theme: ThemeId) => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(preferencesReducer, undefined, () => ({
    language: readInitialLanguage(),
    fontStep: readInitialFontStep(),
    theme: readInitialTheme(),
  }))

  // Sync language to <html lang="...">, document title, and localStorage
  useEffect(() => {
    document.documentElement.lang = state.language
    document.title =
      state.language === 'hi'
        ? 'बिहार राज्य मदरसा शिक्षा बोर्ड (BSMEB) | बिहार सरकार'
        : 'Bihar State Madrasa Education Board (BSMEB) | Government of Bihar'
    window.localStorage.setItem(STORAGE_KEYS.language, state.language)
  }, [state.language])

  // Sync root font size and localStorage
  useEffect(() => {
    document.documentElement.style.fontSize = `${BASE_FONT_PX + state.fontStep}px`
    window.localStorage.setItem(STORAGE_KEYS.fontStep, String(state.fontStep))
  }, [state.fontStep])

  // Sync theme attribute to <html> and localStorage
  useEffect(() => {
    if (state.theme === 'navy-saffron') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', state.theme)
    }
    window.localStorage.setItem(STORAGE_KEYS.theme, state.theme)
  }, [state.theme])

  const value: PreferencesContextValue = {
    ...state,
    setLanguage: (lang) => dispatch({ type: 'SET_LANGUAGE', payload: lang }),
    setFontStep: (step) => dispatch({ type: 'SET_FONT_STEP', payload: step }),
    stepFont: (delta) => dispatch({ type: 'STEP_FONT', payload: delta }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
  }

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext)
  if (!ctx) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return ctx
}
