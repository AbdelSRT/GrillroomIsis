import React from 'react';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { DishDetailPage } from '../pages/DishDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { FAQPage } from '../pages/FAQPage';
import { LegalPage } from '../pages/LegalPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Admin imports
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminMenuPage } from '../pages/admin/AdminMenuPage';
import { AdminDishForm } from '../pages/admin/AdminDishForm';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminSecurityPage } from '../pages/admin/AdminSecurityPage';

export const renderRoute = ({
  path,
  onNavigate,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  isAdminAuth,
  onAdminLogin,
  onAdminLogout
}) => {
  const cleanPath = path.split('?')[0].split('#')[0];

  // 1. Admin Routes Gate
  if (cleanPath.startsWith('/admin')) {
    if (!isAdminAuth) {
      return <AdminLogin onLoginSuccess={onAdminLogin} onNavigate={onNavigate} />;
    }

    let adminContent = <AdminOrdersPage onNavigate={onNavigate} />;

    if (cleanPath === '/admin/menu') {
      adminContent = <AdminMenuPage onNavigate={onNavigate} />;
    } else if (cleanPath === '/admin/menu/new') {
      adminContent = <AdminDishForm dishId="new" onNavigate={onNavigate} />;
    } else if (cleanPath.startsWith('/admin/menu/') && cleanPath.endsWith('/edit')) {
      const parts = cleanPath.split('/');
      const dishId = parts[3];
      adminContent = <AdminDishForm dishId={dishId} onNavigate={onNavigate} />;
    } else if (cleanPath === '/admin/categories') {
      adminContent = <AdminCategoriesPage onNavigate={onNavigate} />;
    } else if (cleanPath === '/admin/settings') {
      adminContent = <AdminSettingsPage onNavigate={onNavigate} />;
    } else if (cleanPath === '/admin/security') {
      adminContent = <AdminSecurityPage onNavigate={onNavigate} />;
    }

    return (
      <AdminLayout currentPath={cleanPath} onNavigate={onNavigate} onLogout={onAdminLogout}>
        {adminContent}
      </AdminLayout>
    );
  }

  // 2. Public Restaurant Routes
  switch (cleanPath) {
    case '/':
      return <HomePage onNavigate={onNavigate} onAddToCart={onAddToCart} />;
    
    case '/menu':
      return <MenuPage initialCategory="all" onAddToCart={onAddToCart} onNavigate={onNavigate} />;

    case '/cart':
      return (
        <CartPage
          cartItems={cartItems}
          onRemoveItem={onRemoveFromCart}
          onUpdateQuantity={onUpdateQuantity}
          onNavigate={onNavigate}
        />
      );

    case '/checkout':
      return (
        <CheckoutPage
          cartItems={cartItems}
          onClearCart={onClearCart}
          onNavigate={onNavigate}
        />
      );

    case '/order-confirmation':
      return <OrderConfirmationPage onNavigate={onNavigate} />;

    case '/about':
    case '/over-ons':
      return <AboutPage onNavigate={onNavigate} />;

    case '/contact':
      return <ContactPage />;

    case '/faq':
      return <FAQPage />;

    case '/privacy':
    case '/terms':
    case '/legal':
      return <LegalPage />;

    default:
      // Dynamic route matching for /menu/:category or /menu/:category/:slug
      if (cleanPath.startsWith('/menu/')) {
        const segments = cleanPath.replace('/menu/', '').split('/').filter(Boolean);
        if (segments.length === 1) {
          // /menu/:category
          return <MenuPage initialCategory={segments[0]} onAddToCart={onAddToCart} onNavigate={onNavigate} />;
        } else if (segments.length === 2) {
          // /menu/:category/:slug
          return <DishDetailPage slug={segments[1]} onAddToCart={onAddToCart} onNavigate={onNavigate} />;
        }
      }

      return <NotFoundPage onNavigate={onNavigate} />;
  }
};
