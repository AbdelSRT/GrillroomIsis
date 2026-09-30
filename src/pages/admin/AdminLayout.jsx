import React from 'react';
import { UtensilsCrossed, ClipboardList, Layers, Settings, LogOut, ExternalLink, Flame, KeyRound } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const AdminLayout = ({ currentPath, onNavigate, onLogout, children }) => {
  const navItems = [
    { label: "Bestellingen", path: "/admin/orders", icon: ClipboardList },
    { label: "Menukaart Beheren", path: "/admin/menu", icon: UtensilsCrossed },
    { label: "Categorieën", path: "/admin/categories", icon: Layers },
    { label: "Instellingen", path: "/admin/settings", icon: Settings },
    { label: "Wachtwoord & Beveiliging", path: "/admin/security", icon: KeyRound }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: 'var(--color-secondary)' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--color-primary)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--color-border-dark)',
        flexShrink: 0
      }}>
        {/* Admin Brand */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid var(--color-border-dark)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ backgroundColor: 'var(--color-accent)', width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1715' }}>
              <Flame size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', display: 'block', lineHeight: 1.1 }}>
                Isis Beheer
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '1.25rem 0.75rem', flex: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path === '/admin/orders' && currentPath === '/admin');
              return (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive ? 'var(--color-card-dark)' : 'transparent',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-muted-light)',
                      fontWeight: isActive ? '700' : '500',
                      borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
                      textAlign: 'left',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer actions */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => onNavigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-muted-light)',
              fontSize: '0.85rem',
              padding: '0.5rem 0.75rem'
            }}
          >
            <ExternalLink size={15} />
            Naar Live Website
          </button>
          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-error)',
              fontSize: '0.85rem',
              padding: '0.5rem 0.75rem'
            }}
          >
            <LogOut size={15} />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  );
};

