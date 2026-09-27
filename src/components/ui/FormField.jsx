import React from 'react';

export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options = [], // for select type
  rows = 4, // for textarea type
  ...props
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.25rem',
    textAlign: 'left'
  };

  const inputStyle = {
    padding: '0.65rem 0.85rem',
    borderRadius: 'var(--radius-sm)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'var(--transition)'
  };

  return (
    <div style={containerStyle}>
      <label htmlFor={name} style={{ fontWeight: '500', fontSize: '0.925rem', color: 'var(--color-text)' }}>
        {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          style={inputStyle}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={inputStyle}
          {...props}
        >
          <option value="">Selecteer een optie...</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={inputStyle}
          {...props}
        />
      )}

      {error && (
        <span style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};
