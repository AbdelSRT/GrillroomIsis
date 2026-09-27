import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Check, X, Sparkles, Flame, Eye, EyeOff } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getMenuItems, getCategories, deleteMenuItem, saveMenuItem } from '../../lib/dataStore';
import { formatCurrency } from '../../lib/formatters';

export const AdminMenuPage = ({ onNavigate }) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const items = await getMenuItems();
    const cats = await getCategories();
    setDishes(items);
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleAvailability = async (dish) => {
    const updated = { ...dish, available: !dish.available };
    await saveMenuItem(updated);
    setDishes(prev => prev.map(d => d.id === dish.id ? updated : d));
  };

  const handleToggleFeatured = async (dish) => {
    const updated = { ...dish, featured: !dish.featured };
    await saveMenuItem(updated);
    setDishes(prev => prev.map(d => d.id === dish.id ? updated : d));
  };

  const handleDelete = async (dish) => {
    if (window.confirm(`Weet u zeker dat u "${dish.name}" wilt verwijderen uit het menu?`)) {
      await deleteMenuItem(dish.id);
      setDishes(prev => prev.filter(d => d.id !== dish.id));
    }
  };

  const filtered = dishes.filter(d => {
    if (selectedCat !== 'all' && d.categoryId !== selectedCat) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Menukaart Beheren</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0 0 0' }}>
            Beheer prijzen, beschikbaarheid, opties en categorieën van al uw gerechten.
          </p>
        </div>
        <Button variant="accent" icon={Plus} onClick={() => onNavigate('/admin/menu/new')}>
          Nieuw Gerecht Toevoegen
        </Button>
      </div>

      {/* Filter Bar */}
      <Card hoverEffect={false} style={{ marginBottom: '1.75rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={18} color="var(--color-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Zoek gerechten..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          <div style={{ minWidth: '200px' }}>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="form-select"
            >
              <option value="all">Alle Categorieën</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Table of Dishes */}
      <Card hoverEffect={false} style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-muted)' }}>Laden...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-muted)' }}>Geen gerechten gevonden.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: '600' }}>Gerecht</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Categorie</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Prijs</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Uitgelicht</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: '600', textAlign: 'right' }}>Acties</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dish) => {
                  const cat = categories.find(c => c.id === dish.categoryId || c.slug === dish.categoryId);
                  return (
                    <tr key={dish.id} style={{ borderBottom: '1px solid var(--color-border)', opacity: dish.available ? 1 : 0.6 }}>
                      <td style={{ padding: '0.85rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={dish.image}
                            alt={dish.name}
                            style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', color: 'var(--color-text)' }}>{dish.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {dish.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', color: 'var(--color-muted)' }}>
                        {cat ? cat.name : dish.categoryId}
                      </td>

                      <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                        {formatCurrency(dish.price)}
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button
                          onClick={() => handleToggleAvailability(dish)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.3rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: dish.available ? 'rgba(47, 125, 85, 0.12)' : 'rgba(182, 64, 64, 0.12)',
                            color: dish.available ? 'var(--color-success)' : 'var(--color-error)'
                          }}
                        >
                          {dish.available ? <Eye size={13} /> : <EyeOff size={13} />}
                          {dish.available ? 'Beschikbaar' : 'Uitverkocht'}
                        </button>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button
                          onClick={() => handleToggleFeatured(dish)}
                          style={{
                            color: dish.featured ? 'var(--color-accent-dark)' : 'var(--color-border)',
                            padding: '0.25rem'
                          }}
                          title="Toggle aanrader"
                        >
                          <Sparkles size={18} fill={dish.featured ? 'var(--color-accent)' : 'none'} />
                        </button>
                      </td>

                      <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => onNavigate(`/admin/menu/${dish.id}/edit`)}
                            style={{
                              padding: '0.4rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--color-background)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-primary)'
                            }}
                            title="Bewerken"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(dish)}
                            style={{
                              padding: '0.4rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(182, 64, 64, 0.1)',
                              border: '1px solid rgba(182, 64, 64, 0.2)',
                              color: 'var(--color-error)'
                            }}
                            title="Verwijderen"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

