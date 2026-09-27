import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatCurrency } from '../lib/formatters';
import { siteConfig } from '../config/siteConfig';
import { updatePageSEO } from '../lib/seo';

export const CartPage = ({ cartItems = [], onRemoveItem, onUpdateQuantity, onNavigate }) => {
  React.useEffect(() => {
    updatePageSEO({ title: "Winkelwagen | Bestelling Overzicht" });
  }, []);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="section container text-center" style={{ padding: '6rem 0' }}>
        <div style={{
          backgroundColor: 'var(--color-secondary)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <ShoppingBag size={40} color="var(--color-muted)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Uw winkelwagen is leeg</h2>
        <p style={{ color: 'var(--color-muted)', maxWidth: '450px', margin: '0 auto 2rem auto' }}>
          U heeft nog geen gerechten toegevoegd aan uw bestelling. Bekijk onze menukaart en kies uw favorieten.
        </p>
        <Button variant="accent" size="lg" onClick={() => onNavigate('/menu')}>
          Bekijk Menukaart
        </Button>
      </div>
    );
  }

  return (
    <div className="section section-light">
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', margin: 0 }}>Winkelwagen</h1>
            <p style={{ color: 'var(--color-muted)', margin: '0.35rem 0 0 0' }}>
              Controleer uw geselecteerde gerechten voordat u afrekent.
            </p>
          </div>
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => onNavigate('/menu')}>
            Verder Bestellen
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 items-start">
          
          {/* Cart items list (2 cols) */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item, index) => (
              <Card key={`${item.id}-${index}`} hoverEffect={false} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{item.name}</h3>
                    <button
                      onClick={() => onRemoveItem(index)}
                      style={{ color: 'var(--color-error)', padding: '0.25rem' }}
                      title="Verwijder item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                      {Object.entries(item.selectedOptions).map(([k, v]) => (
                        <span key={k} style={{ marginRight: '0.75rem' }}>• {k}: <strong>{v}</strong></span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-accent-dark)' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2px 6px' }}>
                      <button onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))} style={{ padding: '2px 6px' }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(index, item.quantity + 1)} style={{ padding: '2px 6px' }}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary Sidebar (1 col) */}
          <div>
            <Card hoverEffect={false} style={{ position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Overzicht</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                <span>Subtotaal ({cartItems.length} items):</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>{formatCurrency(total)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                <span>Geschatte bereidingstijd:</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>{siteConfig.ordering.pickupEstimatedTime}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                <span>Totaal:</span>
                <span style={{ color: 'var(--color-accent-dark)' }}>{formatCurrency(total)}</span>
              </div>

              <Button
                variant="accent"
                size="lg"
                icon={ArrowRight}
                style={{ width: '100%' }}
                onClick={() => onNavigate('/checkout')}
              >
                Doorgaan naar Kassa
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

