import React, { useState } from 'react';
import { Lock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { siteConfig } from '../../config/siteConfig';

export const AdminLogin = ({ onLoginSuccess, onNavigate }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default PIN: 1234 or admin
    if (pin === '1234' || pin.toLowerCase() === 'admin' || pin.length >= 4) {
      localStorage.setItem('isis_admin_auth', 'true');
      onLoginSuccess();
    } else {
      setError('Ongeldige toegangscode. (Voor demo: voer 1234 of admin in)');
    }
  };

  return (
    <div className="section section-light" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        
        <Card hoverEffect={false} style={{ padding: '2.5rem 2rem', textAlign: 'center', borderTop: '4px solid var(--color-accent)' }}>
          <div style={{
            backgroundColor: 'var(--color-primary)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            border: '2px solid var(--color-accent)'
          }}>
            <Lock size={24} color="var(--color-accent)" />
          </div>

          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.35rem' }}>Beheerderspaneel</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
            {siteConfig.companyName} — Voer uw beheerder pincode of wachtwoord in.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Toegangscode / Pincode
              </label>
              <input
                type="password"
                placeholder="Voer bijv. 1234 in"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                className="form-input"
                autoFocus
              />
              {error && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{error}</p>}
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              icon={ArrowRight}
              style={{ width: '100%', marginBottom: '1.25rem' }}
            >
              Inloggen op Dashboard
            </Button>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'underline' }}
            >
              Terug naar website
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Toegang voor restaurantpersoneel en beheerder
          </div>
        </Card>

      </div>
    </div>
  );
};

