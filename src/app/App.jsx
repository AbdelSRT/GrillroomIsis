import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PageContainer } from '../components/layout/PageContainer';
import { CartDrawer } from '../features/cart/CartDrawer';
import { StickyCartBar } from '../features/order/StickyCartBar';
import { renderRoute } from './routes';
import { themeConfig } from '../config/themeConfig';

const CART_STORAGE_KEY = 'isis_cart_items_v1';

export const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('isis_admin_auth') === 'true';
  });

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Apply theme CSS variables dynamically
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeConfig.primaryColor);
    root.style.setProperty('--color-primary-hover', themeConfig.primaryHover);
    root.style.setProperty('--color-secondary', themeConfig.secondaryColor);
    root.style.setProperty('--color-accent', themeConfig.accentColor);
    root.style.setProperty('--color-accent-hover', themeConfig.accentHover);
    root.style.setProperty('--color-accent-dark', themeConfig.accentDark);
    root.style.setProperty('--color-background', themeConfig.backgroundColor);
    root.style.setProperty('--color-surface', themeConfig.surfaceColor);
    root.style.setProperty('--color-card-dark', themeConfig.cardDark);
    root.style.setProperty('--color-text', themeConfig.textColor);
    root.style.setProperty('--color-muted', themeConfig.mutedColor);
    root.style.setProperty('--color-border', themeConfig.borderColor);
    root.style.setProperty('--font-heading', themeConfig.headingFont);
    root.style.setProperty('--font-body', themeConfig.bodyFont);
    root.style.setProperty('--radius-sm', themeConfig.radiusSm);
    root.style.setProperty('--radius-md', themeConfig.radiusMd);
    root.style.setProperty('--radius-lg', themeConfig.radiusLg);
    root.style.setProperty('--container-width', themeConfig.containerWidth);
  }, []);

  // Handle back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (dish, quantity = 1) => {
    setCartItems(prev => {
      // Match by ID AND selected options
      const optKey = JSON.stringify(dish.selectedOptions || {});
      const existingIdx = prev.findIndex(item => item.id === dish.id && JSON.stringify(item.selectedOptions || {}) === optKey);
      
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...dish, quantity }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((item, i) => i === index ? { ...item, quantity: newQty } : item);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {}
  };

  const handleAdminLogin = () => {
    setIsAdminAuth(true);
    navigateTo('/admin/orders');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isis_admin_auth');
    setIsAdminAuth(false);
    navigateTo('/admin');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAdminView = currentPath.startsWith('/admin') && isAdminAuth;
  const isCheckoutView = currentPath === '/checkout' || currentPath === '/order-confirmation';

  return (
    <>
      {!isAdminView && (
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          cartItemCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
        />
      )}

      <PageContainer>
        {renderRoute({
          path: currentPath,
          onNavigate: navigateTo,
          cartItems,
          onAddToCart: handleAddToCart,
          onRemoveFromCart: handleRemoveFromCart,
          onUpdateQuantity: handleUpdateQuantity,
          onClearCart: handleClearCart,
          isAdminAuth,
          onAdminLogin: handleAdminLogin,
          onAdminLogout: handleAdminLogout
        })}
      </PageContainer>

      {!isAdminView && <Footer onNavigate={navigateTo} />}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onNavigate={navigateTo}
      />

      {/* Sticky Mobile Order Bar */}
      {!isAdminView && !isCheckoutView && !cartOpen && (
        <StickyCartBar
          cartItems={cartItems}
          onOpenCart={() => setCartOpen(true)}
          onNavigate={navigateTo}
        />
      )}
    </>
  );
};
