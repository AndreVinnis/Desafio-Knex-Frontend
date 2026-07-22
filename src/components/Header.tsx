import type { AppLanguage, Theme } from '../types/country'
import { t } from '../i18n/translations'

interface Props { language: AppLanguage; setLanguage: (language: AppLanguage) => void; theme: Theme; setTheme: (theme: Theme) => void }

export function Header({ language, setLanguage, theme, setTheme }: Props) {
  return <header className="site-header">
            <a href="/" onClick={(event) => { event.preventDefault(); history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate')) }} className="brand">
              <span>◉</span> WorldScope</a><p>{t(language, 'tagline')}</p>
              <div className="header-controls">
                <label>
                  <span className="sr-only">{t(language, 'language')}</span>
                  <select value={language} onChange={e => setLanguage(e.target.value as AppLanguage)}>
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                  </select>
                </label>
                <label>
                  <span className="sr-only">{t(language, 'theme')}</span>
                  <select value={theme} onChange={e => setTheme(e.target.value as Theme)}>
                    <option value="system">{t(language, 'system')}</option>
                    <option value="light">{t(language, 'light')}</option>
                    <option value="dark">{t(language, 'dark')}</option>
                  </select>
                </label>
              </div>
          </header>
}
