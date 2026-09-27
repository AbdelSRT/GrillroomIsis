import React from 'react';
import { Card } from '../ui/Card';

export const ProcessSection = ({ content }) => {
  if (!content) return null;

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3.5rem', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Gemakkelijk Bestellen
          </span>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{content.title}</h2>
          <p style={{ color: 'var(--color-muted)' }}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {content.steps.map((step, idx) => (
            <Card key={idx} hoverEffect={false} style={{ textAlign: 'center', position: 'relative', borderTop: '3px solid var(--color-accent)' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--color-accent)',
                opacity: 0.25,
                marginBottom: '0.25rem',
                fontFamily: 'var(--font-heading)'
              }}>
                {step.step}
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: '700' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
