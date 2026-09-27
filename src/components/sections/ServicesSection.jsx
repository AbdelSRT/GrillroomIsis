import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Briefcase, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

export const ServicesSection = ({ services = [], onNavigate, limit }) => {
  const displayServices = limit ? services.slice(0, limit) : services;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Wrench': return <Wrench size={32} color="var(--color-primary)" />;
      case 'CheckCircle': return <CheckCircle size={32} color="var(--color-primary)" />;
      default: return <Briefcase size={32} color="var(--color-primary)" />;
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Onze Diensten</h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Wij bieden een breed scala aan diensten om aan uw verwachtingen te voldoen.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {displayServices.map((service) => (
            <Card key={service.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: '1rem' }}>
                {getIcon(service.icon)}
              </div>
              <h3>{service.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.925rem', marginBottom: '1.25rem', flex: 1 }}>
                {service.shortDescription}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontWeight: '700', color: 'var(--color-secondary)' }}>{service.price}</span>
                <Button variant="text" size="sm" onClick={() => onNavigate(`/diensten#${service.slug}`)} icon={ArrowRight}>
                  Lees Meer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
