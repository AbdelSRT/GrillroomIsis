import React from 'react';
import { CheckCircle2, Flame } from 'lucide-react';
import { siteContent } from '../../content/siteContent';

export const IntroSection = ({ content = siteContent.intro }) => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container">
        <div className="grid grid-cols-2 gap-4 items-center">
          
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border)'
            }}>
              <img
                src={content.image}
                alt="Grill Room Isis sfeer"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
            
            {/* Small decorative badge */}
            <div style={{
              position: 'absolute',
              bottom: '-1rem',
              right: '1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-light)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-hover)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              border: '1px solid var(--color-accent)'
            }}>
              <Flame size={22} color="var(--color-accent)" />
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Echte Lavasteengrill</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)' }}>Ongeëvenaarde grillsmaak</div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Onze Passie
            </span>
            <h2 style={{ fontSize: '2.35rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              {content.title}
            </h2>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-muted)', marginBottom: '1.25rem', fontWeight: '500', lineHeight: '1.5' }}>
              {content.subtitle}
            </h4>
            <p style={{ color: 'var(--color-text)', marginBottom: '1.75rem', lineHeight: '1.7' }}>
              {content.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {content.bulletPoints.map((point, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="var(--color-accent-dark)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
