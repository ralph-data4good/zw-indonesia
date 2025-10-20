import { cx } from '../lib/utils';

export default function Section({ 
  eyebrow, 
  title, 
  description, 
  children, 
  className,
  centered = false,
  dark = false 
}) {
  return (
    <section className={cx(
      'py-16 md:py-20',
      dark ? 'bg-zwa-ink' : 'bg-white',
      className
    )}>
      <div className="container-custom">
        {(eyebrow || title || description) && (
          <div className={cx(
            'mb-12',
            centered && 'text-center max-w-3xl mx-auto'
          )}>
            {eyebrow && (
              <p className={cx(
                'text-sm font-semibold uppercase tracking-wider mb-3',
                dark ? 'text-zwa-accent' : 'text-zwa-primary'
              )}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={cx(
                'mb-4',
                dark ? 'text-white' : 'text-zwa-ink'
              )}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cx(
                'text-lg',
                dark ? 'text-zwa-muted' : 'text-gray-600'
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

