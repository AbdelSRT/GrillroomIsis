import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Laden...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
    <Loader2 size={36} className="spin" style={{ animation: 'spin 1s linear infinite', marginBottom: '0.75rem' }} />
    <p>{message}</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);
