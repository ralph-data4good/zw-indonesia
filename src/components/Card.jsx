import { cx } from '../lib/utils';

export default function Card({ 
  children, 
  className, 
  dark = false,
  interactive = true,
  href,
  onClick 
}) {
  const baseClasses = cx(
    dark ? 'card-dark' : 'card',
    interactive && 'cursor-pointer hover:border-zwa-primary',
    className
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className={cx(baseClasses, 'w-full text-left')}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

