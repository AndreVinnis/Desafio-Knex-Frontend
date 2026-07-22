import type { AppLanguage, Country } from '../types/country'

export const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
export const countryId = (country: Country) => country.codes.alpha_3 || country.codes.alpha_2 || country.names.common
export const capitalText = (country: Country) => {
  const capitals = country.capitals ? (Array.isArray(country.capitals) ? country.capitals : [country.capitals]) : []
  return capitals.map(capital => capital.name).filter(Boolean).join(', ')
}
export const displayName = (country: Country, language: AppLanguage) => language === 'pt' ? country.names.translations?.por?.common ?? country.names.common : country.names.common
export const formatNumber = (value: number | undefined, language: AppLanguage) => new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US').format(value ?? 0)
export const currencyText = (country: Country) => Object.values(country.currencies ?? {}).map(({ name, symbol }) => symbol ? `${name} (${symbol})` : name).join(', ') || '—'
export const codeMap = (countries: Country[]) => new Map(countries.map(country => [country.codes.alpha_3, country]))
