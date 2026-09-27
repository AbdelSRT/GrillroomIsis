import React, { useEffect } from 'react';
import { QuoteForm } from '../features/quotes/QuoteForm';
import { updatePageSEO } from '../lib/seo';

export const QuotePage = () => {
  useEffect(() => {
    updatePageSEO({ title: "Offerte Aanvragen", description: "Vraag geheel vrijblijvend een offerte op maat aan voor uw project." });
  }, []);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '650px' }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h1>Offerte Aanvragen</h1>
          <p style={{ color: 'var(--color-muted)' }}>Vul uw gegevens en projectdetails in voor een voorstel op maat</p>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
};
