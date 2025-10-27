import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';
import { cx } from '../lib/utils';
import LangSwitch from './LangSwitch';

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/map', label: 'Infobank / Directory' },
    { path: '/resources', label: 'Resource Library' },
    { path: '/events', label: 'Events' },
    { path: '/calculator', label: 'Calculator' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="Zero Waste Indonesia Home"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="Zero Waste Indonesia"
              className="h-10"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cx(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  location.pathname === item.path
                    ? 'text-primary bg-blue-50'
                    : 'text-fg-muted hover:text-fg hover:bg-neutral-50'
                )}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LangSwitch />
            
            {/* Account Button (Yellow/Gold) */}
            <button className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-secondary text-white font-medium text-sm hover:bg-secondary-dark transition-all hover:scale-[1.02]">
              Account
            </button>
            
            {/* Logout Button (White with border) */}
            <button className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-white border-2 border-neutral-300 text-fg font-medium text-sm hover:bg-neutral-50 transition-all">
              Logout
            </button>
            
            {/* Contribute Button (Dark Teal) */}
            <Link
              to="/about"
              className="inline-flex items-center px-5 py-2 rounded-lg bg-header-bg text-white font-medium text-sm hover:bg-primary-dark transition-all hover:scale-[1.02] shadow-sm"
            >
              Contribute
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-fg-muted hover:text-fg hover:bg-neutral-50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden border-t border-neutral-200 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cx(
                'block px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                location.pathname === item.path
                  ? 'text-primary bg-blue-50'
                  : 'text-fg-muted hover:text-fg hover:bg-neutral-50'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 px-4 pt-4">
            <button className="flex-1 px-4 py-2 rounded-lg bg-secondary text-white font-medium text-sm">
              Account
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-neutral-300 text-fg font-medium text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
