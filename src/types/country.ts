export type Language = Record<string, string>
export interface Capital { name: string }

export interface Country {
  names: {
    common: string
    official: string
    translations?: { por?: { common?: string; official?: string } }
  }
  codes: { alpha_2: string; alpha_3: string }
  flag: { emoji?: string; png?: string; svg?: string; alt?: string }
  region?: string
  subregion?: string
  capitals?: Capital | Capital[]
  population?: number
  area?: number
  currencies?: Record<string, { name: string; symbol?: string }>
  languages?: Language
  timezones?: string[]
  borders?: string[]
}

export interface CountriesResponse {
  data: { objects: Country[]; meta: { total: number; count: number; limit: number; offset: number; more: boolean } }
}

export type AppLanguage = 'en' | 'pt'
export type Theme = 'light' | 'dark' | 'system'
