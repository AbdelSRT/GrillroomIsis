import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { privacyPolicy, termsAndConditions } from '../content/legal';
import { updatePageSEO } from '../lib/seo';

export const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'terms') {
      setActiveTab('terms');
    }
    updatePageSEO({ title: "Juridische Informatie & Voorwaarden | Grill Room Isis" });
  }, []);

  return (
    <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '3.5rem' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Juridische Informatie</h1>
          <p style={{ color: 'var(--color-muted)' }}>Privacybeleid en Algemene Voorwaarden van Grill Room Isis</p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '0.6rem 1.25rem',
              fontWeight: '700',
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'privacy' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'privacy' ? '#ffffff' : 'var(--color-text)'
            }}
          >
            Privacybeleid
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '0.6rem 1.25rem',
              fontWeight: '700',
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'terms' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'terms' ? '#ffffff' : 'var(--color-text)'
            }}
          >
            Algemene Voorwaarden
          </button>
        </div>

        {/* Tab Content */}
        <Card hoverEffect={false} style={{ padding: '2.5rem' }}>
          {activeTab === 'privacy' ? (
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{privacyPolicy.title}</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Laatst bijgewerkt: {privacyPolicy.lastUpdated}</p>
              <div
                dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
                style={{ lineHeight: '1.8', color: 'var(--color-text)' }}
              />
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{termsAndConditions.title}</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Laatst bijgewerkt: {termsAndConditions.lastUpdated}</p>
              <div
                dangerouslySetInnerHTML={{ __html: termsAndConditions.content }}
                style={{ lineHeight: '1.8', color: 'var(--color-text)' }}
              />
            </div>
          )}
        </Card>

      </div>
    </div>
  );
};
