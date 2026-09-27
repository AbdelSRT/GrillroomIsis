import React, { useState } from 'react';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Notification } from '../../components/ui/Notification';
import { validateContactForm } from '../../lib/validation';
import { submitContactForm } from '../../lib/api';

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const res = await submitContactForm(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Er ging iets mis bij het verzenden." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Stuur Ons Een Bericht</h3>

      {status && <Notification type={status.type} message={status.message} onClose={() => setStatus(null)} />}

      <FormField label="Volledige Naam" name="name" value={formData.name} onChange={handleChange} error={errors.name} required placeholder="Jan Peeters" />
      <FormField label="E-mailadres" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required placeholder="jan@voorbeeld.be" />
      <FormField label="Telefoonnummer" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+32 400 00 00 00" />
      <FormField label="Onderwerp" name="subject" value={formData.subject} onChange={handleChange} placeholder="Waar gaat uw vraag over?" />
      <FormField label="Bericht" name="message" type="textarea" rows={5} value={formData.message} onChange={handleChange} error={errors.message} required placeholder="Typ hier uw bericht..." />

      <Button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? "Verzenden..." : "Bericht Verzenden"}
      </Button>
    </form>
  );
};
