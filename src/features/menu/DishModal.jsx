import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../lib/formatters';

export const DishModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initial = {};
    (dish.options || []).forEach(opt => {
      if (opt.choices && opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0];
      }
    });
    return initial;
  });

  const handleOptionChange = (optionName, choice) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choice
    }));
  };

  const handleConfirm = () => {
    onAddToCart({
      ...dish,
      selectedOptions
    }, quantity);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 12, 10, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-dark)',
        animation: 'fadeIn 0.25s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Dish Image */}
        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            aria-label="Sluiten"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>

          {dish.featured && (
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
              <Badge variant="gold" icon={Sparkles}>Aanrader van het Huis</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{dish.name}</h2>
            <span style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--color-accent-dark)' }}>
              {formatCurrency(dish.price)}
            </span>
          </div>

          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
            {dish.description}
          </p>

          {/* Dietary badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {dish.spicy && <Badge variant="error" icon={Flame}>Pikant</Badge>}
            {dish.vegetarian && <Badge variant="success">Vegetarisch</Badge>}
            {dish.vegan && <Badge variant="success">Vegan</Badge>}
          </div>

          {/* Options */}
          {dish.options && dish.options.length > 0 && (
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Maak uw keuze:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {dish.options.map((opt, idx) => (
                  <div key={idx}>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-primary)' }}>
                      {opt.name} {opt.required && <span style={{ color: 'var(--color-error)' }}>*</span>}
                    </label>
                    <select
                      className="form-select"
                      value={selectedOptions[opt.name] || ''}
                      onChange={(e) => handleOptionChange(opt.name, e.target.value)}
                    >
                      {opt.choices.map((choice, cIdx) => (
                        <option key={cIdx} value={choice}>{choice}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.25rem',
            gap: '1rem'
          }}>
            {/* Quantity Stepper */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden'
            }}>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: '0.65rem 0.9rem', color: 'var(--color-primary)' }}
                aria-label="Minder"
              >
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 0.75rem', fontWeight: '700', fontSize: '1rem', minWidth: '32px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: '0.65rem 0.9rem', color: 'var(--color-primary)' }}
                aria-label="Meer"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add Button */}
            <Button
              variant="accent"
              icon={ShoppingBag}
              onClick={handleConfirm}
              style={{ flex: 1 }}
            >
              Toevoegen • {formatCurrency(dish.price * quantity)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

