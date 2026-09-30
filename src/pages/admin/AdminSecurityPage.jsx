import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { changeAdminPassword, getAdminUsername } from '../../lib/adminAuth';

export const AdminSecurityPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const username = getAdminUsername();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!oldPassword) {
      setError('Vul uw huidige wachtwoord in.');
      return;
    }

    if (!newPassword || newPassword.length < 12) {
      setError('Het nieuwe wachtwoord moet minimaal 12 tekens bevatten.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Het nieuwe wachtwoord en de bevestiging komen niet overeen.');
      return;
    }

    if (oldPassword === newPassword) {
      setError('Het nieuwe wachtwoord moet anders zijn dan het huidige wachtwoord.');
      return;
    }

    setLoading(true);

    const result = await changeAdminPassword(oldPassword, newPassword);

    setLoading(false);

    if (result.success) {
      setSuccess('Uw wachtwoord is succesvol gewijzigd! Alle overige actieve sessies zijn beëindigd.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(result.error || 'Er is een fout opgetreden bij het wijzigen van het wachtwoord.');
    }
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Beveiliging & Wachtwoord</h1>
        <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
          Beheer het wachtwoord van het beheerderaccount (<strong>{username}</strong>).
        </p>
      </div>

      {success && (
        <div style={{
          backgroundColor: 'rgba(47, 125, 85, 0.12)',
          border: '1px solid var(--color-success)',
          color: 'var(--color-success)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600'
        }}>
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: 'rgba(182, 64, 64, 0.12)',
          border: '1px solid var(--color-error)',
          color: 'var(--color-error)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <Card hoverEffect={false}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <KeyRound size={22} color="var(--color-accent-dark)" />
          <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Wachtwoord Wijzigen</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Huidig Wachtwoord <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Voer uw huidige wachtwoord in"
                className="form-input"
                autoComplete="current-password"
                required
              />
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Nieuw Wachtwoord (minimaal 12 tekens) <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimaal 12 tekens..."
                className="form-input"
                autoComplete="new-password"
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                Gebruik een combinatie van letters, cijfers en speciale tekens voor optimale veiligheid.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Bevestig Nieuw Wachtwoord <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Herhaal het nieuwe wachtwoord"
                className="form-input"
                autoComplete="new-password"
                required
              />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={loading}
                icon={loading ? Loader2 : Lock}
              >
                {loading ? 'Bezig met wijzigen...' : 'Wachtwoord Opslaan'}
              </Button>
            </div>

          </div>
        </form>
      </Card>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-card-dark)', borderRadius: 'var(--radius-sm)', color: 'var(--color-muted-light)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <ShieldCheck size={18} color="var(--color-success)" />
        <span>
          Wachtwoorden worden veilig gehasht met bcrypt in de database. Na het wijzigen worden alle overige geopende sessies op andere apparaten direct ongeldig gemaakt.
        </span>
      </div>
    </div>
  );
};
