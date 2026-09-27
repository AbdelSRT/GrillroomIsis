import React, { useState } from 'react';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Notification } from '../../components/ui/Notification';
import { submitAppointmentForm } from '../../lib/api';
import { services } from '../../content/services';

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', serviceId: '', date: '', time: '', notes: '' });
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
      const res = await submitAppointmentForm(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', phone: '', serviceId: '', date: '', time: '', notes: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Er is een fout opgetreden." });
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = services.map(s => ({ value: s.id, label: `${s.title} (${s.price})` }));

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Afspraak Inplannen</h3>
      {status && <Notification type={status.type} message={status.message} onClose={() => setStatus(null)} />}

      <FormField label="Gekozen Dienst" name="serviceId" type="select" options={serviceOptions} value={formData.serviceId} onChange={handleChange} required />
      <FormField label="Naam" name="name" value={formData.name} onChange={handleChange} required placeholder="Uw naam" />
      <FormField label="E-mailadres" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="uw@email.be" />
      <FormField label="Telefoonnummer" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+32 400 00 00 00" />
      <FormField label="Voorkeursdatum" name="date" type="date" value={formData.date} onChange={handleChange} required />
      <FormField label="Voorkeurstijd" name="time" type="time" value={formData.time} onChange={handleChange} required />
      <FormField label="Extra Opmerkingen" name="notes" type="textarea" rows={3} value={formData.notes} onChange={handleChange} placeholder="Eventuele specifieke vragen..." />

      <Button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? "Inplannen..." : "Afspraak Bevestigen"}
      </Button>
    </form>
  );
};
