import React from 'react';
import { ArrowRight, Flame, Utensils, Fish, Pizza, Salad, Smile, PlusCircle, Coffee } from 'lucide-react';
import { Card } from '../ui/Card';

const iconMap = {
  Flame: Flame,
  Utensils: Utensils,
  Fish: Fish,
  Pizza: Pizza,
  Salad: Salad,
  Smile: Smile,
  PlusCircle: PlusCircle,
  Coffee: Coffee
};

export const CategoriesSection = ({ categories, onNavigate }) => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="container">
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ontdek Onze Kaart
          </span>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            Menu Categorieën
          </h2>
          <p style={{ color: 'var(--color-muted)' }}>
            Van sappige lavasteengrills en goedgevulde schotels tot ovenverse pizza's en mediterrane tapas.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Utensils;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/menu/${cat.slug}`)}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem 1.25rem',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="category-card"
              >
                <div style={{
                  backgroundColor: 'var(--color-accent-light)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  border: '1px solid rgba(212, 154, 61, 0.25)'
                }}>
                  <Icon size={26} color="var(--color-accent-dark)" />
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                  {cat.name}
                </h3>
                
                <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '1rem', flex: 1, lineHeight: '1.4' }}>
                  {cat.description}
                </p>

                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--color-accent-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  Bekijk gerechten <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-accent) !important;
          box-shadow: var(--shadow-hover) !important;
        }
      `}</style>
    </section>
  );
};

