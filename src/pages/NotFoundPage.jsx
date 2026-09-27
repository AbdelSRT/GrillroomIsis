import React, { useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../lib/seo';

export const NotFoundPage = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSEO({ title: "404 - Pagina Niet Gevonden", description: "De opgevraagde pagina bestaat niet." });
  }, []);

  return (
    <div className="section" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</h1>
        <h2>Pagina Niet Gevonden</h2>
        <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '1rem auto 2rem' }}>
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <Button size="lg" onClick={() => onNavigate('/')}>
          Terug Naar Home
        </Button>
      </div>
    </div>
  );
};
