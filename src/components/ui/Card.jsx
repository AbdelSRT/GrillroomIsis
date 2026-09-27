import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  style = {},
  ...props
}) => {
  const cardStyle = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-card)',
    padding: '1.5rem',
    border: '1px solid var(--color-border)',
    transition: 'var(--transition)',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      style={cardStyle}
      className={`card ${hoverEffect ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
