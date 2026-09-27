import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../lib/formatters';

export const FeaturedDishesSection = ({ dishes = [], onSelectDish, onNavigate }) => {
  const featured = dishes.filter(d => d.featured).slice(0, 4);

  return (
    <section className="section section-light">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Aanraders van de Chef
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', margin: 0 }}>
              Uitgelichte Specialiteiten
            </h2>
          </div>
          <Button variant="outline" size="sm" icon={ArrowRight} onClick={() => onNavigate('/menu')}>
            Volledig Menu Bekijken
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {featured.map((dish) => (
            <Card
              key={dish.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '0',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', height: '190px', width: '100%' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <Badge variant="gold" icon={Sparkles}>Populair</Badge>
                </div>
                {dish.spicy && (
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <Badge variant="error" icon={Flame}>Pikant</Badge>
                  </div>
                )}
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: '700' }}>
                  {dish.name}
                </h3>

                <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1, lineHeight: '1.5' }}>
                  {dish.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid var(--color-border)'
                }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-accent-dark)' }}>
                    {formatCurrency(dish.price)}
                  </span>
                  <Button
                    variant="accent"
                    size="sm"
                    icon={ShoppingBag}
                    onClick={() => onSelectDish(dish)}
                  >
                    Bestellen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

