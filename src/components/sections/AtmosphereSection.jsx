import React from 'react';
import { siteContent } from '../../content/siteContent';

export const AtmosphereSection = ({ content = siteContent.atmosphere }) => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
      <div className="container">
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Beleving & Kwaliteit
          </span>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#ffffff' }}>
            {content.title}
          </h2>
          <p style={{ color: 'var(--color-muted-light)' }}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {content.images.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                height: '240px',
                border: '1px solid var(--color-border-dark)',
                boxShadow: 'var(--shadow-card)'
              }}
              className="gallery-item"
            >
              <img
                src={item.url}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26, 23, 21, 0.85) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem'
              }}>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.9rem' }}>
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

