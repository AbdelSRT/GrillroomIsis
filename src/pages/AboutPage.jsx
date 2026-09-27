import React, { useEffect } from 'react';
import { Flame, Award, Heart, Users, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { updatePageSEO } from '../lib/seo';

export const AboutPage = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSEO({
      title: "Over Ons | Het Verhaal van Grill Room Isis",
      description: "Lees meer over Grill Room Isis in Sint-Truiden. Onze passie voor ambachtelijk lavasteengrill, kwaliteitsvlees en warme gastvrijheid."
    });
  }, []);

  return (
    <div className="section section-light" style={{ minHeight: '80vh', paddingTop: '3.5rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header */}
        <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{ color: 'var(--color-accent-dark)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ons Verhaal
          </span>
          <h1 style={{ fontSize: '2.85rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
            Over {siteConfig.companyName}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Sinds jaar en dag een vaste waarde in Sint-Truiden voor liefhebbers van authentiek gegrild vlees, sappige shoarma en mediterrane gastvrijheid.
          </p>
        </div>

        {/* Section 1: Passion & Story */}
        <div className="grid grid-cols-2 gap-4 items-center" style={{ marginBottom: '4.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              De Kunst van de Lavasteengrill
            </h2>
            <p style={{ color: 'var(--color-text)', lineHeight: '1.7', marginBottom: '1rem' }}>
              Bij <strong>{siteConfig.companyName}</strong> geloven we dat echt lekker eten begint met de beste basis. Daarom grillen wij onze vleesspecialiteiten op echte lavastenen. Door de intense en gelijkmatige hitte blijven vleessappen perfect behouden en ontstaat die kenmerkende, malse grillsmaak.
            </p>
            <p style={{ color: 'var(--color-text)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Of u nu kiest voor onze befaamde mix grill, een malse lamskotelet, huisbereide shoarma van de spies of een verse pizza: elk gerecht wordt met liefde en vakmanschap bereid.
            </p>
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
              alt="Grill Room Isis lavasteengrill"
              style={{ width: '100%', height: '360px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Core Values 3-Col Cards */}
        <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '4.5rem' }}>
          <Card hoverEffect={false} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-accent-light)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Flame size={26} color="var(--color-accent-dark)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Authentieke Smaak</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Klassieke familierecepten, uitgebalanceerde kruidenmelanges en ambachtelijke bereiding op de grill.
            </p>
          </Card>

          <Card hoverEffect={false} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-accent-light)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Award size={26} color="var(--color-accent-dark)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Dagverse Kwaliteit</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Dagelijks vers gesneden groenten, kwaliteitsvlees van betrouwbare leveranciers en huisgemaakte sauzen.
            </p>
          </Card>

          <Card hoverEffect={false} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-accent-light)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Heart size={26} color="var(--color-accent-dark)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Warme Gastvrijheid</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Een hartelijk welkom en een vlotte bediening, of u nu gezellig komt tafelen of een snelle afhaalmaaltijd bestelt.
            </p>
          </Card>
        </div>

        {/* CTA Banner */}
        <div style={{
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '1rem' }}>
            Kom onze specialiteiten zelf proeven
          </h2>
          <p style={{ color: 'var(--color-muted-light)', maxWidth: '560px', margin: '0 auto 2rem auto', fontSize: '1rem' }}>
            Gelegen aan de Naamsevest 4 in Sint-Truiden. Bestel eenvoudig online of loop binnen.
          </p>
          <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => onNavigate('/menu')}>
            Bekijk Onze Menukaart
          </Button>
        </div>

      </div>
    </div>
  );
};
