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
      style={{
        background: 'linear-gradient(135deg, #0e3b33 0%, #12281d 50%, #0b1b13 100%)'
      }}
    >
      {/* Dotted Indonesia Map Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, #7bd389 2px, transparent 2px)`,
        backgroundSize: '20px 20px',
        maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200,300 Q250,250 300,280 L350,260 L400,290 L450,270 L500,300 L550,280 L600,310 L650,290 L700,320 Q750,340 800,300 L750,350 L700,380 L650,360 L600,390 L550,370 L500,400 L450,380 L400,410 L350,390 L300,420 Q250,380 200,350 Z M420,250 L470,240 L520,260 L470,280 Z M280,350 L320,340 L360,360 L320,380 Z' fill='white'/%3E%3C/svg%3E")`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200,300 Q250,250 300,280 L350,260 L400,290 L450,270 L500,300 L550,280 L600,310 L650,290 L700,320 Q750,340 800,300 L750,350 L700,380 L650,360 L600,390 L550,370 L500,400 L450,380 L400,410 L350,390 L300,420 Q250,380 200,350 Z M420,250 L470,240 L520,260 L470,280 Z M280,350 L320,340 L360,360 L320,380 Z' fill='white'/%3E%3C/svg%3E")`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center'
      }} />
      
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

