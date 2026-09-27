import React, { useState } from 'react';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Notification } from '../../components/ui/Notification';
import { submitQuoteForm } from '../../lib/api';

export const QuoteForm = () => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', budget: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await submitQuoteForm(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', company: '', email: '', phone: '', budget: '', description: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Er is een fout opgetreden bij de aanvraag." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Vrijblijvende Offerte Aanvragen</h3>
      {status && <Notification type={status.type} message={status.message} onClose={() => setStatus(null)} />}

      <FormField label="Naam" name="name" value={formData.name} onChange={handleChange} required placeholder="Uw naam" />
      <FormField label="Bedrijfsnaam (Optioneel)" name="company" value={formData.company} onChange={handleChange} placeholder="Uw bedrijfsnaam" />
      <FormField label="E-mailadres" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="uw@email.be" />
      <FormField label="Telefoonnummer" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+32 400 00 00 00" />
      <FormField label="Indicatief Budget" name="budget" type="select" options={['< €500', '€500 - €1.500', '€1.500 - €5.000', '> €5.000']} value={formData.budget} onChange={handleChange} />
      <FormField label="Project Omschrijving" name="description" type="textarea" rows={5} value={formData.description} onChange={handleChange} required placeholder="Beschrijf uw project of specifieke wensen..." />

      <Button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? "Aanvraag Verzenden..." : "Offerte Aanvragen"}
      </Button>
    </form>
  );
};
