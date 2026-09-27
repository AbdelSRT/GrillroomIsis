import React from 'react';

export const Badge = ({ children, variant = 'accent', style = {}, icon: Icon = null }) => {
  const variants = {
    primary: { backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' },
    accent: { backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)', border: '1px solid rgba(212, 154, 61, 0.3)' },
    success: { backgroundColor: 'rgba(47, 125, 85, 0.12)', color: 'var(--color-success)', border: '1px solid rgba(47, 125, 85, 0.25)' },
    error: { backgroundColor: 'rgba(182, 64, 64, 0.12)', color: 'var(--color-error)', border: '1px solid rgba(182, 64, 64, 0.25)' },
    muted: { backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' },
    gold: { backgroundColor: 'var(--color-accent)', color: '#1A1715', fontWeight: '700' }
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.25rem 0.7rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.78rem',
    fontWeight: '600',
    letterSpacing: '0.02em',
    ...variants[variant],
    ...style
  };

  return (
    <span style={badgeStyle}>
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
};
