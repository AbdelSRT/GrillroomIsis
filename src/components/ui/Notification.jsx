import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Notification = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const styles = {
    success: { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0', icon: CheckCircle },
    error: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca', icon: AlertCircle },
    info: { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe', icon: Info }
  };

  const current = styles[type] || styles.info;
  const IconComponent = current.icon;

  return (
    <div style={{
      backgroundColor: current.bg,
      color: current.color,
      border: `1px solid ${current.border}`,
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      fontWeight: '500'
    }}>
      <IconComponent size={20} />
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: current.color }}>
          &times;
        </button>
      )}
    </div>
  );
};
