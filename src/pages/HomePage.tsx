import { useMemo, useState } from 'react'
import type { AppLanguage, Country } from '../types/country'
import { CountryCard } from '../components/CountryCard'
import { countryId, regions } from '../utils/country'
import { t } from '../i18n/translations'

export function HomePage({ countries, language }: { countries: Country[]; language: AppLanguage }) {
  const [search, setSearch] = useState(''); 
  const [region, setRegion] = useState(''); 
  const [sort, setSort] = useState<'name' | 'population'>('name'); 
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')
  
  const filtered = useMemo(() => 
    countries.filter(c => c.names.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
    (language === 'pt' && c.names.translations?.por?.common?.toLocaleLowerCase().includes(search.toLocaleLowerCase()))).filter(
      c => !region || c.region === region).sort((a, b) => { const order = sort === 'name' ? a.names.common.localeCompare(b.names.common) : 
        (a.population ?? 0) - (b.population ?? 0); 
        
  return direction === 'asc' ? order : -order }), [countries, search, region, sort, direction, language])
  
  
  return <main>
          <section className="hero">
            <span className="eyebrow">WORLD DATA AT A GLANCE</span>
            <h1>Find your next<br /><em>perspective.</em></h1>
            <p>Browse 249 countries with clear, useful data and no clutter.</p>
          </section>
          <section className="filters" aria-label="Country filters">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t(language, 'search')} aria-label={t(language, 'search')} />
            <select value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">{t(language, 'allRegions')}</option>
              {regions.map(item => <option key={item}>{item}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value as 'name' | 'population')}>
                <option value="name">{t(language, 'sortName')}</option>
                <option value="population">{t(language, 'sortPopulation')}</option>
            </select>
              <button className="sort-button" onClick={() => setDirection(d => d === 'asc' ? 'desc' : 'asc')}>{direction === 'asc' ? '↑' : '↓'} 
                {t(language, direction === 'asc' ? 'ascending' : 'descending')}
              </button>
          </section>
            <div className="results-head">
              <span>{filtered.length} {t(language, 'countries')}</span>
            </div>{filtered.length ? 
            <section className="country-grid">{filtered.map(country => 
              <CountryCard key={countryId(country)} country={country} language={language} />)}
            </section> : 
              <section className="empty">
                <h2>{t(language, 'emptyTitle')}</h2>
                <p>{t(language, 'emptyBody')}</p>
                </section>}
          </main>
}
