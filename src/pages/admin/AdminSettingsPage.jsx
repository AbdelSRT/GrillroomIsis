import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Database, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getSettings, saveSettings, seedDatabase } from '../../lib/dataStore';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    pickup: true,
    delivery: true,
    pickupEstimatedTime: '20 - 30 min',
    deliveryEstimatedTime: '[NOG IN TE VULLEN]',
    minimumOrder: 15.00,
    deliveryFee: 2.50,
    freeDeliveryFrom: 35.00
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState(null);
  const supabaseActive = isSupabaseConfigured();

  useEffect(() => {
    const load = async () => {
      const data = await getSettings();
      setSettings(data);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await saveSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSeedDatabase = async () => {
    if (window.confirm("Wilt u alle standaard categorieën, menu-items en instellingen naar de Supabase database schrijven?")) {
      setSeeding(true);
      const res = await seedDatabase(true);
      setSeeding(false);
      setSeedMessage(res);
      setTimeout(() => setSeedMessage(null), 5000);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Restaurant & Bestelinstellingen</h1>
        <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
          Configureer afhaal- en bezorgopties, wachttijden en databaseverbinding.
        </p>
      </div>

      {saved && (
        <div style={{ backgroundColor: 'rgba(47, 125, 85, 0.12)', border: '1px solid var(--color-success)', color: 'var(--color-success)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
          <CheckCircle size={18} /> Instellingen succesvol opgeslagen!
        </div>
      )}

      {seedMessage && (
        <div style={{
          backgroundColor: seedMessage.success ? 'rgba(47, 125, 85, 0.12)' : 'rgba(182, 64, 64, 0.12)',
          border: seedMessage.success ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
          color: seedMessage.success ? 'var(--color-success)' : 'var(--color-error)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600'
        }}>
          {seedMessage.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {seedMessage.message}
        </div>
      )}

      {/* Database Connection Status Card */}
      <Card hoverEffect={false} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Database size={20} color="var(--color-accent-dark)" />
            <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Database Verbinding (Supabase)</h3>
          </div>
          {supabaseActive && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={RefreshCw}
              disabled={seeding}
              onClick={handleSeedDatabase}
            >
              {seeding ? 'Data Vullen...' : 'Initialiseer / Seed Database'}
            </Button>
          )}
        </div>

        <div style={{
          backgroundColor: supabaseActive ? 'rgba(47, 125, 85, 0.08)' : 'rgba(212, 154, 61, 0.08)',
          border: supabaseActive ? '1px solid var(--color-success)' : '1px solid var(--color-accent)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div style={{ fontWeight: '700', color: supabaseActive ? 'var(--color-success)' : 'var(--color-accent-dark)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {supabaseActive ? <CheckCircle size={16} /> : null}
            {supabaseActive ? 'Supabase Database Actief & Verbonden (Live Cloud Sync)' : '● Lokale Data Opslag Actief (LocalStorage Adapter)'}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, lineHeight: '1.5' }}>
            {supabaseActive
              ? 'Alle gerechten, categorieën, klantbestellingen en statusupdates worden direct realtime opgeslagen in uw Supabase cloud database.'
              : 'Om uw live Supabase database te activeren, voegt u VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY toe aan het .env bestand in de hoofdmap en start u de app.'}
          </p>
        </div>
      </Card>

      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Ordering Mode Settings */}
          <Card hoverEffect={false}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Bestelopties</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="pickup"
                  checked={settings.pickup}
                  onChange={handleChange}
                />
                <div>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Afhalen in het restaurant inschakelen</span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)' }}>Klanten kunnen bestellen en afhalen aan de Naamsevest 4.</span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="delivery"
                  checked={settings.delivery}
                  onChange={handleChange}
                />
                <div>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Thuisbezorging inschakelen</span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)' }}>Klanten kunnen bezorging in Sint-Truiden selecteren.</span>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Geschatte afhaaltijd
                </label>
                <input
                  type="text"
                  name="pickupEstimatedTime"
                  value={settings.pickupEstimatedTime}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Geschatte bezorgtijd
                </label>
                <input
                  type="text"
                  name="deliveryEstimatedTime"
                  value={settings.deliveryEstimatedTime}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Bezorgkosten (€)
                </label>
                <input
                  type="number"
                  step="0.50"
                  name="deliveryFee"
                  value={settings.deliveryFee}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Gratis bezorging vanaf (€)
                </label>
                <input
                  type="number"
                  step="1.00"
                  name="freeDeliveryFrom"
                  value={settings.freeDeliveryFrom}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </Card>

          <Button type="submit" variant="accent" size="lg" icon={Save} disabled={saving} style={{ alignSelf: 'flex-start' }}>
            {saving ? 'Opslaan...' : 'Instellingen Opslaan'}
          </Button>

        </div>
      </form>
    </div>
  );
};
