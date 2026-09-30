import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ArrowRight, ShoppingBag, Utensils } from 'lucide-react';
import { CheckCircle2, Clock, MapPin, Phone, ArrowRight, ShoppingBag, Utensils, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { siteConfig } from '../config/siteConfig';
import { getOrders } from '../lib/dataStore';
import { getOrderById } from '../lib/dataStore';
import { formatCurrency, formatDate } from '../lib/formatters';
import { updatePageSEO } from '../lib/seo';

export const OrderConfirmationPage = ({ onNavigate }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageSEO({ title: "Bestelbevestiging | Grill Room Isis" });

    const loadOrder = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId');
      const rawOrderId = urlParams.get('orderId');

      const orders = await getOrders();
      if (orderId) {
        const found = orders.find(o => o.id === orderId);
      if (rawOrderId) {
        const found = await getOrderById(rawOrderId);
        if (found) {
          setOrder(found);
        } else if (orders.length > 0) {
          setOrder(orders[0]);
        }
      } else if (orders.length > 0) {
        setOrder(orders[0]);
      }
      setLoading(false);
    };

    loadOrder();
  }, []);

  if (loading) {
    return (
      <div className="section container text-center" style={{ padding: '6rem 0' }}>
        <p>Bestelgegevens ophalen...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
        <div className="container text-center" style={{ maxWidth: '600px' }}>
          <Card hoverEffect={false} style={{ padding: '3rem 2rem' }}>
            <AlertCircle size={48} color="var(--color-accent-dark)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Bestelling Niet Gevonden</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
              We konden geen actieve bestelling vinden met het opgegeven ordernummer. Heeft u vragen over uw bestelling? Neem dan gerust telefonisch contact met ons op via {siteConfig.contact.phone}.
            </p>
            <Button variant="accent" onClick={() => onNavigate('/')}>
              Terug naar Homepagina
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '3rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        
        {/* Success Banner Card */}
        <Card hoverEffect={false} style={{ textAlign: 'center', padding: '3rem 2rem', marginBottom: '2rem', borderTop: '4px solid var(--color-success)' }}>
          <div style={{
            backgroundColor: 'rgba(47, 125, 85, 0.12)',
            color: 'var(--color-success)',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <CheckCircle2 size={42} />
          </div>

          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Bedankt voor uw bestelling!
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
            Uw bestelling is succesvol ontvangen en wordt vers bereid in onze keuken.
          </p>

          {order && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--color-background)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              marginBottom: '1rem'
            }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>Ordernummer:</span>
              <strong style={{ color: 'var(--color-accent-dark)', fontSize: '1rem' }}>{order.id}</strong>
            </div>
          )}
        </Card>

        {/* Order Details & Pickup Info */}
        {order && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Status & Timing Box */}
            <Card hoverEffect={false} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '0.25rem' }}>
                    Status van uw bestelling
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', textTransform: 'capitalize', color: '#ffffff' }}>
                    {order.status === 'nieuw' ? 'In de keuken ontvangen' : order.status}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-light)', marginTop: '0.25rem' }}>
                    Klant: {order.customerName} ({order.phone})
                  </div>
                </div>

                <div style={{ textAlign: 'right', borderLeft: '1px solid var(--color-border-dark)', paddingLeft: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-light)', marginBottom: '0.25rem' }}>
                    Verwacht afhaaltijdstip
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-accent)' }}>
                    {order.pickupTime}
                  </div>
                </div>
              </div>
            </Card>

            {/* Restaurant Pickup Location Card */}
            <Card hoverEffect={false}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--color-accent)" />
                Afhaallocatie
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>{siteConfig.companyName}</p>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--color-muted)' }}>
                {siteConfig.contact.address}, {siteConfig.contact.postalCode} {siteConfig.contact.city}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Phone size={15} color="var(--color-accent)" />
                <span>Vragen over uw bestelling? Bel ons direct op: <strong>{siteConfig.contact.phone}</strong></span>
              </div>
            </Card>

            {/* Items Breakdown Card */}
            <Card hoverEffect={false}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                Overzicht Bestelde Items
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.25rem' }}>
                {(order.items || []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.92rem' }}>
                    <div>
                      <span style={{ fontWeight: '700' }}>{item.quantity}x</span> {item.name}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.15rem' }}>
                          {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                        </div>
                      )}
                    </div>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <div style={{ backgroundColor: 'var(--color-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <strong>Opmerking voor keuken:</strong> {order.notes}
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800' }}>
                <span>Totaal te voldoen ({order.paymentMethod === 'cash' ? 'Contant' : 'Bancontact'}):</span>
                <span style={{ color: 'var(--color-accent-dark)' }}>{formatCurrency(order.total)}</span>
              </div>
            </Card>

          </div>
        )}

        {/* Back to Home CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Button variant="outline" size="md" icon={ArrowRight} onClick={() => onNavigate('/')}>
            Terug naar Homepagina
          </Button>
        </div>

      </div>
    </div>
  );
};

