import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'accent', 'secondary', 'outline', 'outline-accent', 'danger', 'text'
  size = 'md', // 'sm', 'md', 'lg'
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  icon: Icon = null,
  style = {},
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    borderRadius: 'var(--radius-sm)',
    transition: 'var(--transition)',
    textDecoration: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    letterSpacing: '0.01em'
  };

  const sizes = {
    sm: { padding: '0.45rem 0.9rem', fontSize: '0.85rem' },
    md: { padding: '0.7rem 1.4rem', fontSize: '0.95rem' },
    lg: { padding: '0.9rem 1.85rem', fontSize: '1.05rem' }
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-light)',
      border: '1px solid var(--color-border-dark)'
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: '#1A1715',
      boxShadow: '0 4px 12px rgba(212, 154, 61, 0.25)'
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-primary)'
    },
    'outline-accent': {
      backgroundColor: 'transparent',
      color: 'var(--color-accent)',
      border: '1.5px solid var(--color-accent)'
    },
    danger: {
      backgroundColor: 'var(--color-error)',
      color: '#ffffff'
    },
    text: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      padding: '0.4rem 0.6rem'
    }
  };

  const combinedStyle = {
    ...baseStyle,
    ...sizes[size],
    ...variants[variant],
    ...style
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={combinedStyle}
      className={className}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
      {children}
    </button>
  );
};
