import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/formatters';
import { siteConfig } from '../../config/siteConfig';

export const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onNavigate }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 12, 10, 0.65)',
      backdropFilter: 'blur(3px)',
      zIndex: 1200,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease-out'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--color-surface)',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-dark)',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ backgroundColor: 'var(--color-accent-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
              <ShoppingBag size={22} color="var(--color-accent-dark)" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Uw Bestelling</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} geselecteerd
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Sluit winkelwagen"
            style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--color-muted)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items list */}
        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-secondary)', padding: '1.25rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <ShoppingBag size={36} color="var(--color-muted)" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Uw bestelling is nog leeg</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Kies uw favoriete grillgerechten en schotels uit ons menu.</p>
            <Button variant="accent" onClick={() => { onClose(); onNavigate('/menu'); }}>
              Bekijk Menukaart
            </Button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.25rem' }}>
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.9rem',
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.25rem 0', fontWeight: '600' }}>{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        style={{ color: 'var(--color-muted)', padding: '0.2rem' }}
                        aria-label="Verwijder item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Selected Options display */}
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                        {Object.entries(item.selectedOptions).map(([key, val]) => (
                          <div key={key}>• {key}: <strong>{val}</strong></div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-accent-dark)' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </span>

                      {/* Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '2px 4px' }}>
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          style={{ padding: '2px 6px', color: 'var(--color-primary)' }}
                          aria-label="Aantal verminderen"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          style={{ padding: '2px 6px', color: 'var(--color-primary)' }}
                          aria-label="Aantal vermeerderen"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Subtotal & Checkout */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                <span>Geschatte bereidingstijd:</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>{siteConfig.ordering.pickupEstimatedTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                <span>Totaal:</span>
                <span style={{ color: 'var(--color-accent-dark)' }}>{formatCurrency(total)}</span>
              </div>
              <Button
                variant="accent"
                size="lg"
                icon={ArrowRight}
                style={{ width: '100%' }}
                onClick={() => {
                  onClose();
                  onNavigate('/checkout');
                }}
              >
                Bestelling Afronden
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
