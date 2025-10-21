import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { cx } from '../lib/utils';
import LangSwitch from './LangSwitch';

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/map', label: t('nav.map') },
    { path: '/resources', label: t('nav.resources') },
    { path: '/events', label: t('nav.events') },
    { path: '/calculator', label: t('nav.calculator') },
    { path: '/about', label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-semibold text-lg text-zwa-ink hover:text-zwa-primary transition-colors group"
            aria-label="Zero Waste Asia Indonesia Home"
          >
            <Leaf className="w-5 h-5 text-zwa-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
            <div className="relative">
              <span>Zero Waste Asia</span>
              <span className="absolute -bottom-1 -right-16 text-[10px] font-medium px-2 py-0.5 bg-zwa-primary text-white rounded-full">
                Indonesia
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cx(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-zwa-primary/10 text-zwa-primary'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-zwa-ink'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LangSwitch />
            <Link
              to="/about"
              className="btn btn-ghost text-sm hidden sm:inline-flex"
            >
              {t('nav.contribute')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

