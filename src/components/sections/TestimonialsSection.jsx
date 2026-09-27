import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '../ui/Card';

export const TestimonialsSection = ({ testimonials = [] }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Wat Onze Klanten Zeggen</h2>
          <p style={{ color: 'var(--color-muted)' }}>Echte ervaringen van tevreden klanten</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {testimonials.map((item) => (
            <Card key={item.id} style={{ position: 'relative' }}>
              <Quote size={40} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: 'rgba(37, 99, 235, 0.1)' }} />
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text)', lineHeight: '1.6' }}>
                "{item.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.company}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
