import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getMenuItemById, getCategories, saveMenuItem } from '../../lib/dataStore';

export const AdminDishForm = ({ dishId = null, onNavigate }) => {
  const isEditing = Boolean(dishId && dishId !== 'new');

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: 'schotels',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ['[NOG IN TE VULLEN]'],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst"]
      }
    ]
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      const cats = await getCategories();
      setCategories(cats);
      if (cats.length > 0 && !isEditing) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
      }

      if (isEditing) {
        const item = await getMenuItemById(dishId);
        if (item) {
          setFormData({
            ...item,
            price: item.price.toString()
          });
        }
      }
    };

    init();
  }, [dishId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [
        ...prev.options,
        { name: "Nieuwe Keuze (bijv. Saus)", type: "select", required: true, choices: ["Keuze 1", "Keuze 2"] }
      ]
    }));
  };

  const handleOptionNameChange = (idx, newName) => {
    setFormData(prev => {
      const updated = [...prev.options];
      updated[idx].name = newName;
      return { ...prev, options: updated };
    });
  };

  const handleOptionChoicesChange = (idx, choicesString) => {
    const choices = choicesString.split(',').map(c => c.trim()).filter(Boolean);
    setFormData(prev => {
      const updated = [...prev.options];
      updated[idx].choices = choices;
      return { ...prev, options: updated };
    });
  };

  const handleRemoveOption = (idx) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Vul een naam voor het gerecht in.');
      return;
    }
    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Voer een geldige prijs in (bijv. 16.50).');
      return;
    }

    setSaving(true);
    try {
      await saveMenuItem({
        ...formData,
        id: isEditing ? dishId : undefined,
        price: parsedPrice
      });
      onNavigate('/admin/menu');
    } catch (err) {
      console.error("Save dish failed:", err);
      setError("Fout bij opslaan. Probeer het opnieuw.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <button
        onClick={() => onNavigate('/admin/menu')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', marginBottom: '1.5rem', fontWeight: '600' }}
      >
        <ArrowLeft size={16} /> Terug naar menuoverzicht
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>
          {isEditing ? `Gerecht Bewerken: ${formData.name || ''}` : 'Nieuw Gerecht Toevoegen'}
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
          Vul de gegevens in om het menu van {formData.name || 'het restaurant'} direct bij te werken.
        </p>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(182, 64, 64, 0.12)', border: '1px solid var(--color-error)', color: 'var(--color-error)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Basis Informatie */}
          <Card hoverEffect={false}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Basis Informatie</h3>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Naam van het Gerecht <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="bijv. Mix Grill Isis"
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Prijs (€) <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="number"
                  step="0.10"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="bijv. 18.50"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Categorie <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Beschrijving
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Geef een smakelijke omschrijving van de ingrediënten en bereiding..."
                className="form-textarea"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Afbeelding URL (Unsplash of CDN)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </Card>

          {/* Status & Labels */}
          <Card hoverEffect={false}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Eigenschappen & Dieetlabels</h3>

            <div className="grid grid-cols-3 gap-3">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
                <span>Beschikbaar voor bestelling</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                <span>Uitgelicht / Aanrader</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="spicy" checked={formData.spicy} onChange={handleChange} />
                <span>Pikant gerecht</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="vegetarian" checked={formData.vegetarian} onChange={handleChange} />
                <span>Vegetarisch</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="vegan" checked={formData.vegan} onChange={handleChange} />
                <span>Vegan</span>
              </label>
            </div>
          </Card>

          {/* Gerecht Opties (Sauzen, bijgerechten) */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Keuzemenu's & Opties</h3>
              <Button type="button" variant="outline" size="sm" icon={Plus} onClick={handleAddOption}>
                Optie Toevoegen
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.options.map((opt, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--color-background)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      value={opt.name}
                      onChange={(e) => handleOptionNameChange(idx, e.target.value)}
                      placeholder="Naam keuze (bijv. Sauskeuze)"
                      className="form-input"
                      style={{ maxWidth: '280px', fontWeight: '700' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      style={{ color: 'var(--color-error)', padding: '0.25rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                      Keuzes (gescheiden door komma's):
                    </label>
                    <input
                      type="text"
                      value={(opt.choices || []).join(', ')}
                      onChange={(e) => handleOptionChoicesChange(idx, e.target.value)}
                      placeholder="bijv. Looksaus, Andalouse, Sambal, Mayonaise"
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/admin/menu')}
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={saving}
              icon={Save}
            >
              {saving ? 'Opslaan...' : 'Gerecht Opslaan'}
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
};

