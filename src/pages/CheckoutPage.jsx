import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Clock, MapPin, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { saveOrder } from '../lib/dataStore';
import { formatCurrency } from '../lib/formatters';
import { isValidEmail, isValidPhone } from '../lib/validation';
import { updatePageSEO } from '../lib/seo';

export const CheckoutPage = ({ cartItems = [], onClearCart, onNavigate }) => {
  useEffect(() => {
    updatePageSEO({ title: "Bestellen & Afrekenen | Grill Room Isis" });
  }, []);

  const [orderType, setOrderType] = useState('pickup'); // 'pickup' or 'delivery'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupTime: 'Zo snel mogelijk (ca. 25-30 min)',
    address: '',
    city: 'Sint-Truiden',
    postalCode: '3800',
    notes: '',
    paymentMethod: 'cash', // 'cash', 'bancontact'
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= siteConfig.ordering.freeDeliveryFrom ? 0 : siteConfig.ordering.deliveryFee) : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="section container text-center" style={{ padding: '6rem 0' }}>
        <h2>Uw winkelwagen is leeg</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Voeg eerst gerechten toe aan uw bestelling voordat u naar de kassa gaat.</p>
        <Button variant="accent" onClick={() => onNavigate('/menu')}>Naar het Menu</Button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Vul uw volledige naam in.";
    }
    if (!formData.phone || !isValidPhone(formData.phone)) {
      newErrors.phone = "Voer een geldig telefoonnummer in (bijv. 0471 23 45 67).";
    }
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in.";
    }
    if (orderType === 'delivery' && (!formData.address || formData.address.trim().length < 4)) {
      newErrors.address = "Straat en huisnummer zijn verplicht bij bezorging.";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "U dient akkoord te gaan met de voorwaarden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        orderType: orderType,
        pickupTime: formData.pickupTime,
        address: orderType === 'delivery' ? `${formData.address}, ${formData.postalCode} ${formData.city}` : '',
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedOptions: item.selectedOptions || {}
        }))
      };

      const savedOrder = await saveOrder(orderPayload);
      if (onClearCart) onClearCart();
      onNavigate(`/order-confirmation?orderId=${savedOrder.id}`);
    } catch (err) {
      console.error("Order submit error:", err);
      alert("Er is een fout opgetreden bij het plaatsen van uw bestelling. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section section-light">
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <button
            onClick={() => onNavigate('/cart')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', marginBottom: '1rem', fontWeight: '600' }}
          >
            <ArrowLeft size={16} /> Terug naar Winkelwagen
          </button>
          <h1 style={{ fontSize: '2.4rem', margin: 0 }}>Bestelling Afronden</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.35rem 0 0 0' }}>
            Vul uw contactgegevens in en kies uw gewenste afhaaltijdstip.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 items-start">
            
            {/* Left 2 Cols: Form Inputs */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Step 1: Order Type */}
              <Card hoverEffect={false}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--color-accent)', color: '#1A1715', width: '26px', height: '26px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>1</span>
                  Kies Leveringsmethode
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setOrderType('pickup')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: orderType === 'pickup' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      backgroundColor: orderType === 'pickup' ? 'var(--color-accent-light)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>
                      Afhalen in Restaurant
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                      {siteConfig.contact.address}, {siteConfig.contact.city}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: '600', marginTop: '0.5rem' }}>
                      Klaar in ca. {siteConfig.ordering.pickupEstimatedTime}
                    </div>
                  </div>

                  {siteConfig.ordering.delivery && (
                    <div
                      onClick={() => setOrderType('delivery')}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        border: orderType === 'delivery' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                        backgroundColor: orderType === 'delivery' ? 'var(--color-accent-light)' : 'var(--color-surface)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>
                        Thuisbezorging
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        In en rondom Sint-Truiden
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: '600', marginTop: '0.5rem' }}>
                        Bezorgkosten: {formatCurrency(siteConfig.ordering.deliveryFee)}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Step 2: Contact Info */}
              <Card hoverEffect={false}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--color-accent)', color: '#1A1715', width: '26px', height: '26px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>2</span>
                  Uw Gegevens
                </h3>

                <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Naam <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="bijv. Jan Peeters"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.name && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Telefoonnummer <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="bijv. 0471 23 45 67"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.phone && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.phone}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    E-mailadres (voor orderbevestiging)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="uw.email@domein.be"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.email && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                </div>

                {/* Pickup Time selection */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Gewenst tijdstip ({orderType === 'pickup' ? 'Afhaling' : 'Bezorging'})
                  </label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Zo snel mogelijk (ca. 25-30 min)">Zo snel mogelijk (ca. 25-30 min)</option>
                    <option value="Over 45 minuten">Over 45 minuten</option>
                    <option value="Over 1 uur">Over 1 uur</option>
                    <option value="Over 1,5 uur">Over 1,5 uur</option>
                    <option value="Over 2 uur">Over 2 uur</option>
                  </select>
                </div>

                {/* Delivery address if selected */}
                {orderType === 'delivery' && (
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Bezorgadres in Sint-Truiden</h4>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                        Straat en huisnummer <span style={{ color: 'var(--color-error)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="bijv. Tiensesteenweg 12"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                      />
                      {errors.address && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Postcode</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>Plaats</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes & Allergies */}
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Opmerkingen voor de keuken / Allergieën
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="bijv. Zonder ui, saus apart verpakken, allergisch voor noten..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-textarea"
                  />
                </div>
              </Card>

              {/* Step 3: Payment Method */}
              <Card hoverEffect={false}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--color-accent)', color: '#1A1715', width: '26px', height: '26px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>3</span>
                  Betaalmethode
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.paymentMethod === 'cash' ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: formData.paymentMethod === 'cash' ? 'var(--color-accent-light)' : 'var(--color-surface)',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Contant betalen bij afhaling</span>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)' }}>Gepast betalen in het restaurant</span>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.paymentMethod === 'bancontact' ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: formData.paymentMethod === 'bancontact' ? 'var(--color-accent-light)' : 'var(--color-surface)',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bancontact"
                      checked={formData.paymentMethod === 'bancontact'}
                      onChange={handleChange}
                    />
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Bancontact / Pin bij afhaling</span>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)' }}>Betaal met pinpas / contactloos aan de kassa</span>
                    </div>
                  </label>
                </div>
              </Card>

            </div>

            {/* Right 1 Col: Order Summary & Place Button */}
            <div>
              <Card hoverEffect={false} style={{ position: 'sticky', top: '90px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Overzicht Bestelling
                </h3>

                {/* Items brief */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', maxHeight: '220px', overflowY: 'auto' }}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <div>
                        <span style={{ fontWeight: '600' }}>{item.quantity}x</span> {item.name}
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                            {Object.values(item.selectedOptions).join(', ')}
                          </div>
                        )}
                      </div>
                      <span style={{ fontWeight: '600' }}>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotaal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Bezorgkosten:</span>
                      <span>{deliveryFee === 0 ? 'Gratis' : formatCurrency(deliveryFee)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-primary)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border)' }}>
                    <span>Totaal incl. BTW:</span>
                    <span style={{ color: 'var(--color-accent-dark)' }}>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-muted)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      style={{ marginTop: '3px' }}
                    />
                    <span>
                      Ik ga akkoord met de algemene voorwaarden van {siteConfig.companyName}.
                    </span>
                  </label>
                  {errors.agreeTerms && <p style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.agreeTerms}</p>}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={submitting}
                  icon={ArrowRight}
                  style={{ width: '100%' }}
                >
                  {submitting ? 'Bestelling Verwerken...' : 'Nu Bestelling Plaatsen'}
                </Button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--color-muted)', fontSize: '0.78rem' }}>
                  <ShieldCheck size={14} color="var(--color-success)" />
                  <span>Veilig en direct verzonden naar de keuken</span>
                </div>
              </Card>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

