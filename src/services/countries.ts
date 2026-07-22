import type { CountriesResponse, Country } from '../types/country'

const BASE_URL = 'https://api.restcountries.com/countries/v5'
const CACHE_KEY = 'worldscope:countries:v1'
const MAX_CACHE_AGE = 72 * 60 * 60 * 1000

interface CacheEntry { savedAt: number; countries: Country[] }

function cachedCountries(): Country[] | null {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return null
  try {
    const cache = JSON.parse(raw) as CacheEntry
    return Date.now() - cache.savedAt < MAX_CACHE_AGE ? cache.countries : null
  } catch { return null }
}

async function request(path: string): Promise<CountriesResponse> {
  const key = import.meta.env.VITE_RESTCOUNTRIES_API_KEY
  if (!key) throw new Error('Missing API key. Add VITE_RESTCOUNTRIES_API_KEY to your .env file.')
  const response = await fetch(`${BASE_URL}${path}`, { headers: { Authorization: `Bearer ${key}` } })
  if (!response.ok) 
    throw new Error(response.status === 401 || response.status === 403 ? 'Your API key was rejected. Check your .env and allowed origins.' : 
    'We could not load country data. Please try again.')
  return response.json() as Promise<CountriesResponse>
}

export async function getAllCountries(): Promise<Country[]> {
  const cache = cachedCountries()
  if (cache) return cache
  const first = await request('?limit=100')
  const countries = [...first.data.objects]
  for (let offset = 100; offset < first.data.meta.total; offset += 100) {
    const page = await request(`?limit=100&offset=${offset}`)
    countries.push(...page.data.objects)
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), countries }))
  return countries
}
