import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/map', label: 'Directory' },
    { path: '/resources', label: 'Resources' },
    { path: '/events', label: 'Events' },
    { path: '/calculator', label: 'Calculator' },
  ];

  return (
    <footer className="bg-header-bg text-white border-t border-primary-dark">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="Zero Waste Indonesia"
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Connecting communities, resources, and initiatives for a waste-free future in Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <p className="text-white/80 text-sm mb-4">
              Join the movement towards zero waste in Indonesia.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-2.5 rounded-lg bg-secondary text-white hover:bg-secondary-dark font-medium text-sm transition-all hover:scale-[1.02]"
            >
              Contribute
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Zero Waste Asia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
