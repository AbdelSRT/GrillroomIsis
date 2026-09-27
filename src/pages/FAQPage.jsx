import React, { useEffect } from 'react';
import { FAQSection } from '../components/sections/FAQSection';
import { faqs } from '../content/faqs';
import { updatePageSEO } from '../lib/seo';

export const FAQPage = () => {
  useEffect(() => {
    updatePageSEO({ title: "Veelgestelde Vragen", description: "Antwoorden op veelgestelde vragen over onze diensten en werkwijze." });
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <FAQSection faqs={faqs} />
    </div>
  );
};
