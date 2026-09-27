import React from 'react';

export const PageContainer = ({ children, className = '', style = {} }) => {
  return (
    <main style={{ flex: 1, ...style }} className={className}>
      {children}
    </main>
  );
};
