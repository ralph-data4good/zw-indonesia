import { cx } from '../lib/utils';

export default function Section({
  children,
  className = '',
  eyebrow = '',
  title = '',
  description = '',
  centered = false,
  dark = false,
}) {
  return (
    <section className={cx(
      'section',
      dark ? 'bg-header-bg text-white' : 'bg-bg',
      className
    )}>
      <div className="container-custom">
        {(eyebrow || title || description) && (
          <div className={cx(
            'mb-12',
            centered ? 'text-center max-w-3xl mx-auto' : ''
          )}>
            {eyebrow && (
              <div className={cx(
                'text-sm font-semibold uppercase tracking-wider mb-3',
                dark ? 'text-secondary' : 'text-primary'
              )}>
                {eyebrow}
              </div>
            )}
            
            {title && (
              <h2 className={cx(
                'text-h2 font-bold mb-4',
                dark ? 'text-white' : 'text-fg'
              )}>
                {title}
              </h2>
            )}
            
            {description && (
              <p className={cx(
                'text-lg leading-relaxed',
                dark ? 'text-white/80' : 'text-fg-muted'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}
