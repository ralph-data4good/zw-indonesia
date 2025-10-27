import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';
import { ChevronDown } from 'lucide-react';
import { cx } from '../lib/utils';
import LangSwitch from './LangSwitch';

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { path: '/map', label: 'Directory' },
    { path: '/resources', label: 'Resources' },
    { path: '/events', label: 'Events' },
    { path: '/calculator', label: 'Calculator' },
    { 
      path: '/about', 
      label: 'About',
      submenu: [
        { path: '/about', label: 'About the Project' },
        { path: '/about#community', label: 'Our Community' },
        { path: '/about#partners', label: 'Our Partners' },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Zero Waste Indonesia Home"
          >
            <div className="flex items-center gap-2">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#2179B3" />
                <path d="M20 10 L26 16 L20 22 L14 16 Z" fill="#D4A73F" />
                <path d="M14 18 L20 24 L26 18 L20 30 Z" fill="#489E4A" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-fg leading-none">Zero Waste</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Indonesia</span>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              item.submenu ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setShowAboutMenu(true)}
                  onMouseLeave={() => setShowAboutMenu(false)}
                >
                  <button
                    className={cx(
                      'inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      location.pathname.startsWith(item.path)
                        ? 'text-primary bg-blue-50'
                        : 'text-fg-muted hover:text-fg hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showAboutMenu && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-fg-muted hover:text-fg hover:bg-neutral-50 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LangSwitch />
            
            {/* Register Button */}
            <Link
              to="/register"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-white border-2 border-neutral-300 text-fg font-medium text-sm hover:bg-neutral-50 transition-all"
            >
              Register
            </Link>
            
            {/* Sign In Button */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-white border-2 border-primary text-primary font-medium text-sm hover:bg-blue-50 transition-all"
            >
              Sign In
            </Link>
            
            {/* Contribute Button (Gold CTA) */}
            <Link
              to="/about"
              className="inline-flex items-center px-5 py-2 rounded-lg bg-secondary text-white font-semibold text-sm hover:bg-secondary-dark transition-all hover:scale-[1.02] shadow-sm"
            >
              Contribute
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-fg-muted hover:text-fg hover:bg-neutral-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={showMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-neutral-200 py-4 space-y-2">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.path} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-semibold text-fg">
                    {item.label}
                  </div>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => setShowMobileMenu(false)}
                      className="block pl-8 pr-4 py-2 text-sm text-fg-muted hover:text-fg hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={cx(
                    'block px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    location.pathname === item.path
                      ? 'text-primary bg-blue-50'
                      : 'text-fg-muted hover:text-fg hover:bg-neutral-50'
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
            
            <div className="flex flex-col gap-2 px-4 pt-4 border-t border-neutral-200">
              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
                className="text-center px-4 py-2 rounded-lg bg-white border-2 border-neutral-300 text-fg font-medium text-sm"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="text-center px-4 py-2 rounded-lg bg-white border-2 border-primary text-primary font-medium text-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
