import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Flame, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getMenuItemBySlug } from '../lib/dataStore';
import { formatCurrency } from '../lib/formatters';
import { updatePageSEO } from '../lib/seo';

export const DishDetailPage = ({ slug, onAddToCart, onNavigate }) => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await getMenuItemBySlug(slug);
      if (item) {
        setDish(item);
        updatePageSEO({
          title: `${item.name} | Menu`,
          description: item.description
        });
        const initial = {};
        (item.options || []).forEach(opt => {
          if (opt.choices && opt.choices.length > 0) {
            initial[opt.name] = opt.choices[0];
          }
        });
        setSelectedOptions(initial);
      }
      setLoading(false);
    };

    if (slug) {
      load();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="section container text-center" style={{ padding: '6rem 0' }}>
        <p>Gerecht laden...</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="section container text-center" style={{ padding: '6rem 0' }}>
        <h2>Gerecht niet gevonden</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Het opgevraagde gerecht bestaat niet meer in ons menu.</p>
        <Button onClick={() => onNavigate('/menu')}>Terug naar het menu</Button>
      </div>
    );
  }

  const handleAdd = () => {
    onAddToCart({
      ...dish,
      selectedOptions
    }, quantity);
  };

  return (
    <div className="section section-light">
      <div className="container" style={{ maxWidth: '960px' }}>
        <button
          onClick={() => onNavigate('/menu')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-muted)',
            marginBottom: '2rem',
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={18} /> Terug naar Menukaart
        </button>

        <div className="grid grid-cols-2 gap-4 items-start">
          {/* Dish Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {dish.featured && <Badge variant="gold" icon={Sparkles}>Aanrader</Badge>}
              {dish.spicy && <Badge variant="error" icon={Flame}>Pikant</Badge>}
              {dish.vegetarian && <Badge variant="success">Vegetarisch</Badge>}
            </div>

            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{dish.name}</h1>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-accent-dark)', marginBottom: '1.25rem' }}>
              {formatCurrency(dish.price)}
            </div>

            <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              {dish.description}
            </p>

            {/* Options */}
            {dish.options && dish.options.length > 0 && (
              <div style={{ backgroundColor: 'var(--color-background)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Kies uw opties:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dish.options.map((opt, idx) => (
                    <div key={idx}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                        {opt.name}
                      </label>
                      <select
                        className="form-select"
                        value={selectedOptions[opt.name] || ''}
                        onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.name]: e.target.value }))}
                      >
                        {opt.choices.map((c, cIdx) => (
                          <option key={cIdx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ padding: '0.75rem 1rem' }}
                >-</button>
                <span style={{ padding: '0 0.5rem', fontWeight: '700' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ padding: '0.75rem 1rem' }}
                >+</button>
              </div>

              <Button
                variant="accent"
                size="lg"
                icon={ShoppingBag}
                onClick={handleAdd}
                style={{ flex: 1 }}
              >
                In Winkelwagen • {formatCurrency(dish.price * quantity)}
              </Button>
            </div>

            {/* Allergen note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
              <AlertCircle size={15} />
              <span>Heeft u een allergie? Geef dit aan bij uw bestelopmerking.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

