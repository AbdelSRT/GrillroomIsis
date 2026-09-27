import React from 'react';
import { ArrowRight, Flame, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { siteConfig } from '../../config/siteConfig';

export const HeroSection = ({ content, onNavigate }) => {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-light)',
      padding: '5.5rem 0 6rem 0',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212, 154, 61, 0.15) 0%, rgba(26, 23, 21, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid grid-cols-2 gap-4 items-center">
          
          {/* Text content */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Badge variant="gold" icon={Flame}>
                {content.badge || "Malse Specialiteiten & Authentieke Smaak"}
              </Badge>
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: '800',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              {content.headline}
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-muted-light)',
              marginBottom: '2rem',
              lineHeight: '1.65'
            }}>
              {content.subheadline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Button
                variant="accent"
                size="lg"
                icon={ArrowRight}
                onClick={() => onNavigate(content.primaryCta.link || '/menu')}
              >
                {content.primaryCta.text || "Bekijk Het Menu"}
              </Button>
              <Button
                variant="outline-accent"
                size="lg"
                onClick={() => onNavigate('/contact')}
              >
                Locatie & Contact
              </Button>
            </div>

            {/* USPs */}
            {content.uspList && (
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border-dark)',
                paddingTop: '1.5rem'
              }}>
                {content.uspList.map((usp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', color: 'var(--color-text-light)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" />
                    <span>{usp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hero Food Image Frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(212, 154, 61, 0.3)'
            }}>
              <img
                src={content.image}
                alt="Grill Room Isis specialiteiten"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26, 23, 21, 0.85) 0%, transparent 60%)'
              }} />
              
              {/* Floating review/info pill */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(26, 23, 21, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--color-accent)', padding: '0.5rem', borderRadius: '50%', color: '#1A1715' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>Afhalen: ca. {siteConfig.ordering.pickupEstimatedTime}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-light)' }}>Vers & gloeiend heet bereid</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: '700' }}>★ {siteConfig.rating.score}/5</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-light)' }}>Google Reviews</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
