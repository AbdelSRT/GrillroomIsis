import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';

export const StickyCartBar = ({ cartItems = [], onOpenCart, onNavigate }) => {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (totalCount === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      zIndex: 900,
      maxWidth: '480px',
      margin: '0 auto',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <button
        onClick={onOpenCart}
        style={{
          width: '100%',
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          borderRadius: 'var(--radius-full)',
          padding: '0.9rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          border: '1.5px solid var(--color-accent)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: 'var(--color-accent)',
            color: '#1A1715',
            fontWeight: '700',
            fontSize: '0.85rem',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {totalCount}
          </div>
          <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Bekijk Bestelling</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: '700', color: 'var(--color-accent)', fontSize: '1.05rem' }}>
            {formatCurrency(totalPrice)}
          </span>
          <ArrowRight size={18} color="var(--color-accent)" />
        </div>
      </button>
    </div>
  );
};

