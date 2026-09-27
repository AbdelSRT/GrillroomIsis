import React, { useState, useEffect, useMemo } from 'react';
import { Search, Flame, Sparkles, Filter, ShoppingBag, Info } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DishModal } from '../features/menu/DishModal';
import { getMenuItems, getCategories } from '../lib/dataStore';
import { formatCurrency } from '../lib/formatters';
import { updatePageSEO } from '../lib/seo';

export const MenuPage = ({ initialCategory = 'all', onAddToCart, onNavigate }) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'vegetarian', 'spicy', 'featured'
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageSEO({
      title: "Menukaart & Online Bestellen",
      description: "Ontdek het volledige menu van Grill Room Isis in Sint-Truiden: schotels, lavasteengrills, broodjes, pizza's en meer. Bestel snel en eenvoudig online."
    });

    const load = async () => {
      setLoading(true);
      const items = await getMenuItems();
      const cats = await getCategories();
      setDishes(items);
      setCategories(cats);
      setLoading(false);
    };

    load();
  }, []);

  // Sync initialCategory prop if URL changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategorySelect = (catSlug) => {
    setActiveCategory(catSlug);
    if (catSlug === 'all') {
      onNavigate('/menu');
    } else {
      onNavigate(`/menu/${catSlug}`);
    }
  };

  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      // Availability check
      if (dish.available === false) return false;

      // Category match
      if (activeCategory !== 'all') {
        const cat = categories.find(c => c.slug === activeCategory || c.id === activeCategory);
        if (cat && dish.categoryId !== cat.id && dish.categoryId !== cat.slug) {
          return false;
        }
      }

      // Dietary filter
      if (dietaryFilter === 'vegetarian' && !dish.vegetarian && !dish.vegan) return false;
      if (dietaryFilter === 'spicy' && !dish.spicy) return false;
      if (dietaryFilter === 'featured' && !dish.featured) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      return true;
    });
  }, [dishes, categories, activeCategory, dietaryFilter, searchQuery]);

  return (
    <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '3rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="text-center" style={{ maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Onze Gerechten
          </span>
          <h1 style={{ fontSize: '2.75rem', marginTop: '0.4rem', marginBottom: '0.75rem' }}>
            Menukaart
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1rem' }}>
            Kies uit onze authentieke grillspecialiteiten, schotels, verse broodjes en pizza's.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          backgroundColor: 'var(--color-background)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <Search size={18} color="var(--color-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Zoek een gerecht of ingrediënt (bijv. Shoarma, Scampi, Falafel)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            {/* Dietary quick filter buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setDietaryFilter('all')}
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: dietaryFilter === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: dietaryFilter === 'all' ? '#ffffff' : 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }}
              >
                Alles
              </button>
              <button
                onClick={() => setDietaryFilter('featured')}
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: dietaryFilter === 'featured' ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: dietaryFilter === 'featured' ? '#1A1715' : 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Sparkles size={14} /> Aanraders
              </button>
              <button
                onClick={() => setDietaryFilter('vegetarian')}
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: dietaryFilter === 'vegetarian' ? 'var(--color-success)' : 'var(--color-surface)',
                  color: dietaryFilter === 'vegetarian' ? '#ffffff' : 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }}
              >
                Vegetarisch
              </button>
              <button
                onClick={() => setDietaryFilter('spicy')}
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: dietaryFilter === 'spicy' ? 'var(--color-error)' : 'var(--color-surface)',
                  color: dietaryFilter === 'spicy' ? '#ffffff' : 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Flame size={14} /> Pikant
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            scrollbarWidth: 'none'
          }}>
            <button
              onClick={() => handleCategorySelect('all')}
              style={{
                padding: '0.6rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                backgroundColor: activeCategory === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeCategory === 'all' ? 'var(--color-text-light)' : 'var(--color-text)',
                border: activeCategory === 'all' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              Alle Categorieën
            </button>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug || activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  style={{
                    padding: '0.6rem 1.15rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isActive ? 'var(--color-text-light)' : 'var(--color-text)',
                    border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-muted)' }}>
            Menukaart laden...
          </div>
        ) : filteredDishes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--color-border)'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Geen gerechten gevonden die voldoen aan uw zoekopdracht.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredDishes.map((dish) => (
              <Card
                key={dish.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '0',
                  overflow: 'hidden'
                }}
              >
                {/* Image & Badges */}
                <div style={{ position: 'relative', height: '200px', width: '100%', cursor: 'pointer' }} onClick={() => setSelectedDishForModal(dish)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {dish.featured && (
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <Badge variant="gold" icon={Sparkles}>Aanrader</Badge>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.35rem' }}>
                    {dish.spicy && <Badge variant="error" icon={Flame}>Pikant</Badge>}
                    {dish.vegetarian && <Badge variant="success">Veggie</Badge>}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDishForModal(dish)}
                  >
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontWeight: '700' }}>
                      {dish.name}
                    </h3>
                  </div>

                  <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', flex: 1, lineHeight: '1.5' }}>
                    {dish.description}
                  </p>

                  {/* Price & Action */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)'
                  }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-accent-dark)' }}>
                      {formatCurrency(dish.price)}
                    </span>
                    <Button
                      variant="accent"
                      size="sm"
                      icon={ShoppingBag}
                      onClick={() => setSelectedDishForModal(dish)}
                    >
                      Toevoegen
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>

      {/* Dish Customization Modal */}
      <DishModal
        dish={selectedDishForModal}
        isOpen={Boolean(selectedDishForModal)}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

