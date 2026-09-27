import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = 'Geen gegevens gevonden', description = 'Er zijn op dit moment geen items om weer te geven.' }) => (
  <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
    <Inbox size={48} style={{ color: 'var(--color-muted)', marginBottom: '1rem' }} />
    <h3>{title}</h3>
    <p style={{ color: 'var(--color-muted)', maxWidth: '400px', margin: '0.5rem auto 0' }}>{description}</p>
  </div>
);
