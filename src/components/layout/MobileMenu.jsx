import React from 'react';
import { X, Flame, Phone } from 'lucide-react';
import { mainNavigation } from '../../content/navigation';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Button';

export const MobileMenu = ({ isOpen, onClose, currentPath, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--color-surface)',
      zIndex: 999,
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            backgroundColor: 'var(--color-primary)',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid var(--color-accent)'
          }}>
            <Flame size={20} color="var(--color-accent)" />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>{siteConfig.companyName}</h3>
        </div>
        <button onClick={onClose} aria-label="Sluit menu" style={{ padding: '0.5rem', color: 'var(--color-primary)' }}>
          <X size={26} />
        </button>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
        {mainNavigation.map((item, index) => {
          const isActive = currentPath === item.path;
          return (
            <li key={index}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                  onClose();
                }}
                style={{
                  fontSize: '1.3rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-accent-dark)' : 'var(--color-primary)',
                  display: 'block'
                }}
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button
          variant="accent"
          size="lg"
          style={{ width: '100%' }}
          onClick={() => {
            onNavigate('/menu');
            onClose();
          }}
        >
          Bekijk Menu & Bestel
        </Button>

        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontWeight: '600',
            fontSize: '0.95rem',
            textDecoration: 'none'
          }}
        >
          <Phone size={16} color="var(--color-accent-dark)" />
          Bel Restaurant ({siteConfig.contact.phone})
        </a>
      </div>
    </div>
  );
};
