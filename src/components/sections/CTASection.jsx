import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/siteConfig';

export const CTASection = ({ content, onNavigate }) => {
  if (!content) return null;

  return (
    <section className="section" style={{
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212, 154, 61, 0.2) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ffffff' }}>
            {content.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-muted-light)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            {content.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="accent"
              size="lg"
              icon={ArrowRight}
              onClick={() => onNavigate(content.buttonLink || '/menu')}
            >
              {content.buttonText || "Bestel Nu Online"}
            </Button>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.85rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              <Phone size={18} color="var(--color-accent)" />
              Telefonisch Bestellen ({siteConfig.contact.phone})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
