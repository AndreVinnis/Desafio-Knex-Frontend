import { useEffect, useState, type ReactNode } from 'react'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { CountryPage } from './pages/CountryPage'
import { useCountries } from './hooks/useCountries'
import type { AppLanguage, Theme } from './types/country'
import { t } from './i18n/translations'
import { countryId } from './utils/country'

const stored = <T,>(key: string, fallback: T): T => (localStorage.getItem(key) as T | null) ?? fallback
export default function App() {
  const [language, setLanguageState] = useState<AppLanguage>(() => stored('worldscope:language', 'en'))
  const [theme, setThemeState] = useState<Theme>(() => stored('worldscope:theme', 'system'))
  const [path, setPath] = useState(location.pathname)
  const { countries, loading, error, reload } = useCountries()
  const setLanguage = (value: AppLanguage) => { localStorage.setItem('worldscope:language', value); setLanguageState(value) }
  const setTheme = (value: Theme) => { localStorage.setItem('worldscope:theme', value); setThemeState(value) }
  
  useEffect(() => { 
        const handle = () => setPath(location.pathname); 
        addEventListener('popstate', handle); 
        return () => removeEventListener('popstate', handle) 
      }, [])

  useEffect(() => { 
        const media = matchMedia('(prefers-color-scheme: dark)'); 
        const apply = () => document.documentElement.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme; apply(); 
        media.addEventListener('change', apply); return () => 
          media.removeEventListener('change', apply) 
      }, [theme])

  const code = path.match(/^\/country\/([^/]+)$/)?.[1]; 
  const country = countries.find(item => countryId(item) === (code ? decodeURIComponent(code) : ''))
  return <><Header language={language} setLanguage={setLanguage} 
  theme={theme} setTheme={setTheme} />
  {
    loading ? <State title={t(language, 'loading')} /> : error ? <State title={t(language, 'errorTitle')} 
    body={error} action={<button onClick={reload}>{t(language, 'retry')}</button>} /> :
    country ? <CountryPage country={country} countries={countries} language={language} /> :
    code ? <State title="Country not found" action={<button onClick={
      () => { history.pushState({}, '', '/'); dispatchEvent(new PopStateEvent('popstate')) }
    }>
      {t(language, 'back')}</button>} /> : <HomePage countries={countries} language={language} />
  }</>
}
function State({ title, body, action }: { title: string; body?: string; action?: ReactNode }) { 
  return <main className="state"><div className="orb" /><h1>{title}</h1>{body && <p>{body}</p>}{action}</main> 
}
