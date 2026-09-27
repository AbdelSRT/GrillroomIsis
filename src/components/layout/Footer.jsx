import React from 'react';
import { Phone, MapPin, Clock, Star, Flame, Lock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { footerNavigation } from '../../content/navigation';

export const Footer = ({ onNavigate }) => {
  const footerStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-muted-light)',
    paddingTop: '4.5rem',
    paddingBottom: '2.5rem',
    marginTop: 'auto',
    borderTop: '1px solid var(--color-border-dark)'
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '3.5rem' }}>
          
          {/* Col 1: Brand & Google Rating */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--color-card-dark)',
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-accent)'
              }}>
                <Flame size={18} color="var(--color-accent)" />
              </div>
              <h3 style={{ color: 'var(--color-text-light)', margin: 0, fontSize: '1.35rem', fontFamily: 'var(--font-heading)' }}>
                {siteConfig.companyName}
              </h3>
            </div>

            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-muted-light)' }}>
              {siteConfig.description}
            </p>

            {/* Google review summary badge */}
            <div style={{
              backgroundColor: 'var(--color-card-dark)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border-dark)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', color: '#F59E0B' }}>
                <Star size={16} fill="#F59E0B" />
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: '#ffffff' }}>{siteConfig.rating.score} / {siteConfig.rating.maxScore}</strong>
                <span style={{ color: 'var(--color-muted-light)', marginLeft: '0.35rem' }}>
                  ({siteConfig.rating.reviewCount} {siteConfig.rating.source})
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Restaurant Nav */}
          <div>
            <h4 style={{ color: 'var(--color-text-light)', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Menukaart</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              {footerNavigation.restaurant.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    style={{ color: 'var(--color-muted-light)' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Bestellen & Informatie */}
          <div>
            <h4 style={{ color: 'var(--color-text-light)', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Informatie</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              {footerNavigation.ordering.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    style={{ color: 'var(--color-muted-light)' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {footerNavigation.legal.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    style={{ color: 'var(--color-muted-light)' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Locatie */}
          <div>
            <h4 style={{ color: 'var(--color-text-light)', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Contact & Locatie</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{siteConfig.contact.address}, {siteConfig.contact.postalCode} {siteConfig.contact.city}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} style={{ color: 'var(--color-text-light)', fontWeight: '600' }}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Clock size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ display: 'block', color: 'var(--color-text-light)' }}>Openingsuren:</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-light)' }}>Zie contactpagina / [NOG IN TE VULLEN]</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Admin Link */}
        <div style={{
          borderTop: '1px solid var(--color-border-dark)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} {siteConfig.companyName}. Alle rechten voorbehouden.</p>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/admin');
            }}
            style={{
              color: 'var(--color-muted-light)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              opacity: 0.7
            }}
          >
            <Lock size={12} />
            Beheerder Inloggen
          </a>
        </div>
      </div>
    </footer>
  );
};
