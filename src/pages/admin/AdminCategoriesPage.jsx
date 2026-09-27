import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, Layers } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getCategories, saveCategories } from '../../lib/dataStore';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    load();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      id: slug,
      name: newCatName,
      slug: slug,
      description: newCatDesc,
      icon: "Utensils"
    };

    const updated = [...categories, newCat];
    setSaving(true);
    await saveCategories(updated);
    setCategories(updated);
    setNewCatName('');
    setNewCatDesc('');
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Weet u zeker dat u deze categorie wilt verwijderen?")) {
      const updated = categories.filter(c => c.id !== id && c.slug !== id);
      await saveCategories(updated);
      setCategories(updated);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Categorieën Beheren</h1>
        <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
          Beheer de secties van uw menukaart.
        </p>
      </div>

      {/* Add New Category Card */}
      <Card hoverEffect={false} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Nieuwe Categorie Toevoegen</h3>
        <form onSubmit={handleAddCategory}>
          <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Categorienaam <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="bijv. Tapas & Mezze"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Korte Beschrijving
              </label>
              <input
                type="text"
                placeholder="bijv. Koude en warme mediterrane hapjes"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <Button type="submit" variant="accent" size="sm" icon={Plus} disabled={saving}>
            Categorie Toevoegen
          </Button>
        </form>
      </Card>

      {/* Existing Categories List */}
      <Card hoverEffect={false}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Huidige Categorieën ({categories.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{cat.name}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                  Slug: <code>/menu/{cat.slug}</code> • {cat.description}
                </div>
              </div>
              <button
                onClick={() => handleDelete(cat.id)}
                style={{ color: 'var(--color-error)', padding: '0.35rem' }}
                title="Verwijder categorie"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

