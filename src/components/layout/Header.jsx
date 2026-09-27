import React, { useState } from 'react';
import { Menu, ShoppingBag, Phone, Clock, Flame } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { featureConfig } from '../../config/featureConfig';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';

export const Header = ({ currentPath, onNavigate, cartItemCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const topBarStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text-light)',
    fontSize: '0.82rem',
    padding: '0.4rem 0',
    borderBottom: '1px solid var(--color-border-dark)'
  };

  const headerStyle = {
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-sm)'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '0.85rem',
    paddingBottom: '0.85rem'
  };

  return (
    <>
      {/* Top info bar */}
      <div style={topBarStyle}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={14} color="var(--color-accent)" />
              <strong>{siteConfig.companyName}</strong> — {siteConfig.contact.address}, {siteConfig.contact.city}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontWeight: '600' }}>
              <Phone size={13} />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>

      <header style={headerStyle}>
        <div className="container" style={containerStyle}>
          {/* Logo / Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: 'var(--color-primary)',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid var(--color-accent)'
            }}>
              <Flame size={22} color="var(--color-accent)" />
            </div>
            <div>
              <span style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', display: 'block', lineHeight: 1.1 }}>
                {siteConfig.companyName}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600' }}>
                Sint-Truiden
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: 'none' }} className="desktop-nav">
            <Navigation currentPath={currentPath} onNavigate={onNavigate} />
          </div>

          {/* Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Direct Menu / Order CTA for Desktop */}
            <div style={{ display: 'none' }} className="desktop-nav">
              <Button variant="accent" size="sm" onClick={() => onNavigate('/menu')}>
                Bekijk Menu & Bestel
              </Button>
            </div>

            {/* Cart Button */}
            {featureConfig.cart && (
              <button
                onClick={onOpenCart}
                aria-label="Winkelwagen openen"
                style={{
                  position: 'relative',
                  padding: '0.55rem 0.85rem',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--color-primary)',
                  fontWeight: '600',
                  fontSize: '0.88rem'
                }}
              >
                <ShoppingBag size={18} color="var(--color-accent-dark)" />
                <span className="cart-label" style={{ display: 'none' }}>Winkelwagen</span>
                {cartItemCount > 0 && (
                  <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#1A1715',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    borderRadius: '9999px',
                    padding: '2px 7px',
                    marginLeft: '0.2rem'
                  }}>
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{ padding: '0.5rem', color: 'var(--color-primary)' }}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />

        <style>{`
          @media (min-width: 850px) {
            .desktop-nav { display: block !important; }
            .cart-label { display: inline !important; }
            .mobile-menu-btn { display: none !important; }
          }
        `}</style>
      </header>
    </>
  );
};
