import type { AppLanguage, Country } from '../types/country'
import { countryId, currencyText, displayName, formatNumber } from '../utils/country'
import { t } from '../i18n/translations'

export function CountryCard({ country, language }: { country: Country; language: AppLanguage }) {
  const go = () => { history.pushState({}, '', `/country/${encodeURIComponent(countryId(country))}`);
   window.dispatchEvent(new PopStateEvent('popstate')) }
  return <button className="country-card" onClick={go}>
          <span className="flag" role="img" aria-label={country.flag.alt ?? `${country.names.common} flag`}>{country.flag.emoji ?? '🏳️'}</span>
          <span className="card-body"><strong>{displayName(country, language)}</strong>
          <span>{country.region ?? '—'}</span><span><b>{t(language, 'population')}:</b> {formatNumber(country.population, language)}</span>
          <span><b>{t(language, 'currencies')}:</b> {currencyText(country)}</span></span>
        </button>
}
