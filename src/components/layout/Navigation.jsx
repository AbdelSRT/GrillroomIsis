import React from 'react';
import { mainNavigation } from '../../content/navigation';
import { featureConfig } from '../../config/featureConfig';

export const Navigation = ({ currentPath, onNavigate }) => {
  const visibleLinks = mainNavigation.filter(item => {
    if (!item.featureFlag) return true;
    return featureConfig[item.featureFlag] === true;
  });

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    listStyle: 'none'
  };

  return (
    <nav aria-label="Hoofdnavigatie">
      <ul style={navStyle}>
        {visibleLinks.map((item, index) => {
          const isActive = currentPath === item.path;
          return (
            <li key={index}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                }}
                style={{
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  paddingBottom: '0.25rem',
                  fontSize: '0.95rem'
                }}
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
