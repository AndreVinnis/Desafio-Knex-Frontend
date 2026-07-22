import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countries'
import type { Country } from '../types/country'

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = () => {
    setLoading(true); setError(null)
    getAllCountries().then(setCountries).catch((reason: unknown) => 
      setError(reason instanceof Error ? reason.message : 'Unable to load countries.')).finally(() => setLoading(false))
  }
  useEffect(load, [])
  return { countries, loading, error, reload: load }
}
