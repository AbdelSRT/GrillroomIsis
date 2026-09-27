import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { products } from '../content/products';
import { formatCurrency } from '../lib/formatters';
import { updatePageSEO } from '../lib/seo';
import { ShoppingCart } from 'lucide-react';

export const ProductsPage = ({ onAddToCart }) => {
  useEffect(() => {
    updatePageSEO({ title: "Producten", description: "Ontdek onze kwalitatieve producten in ons assortiment." });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <h1>Onze Producten</h1>
          <p style={{ color: 'var(--color-muted)' }}>Bekijk ons zorgvuldig geselecteerde aanbod</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <Card key={product.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}
              />
              <h3>{product.name}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                {product.shortDescription}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                  {formatCurrency(product.price)}
                </span>
                <Button size="sm" icon={ShoppingCart} onClick={() => onAddToCart(product)}>
                  Toevoegen
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
