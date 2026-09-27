import React, { useEffect } from 'react';
import { AppointmentForm } from '../features/appointments/AppointmentForm';
import { updatePageSEO } from '../lib/seo';

export const AppointmentPage = () => {
  useEffect(() => {
    updatePageSEO({ title: "Afspraak Maken", description: "Plan eenvoudig een afspraak in via onze online kalender." });
  }, []);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '650px' }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h1>Afspraak Maken</h1>
          <p style={{ color: 'var(--color-muted)' }}>Kies uw gewenste dienst, datum en tijdstip</p>
        </div>
        <AppointmentForm />
      </div>
    </div>
  );
};
