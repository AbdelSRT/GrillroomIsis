import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/Card';

export const FAQSection = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="section section-light">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Veelgestelde Vragen</h2>
          <p style={{ color: 'var(--color-muted)' }}>Vind snel antwoord op uw vragen</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                hoverEffect={false}
                style={{ cursor: 'pointer', padding: '1.25rem' }}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{faq.question}</h4>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'var(--transition)'
                    }}
                  />
                </div>
                {isOpen && (
                  <p style={{ marginTop: '1rem', color: 'var(--color-muted)', lineHeight: '1.6' }}>
                    {faq.answer}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
