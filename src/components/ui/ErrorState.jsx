import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ title = 'Er is een fout ingetreden', message = 'Kon de gewenste gegevens niet laden.', onRetry }) => (
  <div style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: '#fef2f2', borderRadius: 'var(--radius-md)', border: '1px solid #fecaca', color: '#991b1b' }}>
    <AlertTriangle size={48} style={{ marginBottom: '1rem' }} />
    <h3>{title}</h3>
    <p style={{ margin: '0.5rem 0 1.5rem' }}>{message}</p>
    {onRetry && <Button variant="secondary" onClick={onRetry}>Opnieuw Proberen</Button>}
  </div>
);
