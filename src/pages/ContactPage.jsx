import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { updatePageSEO } from '../lib/seo';
import { isValidEmail, isValidPhone } from '../lib/validation';

export const ContactPage = () => {
  useEffect(() => {
    updatePageSEO({
      title: "Contact, Locatie & Openingsuren | Grill Room Isis Sint-Truiden",
      description: "Contacteer Grill Room Isis in Sint-Truiden. Adres: Naamsevest 4, 3800 Sint-Truiden. Telefoon: 011 67 42 78. Bekijk onze locatie en openingsuren."
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Vul uw naam in.";
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = "Voer een geldig e-mailadres in.";
    if (!formData.message.trim() || formData.message.trim().length < 10) newErrors.message = "Bericht moet minimaal 10 tekens bevatten.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 800);
  };

  return (
    <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '3.5rem' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Header */}
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Bereikbaarheid
          </span>
          <h1 style={{ fontSize: '2.75rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            Contact & Locatie
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem' }}>
            Heeft u een vraag of wilt u telefonisch bestellen? Wij staan graag voor u klaar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-start" style={{ marginBottom: '3.5rem' }}>
          
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Quick Contact Card */}
            <Card hoverEffect={false}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Direct Contact</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-light)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-dark)' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0' }}>Ons Adres</h4>
                    <p style={{ color: 'var(--color-muted)', margin: 0, fontSize: '0.95rem' }}>
                      {siteConfig.companyName}<br />
                      {siteConfig.contact.address}<br />
                      {siteConfig.contact.postalCode} {siteConfig.contact.city}, België
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-light)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-dark)' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0' }}>Telefoonnummer</h4>
                    <p style={{ margin: '0 0 0.25rem 0' }}>
                      <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                        {siteConfig.contact.phone}
                      </a>
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Bereikbaar tijdens openingsuren</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Opening Hours Card */}
            <Card hoverEffect={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Clock size={20} color="var(--color-accent-dark)" />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Openingsuren</h3>
              </div>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Kom gezellig langs of bestel voor afhaling tijdens onze openingsuren:
              </p>
              
              <div style={{
                backgroundColor: 'var(--color-background)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.95rem'
              }}>
                <span style={{ fontWeight: '600' }}>Maandag - Zondag:</span>
                <span style={{ color: 'var(--color-muted)' }}>[NOG IN TE VULLEN]</span>
              </div>
            </Card>

          </div>

          {/* Contact Form Side */}
          <Card hoverEffect={false}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Stuur ons een Bericht</h3>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(47, 125, 85, 0.1)',
                border: '1px solid var(--color-success)',
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={36} color="var(--color-success)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>Bericht succesvol verzonden!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Nog een bericht sturen
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Uw Naam <span style={{ color: 'var(--color-error)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="bijv. Jan Peeters"
                    className="form-input"
                  />
                  {errors.name && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      E-mailadres <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="naam@email.be"
                      className="form-input"
                    />
                    {errors.email && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Telefoon (optioneel)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0471 23 45 67"
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Uw Bericht <span style={{ color: 'var(--color-error)' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Stel uw vraag of geef uw opmerking door..."
                    className="form-textarea"
                  />
                  {errors.message && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={loading}
                  icon={Send}
                  style={{ width: '100%' }}
                >
                  {loading ? 'Verzenden...' : 'Bericht Versturen'}
                </Button>
              </form>
            )}
          </Card>

        </div>

        {/* Map / Route Embed Box */}
        <div style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Locatie in Sint-Truiden</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Gemakkelijk bereikbaar aan de Naamsevest 4 in het centrum van Sint-Truiden.
          </p>
          
          <div style={{
            height: '320px',
            backgroundColor: 'var(--color-secondary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <MapPin size={42} color="var(--color-accent-dark)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Grill Room Isis</h4>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Naamsevest 4, 3800 Sint-Truiden
            </p>
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Open Route in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
