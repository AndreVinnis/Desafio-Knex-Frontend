import type { AppLanguage, Country } from '../types/country'
import { t } from '../i18n/translations'
import { capitalText, codeMap, countryId, currencyText, displayName, formatNumber } from '../utils/country'

export function CountryPage({ country, countries, language }: { country: Country; countries: Country[]; language: AppLanguage }) {
  const goHome = () => { history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')) }; const neighbours = codeMap(countries)
  return <main className="details">
    <button className="back" onClick={goHome}>← {t(language, 'back')}</button>
    <section className="detail-hero"><span className="detail-flag" role="img">{country.flag.emoji ?? '🏳️'}
      </span>
        <div>
          <span className="eyebrow">{country.region}</span>
          <h1>{displayName(country, language)}</h1>
          <p>{country.names.official}</p>
        </div>
    </section>
    <section className="facts">
      <Fact label={t(language, 'capital')} value={capitalText(country) || t(language, 'noCapital')} />
      <Fact label={t(language, 'region')} value={country.region ?? '—'} />
      <Fact label={t(language, 'subregion')} value={country.subregion ?? '—'} />
      <Fact label={t(language, 'population')} value={formatNumber(country.population, language)} />
      <Fact label={t(language, 'area')} value={`${formatNumber(country.area, language)} km²`} />
      <Fact label={t(language, 'currencies')} value={currencyText(country)} />
      <Fact label={t(language, 'languages')} value={Object.values(country.languages ?? {}).join(', ') || '—'} />
      <Fact label={t(language, 'timezones')} value={country.timezones?.join(', ') || '—'} />
    </section>
    <section className="borders">
      <h2>{t(language, 'borders')}</h2>{country.borders?.length ? 
      <div>{country.borders.map(code => { const border = neighbours.get(code); return border ? 
        <button key={countryId(border)} onClick={() => { 
            history.pushState({}, '', `/country/${encodeURIComponent(countryId(border))}`); 
            window.dispatchEvent(new PopStateEvent('popstate')) 
          }}>
          {border.flag.emoji} {displayName(border, language)}
        </button> : null })}
      </div> : <p>{t(language, 'noBorders')}</p>}
    </section>
  </main>
}
function Fact({ label, value }: { label: string; value: string }) { 
  return <article>
      <span>{label}</span><strong>{value}</strong>
    </article> 
}
