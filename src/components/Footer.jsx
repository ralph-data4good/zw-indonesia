import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-zwa-ink text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Country switch note */}
          <div className="md:col-span-2">
            <p className="text-sm text-zwa-muted mb-3">
              {t('footer.countrySwitch')}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip chip-active cursor-default">Indonesia</span>
              <a href="#" className="chip bg-zwa-surface text-white hover:bg-zwa-primary-ink">
                Philippines
              </a>
              <a href="#" className="chip bg-zwa-surface text-white hover:bg-zwa-primary-ink">
                Vietnam
              </a>
              <a href="#" className="chip bg-zwa-surface text-white hover:bg-zwa-primary-ink">
                Thailand
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link 
                to="/about" 
                className="text-sm text-zwa-muted hover:text-white transition-colors"
              >
                {t('footer.contact')}
              </Link>
              <a 
                href="#" 
                className="text-sm text-zwa-muted hover:text-white transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="#" 
                className="text-sm text-zwa-muted hover:text-white transition-colors"
              >
                {t('footer.terms')}
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zwa-border">
          <p className="text-sm text-zwa-muted text-center">
            {t('footer.credit')} • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

