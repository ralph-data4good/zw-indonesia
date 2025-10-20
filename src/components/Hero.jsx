import { Link } from 'react-router-dom';
import { Map, BookOpen, Calculator } from 'lucide-react';
import { cx } from '../lib/utils';

export default function Hero({ title, subtitle, showLinks = true, backgroundImage, className }) {
  return (
    <section 
      className={cx(
        'relative py-24 md:py-32 lg:py-40 overflow-hidden',
        backgroundImage && 'gradient-overlay',
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {
        background: 'linear-gradient(135deg, #0e3b33 0%, #12281d 50%, #0b1b13 100%)'
      }}
    >
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cx(
            'text-balance mb-6',
            backgroundImage ? 'text-white' : 'text-white'
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={cx(
              'text-xl md:text-2xl mb-10 text-balance',
              backgroundImage ? 'text-white/90' : 'text-zwa-accent'
            )}>
              {subtitle}
            </p>
          )}
          
          {showLinks && (
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/map" 
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Map className="w-5 h-5" aria-hidden="true" />
                <span>Explore Map</span>
              </Link>
              <Link 
                to="/resources" 
                className="btn bg-white text-zwa-ink hover:bg-gray-100 inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" aria-hidden="true" />
                <span>Resource Library</span>
              </Link>
              <Link 
                to="/calculator" 
                className="btn btn-ghost border-white text-white hover:bg-white/10 inline-flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" aria-hidden="true" />
                <span>Calculator</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

