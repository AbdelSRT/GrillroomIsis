import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { siteConfig } from '../../config/siteConfig';
import { loginAdmin } from '../../lib/adminAuth';

export const AdminLogin = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vul uw gebruikersnaam en wachtwoord in.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await loginAdmin(username, password);

    setLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error || 'Ongeldige inloggegevens.');
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
            {siteConfig.companyName} — Voer uw beheerdersgegevens in.
          </p>

          {error && (
            <div style={{
              backgroundColor: 'rgba(182, 64, 64, 0.12)',
              border: '1px solid var(--color-error)',
              color: 'var(--color-error)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Gebruikersnaam
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="bijv. beheerder"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  autoComplete="username"
                  autoFocus
                />
                <User size={16} color="var(--color-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Wachtwoord
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="Voer uw wachtwoord in"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  autoComplete="current-password"
                />
                <Lock size={16} color="var(--color-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={loading}
              icon={loading ? Loader2 : ArrowRight}
              style={{ width: '100%', marginBottom: '1.25rem' }}
            >
              {loading ? 'Bezig met verifiëren...' : 'Veilig Inloggen'}
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
            Beveiligd met bcrypt-encryptie & brute-force vergrendeling
          </div>
        </Card>

      </div>
    </div>
  );
};
