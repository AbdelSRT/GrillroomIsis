import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Phone, MapPin, CheckCircle, AlertCircle, ShoppingBag, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getOrders, updateOrderStatus } from '../../lib/dataStore';
import { formatCurrency, formatDate } from '../../lib/formatters';

const STATUS_CONFIG = {
  'nieuw': { label: 'Nieuw', variant: 'gold', color: '#D49A3D' },
  'bevestigd': { label: 'Bevestigd', variant: 'accent', color: '#B87D26' },
  'in bereiding': { label: 'In Bereiding', variant: 'primary', color: '#2563eb' },
  'klaar voor afhaling': { label: 'Klaar voor Afhaling', variant: 'success', color: '#2F7D55' },
  'onderweg': { label: 'Onderweg (Bezorging)', variant: 'accent', color: '#8b5cf6' },
  'voltooid': { label: 'Voltooid', variant: 'muted', color: '#64748b' },
  'geannuleerd': { label: 'Geannuleerd', variant: 'error', color: '#B64040' }
};

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredOrders = orders.filter(o => {
    if (activeStatusFilter === 'all') return true;
    return o.status === activeStatusFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Bestellingen Beheren</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
            Live overzicht van inkomende bestellingen en keukenstatus.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchOrders}>
          Vernieuwen
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveStatusFilter('all')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: '600',
            backgroundColor: activeStatusFilter === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
            color: activeStatusFilter === 'all' ? '#ffffff' : 'var(--color-text)',
            border: '1px solid var(--color-border)'
          }}
        >
          Alle ({orders.length})
        </button>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = orders.filter(o => o.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveStatusFilter(key)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: activeStatusFilter === key ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeStatusFilter === key ? '#ffffff' : 'var(--color-text)',
                border: '1px solid var(--color-border)',
                whiteSpace: 'nowrap'
              }}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List & Details Drawer */}
      <div className="grid grid-cols-3 gap-4 items-start">
        
        {/* Left 2 Cols: Orders Table / Cards */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-muted)' }}>Bestellingen laden...</div>
          ) : filteredOrders.length === 0 ? (
            <Card hoverEffect={false} style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--color-muted)', margin: 0 }}>Geen bestellingen gevonden in deze categorie.</p>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['nieuw'];
              const isSelected = selectedOrder && selectedOrder.id === order.id;

              return (
                <Card
                  key={order.id}
                  hoverEffect={false}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-accent-light)' : 'var(--color-surface)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-primary)' }}>{order.id}</span>
                        <span style={{
                          backgroundColor: `${statusCfg.color}20`,
                          color: statusCfg.color,
                          fontWeight: '700',
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                        {order.customerName} • <a href={`tel:${order.phone}`} style={{ color: 'var(--color-accent-dark)' }}>{order.phone}</a>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-accent-dark)' }}>
                        {formatCurrency(order.total)}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', borderTop: '1px solid var(--color-border)', paddingTop: '0.65rem', marginBottom: '0.75rem' }}>
                    {order.items.map((i, idx) => (
                      <span key={idx} style={{ marginRight: '0.75rem' }}>
                        <strong>{i.quantity}x</strong> {i.name}
                      </span>
                    ))}
                  </div>

                  {/* Status quick changer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px dashed var(--color-border)', paddingTop: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                      <Clock size={14} /> Afhalen: <strong>{order.pickupTime}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Status wijzigen:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem', width: 'auto' }}
                      >
                        {Object.entries(STATUS_CONFIG).map(([k, cfg]) => (
                          <option key={k} value={k}>{cfg.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Right 1 Col: Selected Order Details */}
        <div>
          {selectedOrder ? (
            <Card hoverEffect={false} style={{ position: 'sticky', top: '90px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Order Details: {selectedOrder.id}</h3>
              </div>

              <div style={{ marginBottom: '1rem', fontSize: '0.88rem' }}>
                <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>{selectedOrder.customerName}</div>
                <div style={{ color: 'var(--color-muted)' }}>Tel: {selectedOrder.phone}</div>
                {selectedOrder.email && <div style={{ color: 'var(--color-muted)' }}>Email: {selectedOrder.email}</div>}
                {selectedOrder.address && <div style={{ color: 'var(--color-muted)', marginTop: '0.25rem' }}>Adres: {selectedOrder.address}</div>}
              </div>

              {selectedOrder.notes && (
                <div style={{ backgroundColor: 'var(--color-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <strong>Keukennotitie:</strong> {selectedOrder.notes}
                </div>
              )}

              {/* Items breakdown */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Gerechten:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {selectedOrder.items.map((i, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>{i.quantity}x</strong> {i.name}</span>
                        <span>{formatCurrency(i.price * i.quantity)}</span>
                      </div>
                      {i.selectedOptions && Object.keys(i.selectedOptions).length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                          {Object.entries(i.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800' }}>
                <span>Totaal:</span>
                <span style={{ color: 'var(--color-accent-dark)' }}>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </Card>
          ) : (
            <Card hoverEffect={false} style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--color-muted)' }}>
              <Eye size={32} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Selecteer een bestelling links om alle details te bekijken.</p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

