import { initialMenuItems, menuCategories } from '../content/menu';
import { siteConfig } from '../config/siteConfig';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY_MENU = 'isis_menu_items_v1';
const STORAGE_KEY_CATEGORIES = 'isis_categories_v1';
const STORAGE_KEY_ORDERS = 'isis_orders_v1';
const STORAGE_KEY_SETTINGS = 'isis_settings_v1';

// Helper: generate a safe text ID (no UUIDs needed for our TEXT PK columns)
const generateId = (prefix = 'item') => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Initial orders for seed/demo
const initialOrders = [
  {
    id: "ORD-2026-001",
    customerName: "Jan Peeters",
    phone: "0471 23 45 67",
    email: "jan.peeters@example.be",
    orderType: "pickup",
    pickupTime: "18:45",
    address: "",
    notes: "Graag extra looksaus apart verpakken a.u.b.",
    paymentMethod: "cash",
    paymentStatus: "paid",
    status: "in bereiding",
    items: [
      {
        id: "dish-3",
        name: "Mix Grill Isis",
        price: 24.50,
        quantity: 1,
        selectedOptions: { "Bijgerecht": "Verse Belgische frietjes", "Saus 1": "Looksaus", "Saus 2 (Extra)": "Sambal (Pikant)" }
      },
      {
        id: "dish-16",
        name: "Coca-Cola (33cl)",
        price: 2.50,
        quantity: 2,
        selectedOptions: {}
      }
    ],
    subtotal: 29.50,
    deliveryFee: 0,
    total: 29.50,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  }
];

// Default extended settings
const defaultSettings = {
  pickup: true,
  delivery: true,
  pickupEstimatedTime: '20 - 30 min',
  deliveryEstimatedTime: '[NOG IN TE VULLEN]',
  minimumOrder: 15.00,
  deliveryFee: 2.50,
  freeDeliveryFrom: 35.00,
  openingHours: [{ days: 'Maandag - Zondag', hours: '11:00 - 22:00' }],
  deliveryPostcodes: ['3800'],
  vatRate: 6.00,
  smsNotifications: false,
  emailNotifications: false,
  notificationEmail: '',
  notificationPhone: '',
  restaurantPaused: false,
  pauseMessage: 'Wij zijn momenteel gesloten. Probeer het later opnieuw.',
  maxOrdersPerSlot: 0,
  orderConfirmationMessage: 'Bedankt voor uw bestelling! Uw eten wordt vers bereid.',
  mollieEnabled: false,
  cashEnabled: true,
  bancontactAtCounter: true
};

// Helper to initialize local storage
const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEY_MENU)) {
    localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(initialMenuItems));
  }
  if (!localStorage.getItem(STORAGE_KEY_CATEGORIES)) {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(menuCategories));
  }
  if (!localStorage.getItem(STORAGE_KEY_ORDERS)) {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(initialOrders));
  }
  if (!localStorage.getItem(STORAGE_KEY_SETTINGS)) {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(defaultSettings));
  }
};

initLocalStorage();

// ==================== DATABASE SEEDER ====================
export const seedDatabase = async (force = false) => {
  if (!isSupabaseConfigured()) {
    return { success: false, message: "Supabase is nog niet geconfigureerd in .env" };
  }

  try {
    // 1. Seed categories
    const { data: existingCats } = await supabase.from('categories').select('id');
    if (force || !existingCats || existingCats.length === 0) {
      const catRows = menuCategories.map((c, idx) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon || 'Utensils',
        sort_order: idx + 1
      }));
      const { error: catErr } = await supabase.from('categories').upsert(catRows, { onConflict: 'id' });
      if (catErr) {
        console.error("Seed categories error:", catErr);
        return { success: false, message: `Categorieën fout: ${catErr.message}` };
      }
    }

    // 2. Seed menu items
    const { data: existingDishes } = await supabase.from('menu_items').select('id');
    if (force || !existingDishes || existingDishes.length === 0) {
      const dishRows = initialMenuItems.map(d => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        description: d.description,
        price: d.price,
        category_id: d.categoryId,
        image_url: d.image,
        available: d.available !== false,
        featured: d.featured || false,
        spicy: d.spicy || false,
        vegetarian: d.vegetarian || false,
        vegan: d.vegan || false,
        allergens: d.allergens || [],
        options: d.options || [],
        sort_order: d.sortOrder || 1
      }));
      const { error: dishErr } = await supabase.from('menu_items').upsert(dishRows, { onConflict: 'id' });
      if (dishErr) {
        console.error("Seed menu_items error:", dishErr);
        return { success: false, message: `Menu items fout: ${dishErr.message}` };
      }
    }

    // 3. Seed settings
    const { data: existingSettings } = await supabase.from('restaurant_settings').select('id');
    if (force || !existingSettings || existingSettings.length === 0) {
      const { error: settingsErr } = await supabase.from('restaurant_settings').upsert([{
        id: 'general',
        pickup_enabled: defaultSettings.pickup,
        delivery_enabled: defaultSettings.delivery,
        pickup_time_estimate: defaultSettings.pickupEstimatedTime,
        delivery_time_estimate: defaultSettings.deliveryEstimatedTime,
        minimum_order: defaultSettings.minimumOrder,
        delivery_fee: defaultSettings.deliveryFee,
        free_delivery_from: defaultSettings.freeDeliveryFrom,
        opening_hours: defaultSettings.openingHours,
        delivery_postcodes: defaultSettings.deliveryPostcodes,
        vat_rate: defaultSettings.vatRate,
        restaurant_paused: false,
        mollie_enabled: false,
        cash_enabled: true,
        bancontact_at_counter: true
      }], { onConflict: 'id' });
      if (settingsErr) {
        console.error("Seed settings error:", settingsErr);
        return { success: false, message: `Instellingen fout: ${settingsErr.message}` };
      }
    }

    return { success: true, message: "Database succesvol gevuld met menu-items, categorieën en instellingen!" };
  } catch (err) {
    console.error("Seed database error:", err);
    return { success: false, message: err.message };
  }
};

// Auto-seed check on startup when Supabase is connected
if (typeof window !== 'undefined' && isSupabaseConfigured()) {
  seedDatabase(false);
}

// ==================== MENU ITEMS ====================
const mapDbDishToModel = (item) => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  description: item.description,
  price: parseFloat(item.price),
  categoryId: item.category_id,
  image: item.image_url || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  available: item.available ?? true,
  featured: item.featured ?? false,
  spicy: item.spicy ?? false,
  vegetarian: item.vegetarian ?? false,
  vegan: item.vegan ?? false,
  allergens: item.allergens || ["[NOG IN TE VULLEN]"],
  options: item.options || [],
  sortOrder: item.sort_order || 1
});

export const getMenuItems = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (!error && data) {
        if (data.length === 0) {
          await seedDatabase(true);
          const { data: seededData } = await supabase.from('menu_items').select('*').order('sort_order', { ascending: true });
          if (seededData && seededData.length > 0) {
            return seededData.map(mapDbDishToModel);
          }
        } else {
          return data.map(mapDbDishToModel);
        }
      }
      if (error) console.warn("Supabase getMenuItems error:", error);
    } catch (err) {
      console.warn("Supabase getMenuItems exception:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_MENU);
  return stored ? JSON.parse(stored) : initialMenuItems;
};

export const getMenuItemBySlug = async (slug) => {
  if (isSupabaseConfigured()) {
    try {
      // Only query by slug to avoid sending non-UUID strings to potential UUID columns
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) {
        return mapDbDishToModel(data);
      }
    } catch (err) {
      console.warn("Supabase getMenuItemBySlug error:", err);
    }
  }

  const items = await getMenuItems();
  return items.find(i => i.slug === slug || i.id === slug) || null;
};

export const getMenuItemById = async (id) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (!error && data) {
        return mapDbDishToModel(data);
      }
    } catch (err) {
      console.warn("Supabase getMenuItemById error:", err);
    }
  }

  const items = await getMenuItems();
  return items.find(i => i.id === id) || null;
};

export const saveMenuItem = async (item) => {
  const itemId = item.id || generateId('dish');
  const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

  if (isSupabaseConfigured()) {
    try {
      const dbPayload = {
        id: itemId,
        name: item.name,
        slug: slug,
        description: item.description,
        price: item.price,
        category_id: item.categoryId,
        image_url: item.image,
        available: item.available !== false,
        featured: item.featured || false,
        spicy: item.spicy || false,
        vegetarian: item.vegetarian || false,
        vegan: item.vegan || false,
        allergens: item.allergens || [],
        options: item.options || [],
        sort_order: item.sortOrder || 1,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('menu_items').upsert([dbPayload], { onConflict: 'id' });
      if (error) {
        console.error("Supabase upsert menu item error:", error);
      }
    } catch (err) {
      console.error("Supabase save item error:", err);
    }
  }

  // Local sync
  const stored = localStorage.getItem(STORAGE_KEY_MENU);
  const items = stored ? JSON.parse(stored) : [...initialMenuItems];
  const idx = items.findIndex(i => i.id === itemId);
  const savedModel = { ...item, id: itemId, slug };
  if (idx !== -1) {
    items[idx] = savedModel;
  } else {
    items.push(savedModel);
  }
  localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(items));
  return savedModel;
};

export const deleteMenuItem = async (id) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) console.error("Supabase delete dish error:", error);
    } catch (err) {
      console.error("Supabase delete failed", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_MENU);
  if (stored) {
    const items = JSON.parse(stored).filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(items));
  }
  return true;
};

// ==================== CATEGORIES ====================
export const getCategories = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (!error && data) {
        if (data.length === 0) {
          await seedDatabase(true);
          const { data: seededCats } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
          if (seededCats && seededCats.length > 0) return seededCats;
        } else {
          return data;
        }
      }
    } catch (err) {
      console.warn("Supabase getCategories error:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
  return stored ? JSON.parse(stored) : menuCategories;
};

export const saveCategories = async (categories) => {
  if (isSupabaseConfigured()) {
    try {
      const rows = categories.map((c, idx) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon || 'Utensils',
        sort_order: idx + 1
      }));
      await supabase.from('categories').upsert(rows, { onConflict: 'id' });
    } catch (err) {
      console.error("Supabase saveCategories error:", err);
    }
  }

  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  return true;
};

// ==================== ORDERS ====================
export const getOrders = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map(o => ({
          id: o.order_number || o.id,
          customerName: o.customer_name,
          phone: o.phone,
          email: o.email,
          orderType: o.order_type,
          pickupTime: o.pickup_time,
          address: o.delivery_address,
          notes: o.notes,
          paymentMethod: o.payment_method,
          paymentStatus: o.payment_status,
          paymentId: o.payment_id,
          status: o.status,
          subtotal: parseFloat(o.subtotal),
          deliveryFee: parseFloat(o.delivery_fee || 0),
          total: parseFloat(o.total),
          createdAt: o.created_at,
          items: (o.order_items || []).map(oi => ({
            id: oi.dish_id,
            name: oi.dish_name,
            price: parseFloat(oi.price),
            quantity: oi.quantity,
            selectedOptions: oi.options || {}
          }))
        }));
      }
    } catch (err) {
      console.warn("Supabase getOrders error:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
  return stored ? JSON.parse(stored) : initialOrders;
};

export const saveOrder = async (orderData) => {
  const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const orderId = orderNumber;

  const newOrder = {
    ...orderData,
    id: orderNumber,
    status: 'nieuw',
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const { error: orderErr } = await supabase.from('orders').insert([{
        id: orderId,
        order_number: orderNumber,
        customer_name: newOrder.customerName,
        phone: newOrder.phone,
        email: newOrder.email || '',
        order_type: newOrder.orderType,
        pickup_time: newOrder.pickupTime,
        delivery_address: newOrder.address || '',
        notes: newOrder.notes || '',
        payment_method: newOrder.paymentMethod,
        payment_status: newOrder.paymentMethod === 'online' ? 'pending' : 'pending',
        payment_id: newOrder.paymentId || null,
        status: 'nieuw',
        subtotal: newOrder.subtotal,
        delivery_fee: newOrder.deliveryFee || 0,
        total: newOrder.total,
        created_at: newOrder.createdAt
      }]);

      if (orderErr) {
        console.error("Supabase order insert error:", orderErr);
      }

      if (!orderErr && newOrder.items && newOrder.items.length > 0) {
        const itemsPayload = newOrder.items.map(item => ({
          order_id: orderId,
          dish_name: item.name,
          dish_id: String(item.id),
          price: item.price,
          quantity: item.quantity,
          options: item.selectedOptions || {}
        }));
        const { error: itemsErr } = await supabase.from('order_items').insert(itemsPayload);
        if (itemsErr) console.error("Supabase order_items insert error:", itemsErr);
      }
    } catch (err) {
      console.error("Supabase saveOrder exception:", err);
    }
  }

  // Local sync
  const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
  const orders = stored ? JSON.parse(stored) : [];
  const updated = [newOrder, ...orders];
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
  return newOrder;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .or(`order_number.eq.${orderId},id.eq.${orderId}`);
      if (error) console.error("Supabase updateOrderStatus error:", error);
    } catch (err) {
      console.error("Supabase updateOrderStatus exception:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
  if (stored) {
    const orders = JSON.parse(stored).map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }
  return true;
};

export const updateOrderPayment = async (orderId, paymentStatus, paymentId) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: paymentStatus,
          payment_id: paymentId || null,
          updated_at: new Date().toISOString()
        })
        .or(`order_number.eq.${orderId},id.eq.${orderId}`);
      if (error) console.error("Supabase updateOrderPayment error:", error);
    } catch (err) {
      console.error("Supabase updateOrderPayment exception:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
  if (stored) {
    const orders = JSON.parse(stored).map(o =>
      o.id === orderId ? { ...o, paymentStatus, paymentId } : o
    );
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }
  return true;
};

// ==================== SETTINGS ====================
export const getSettings = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('*')
        .eq('id', 'general')
        .maybeSingle();
      
      if (!error && data) {
        return {
          pickup: data.pickup_enabled ?? true,
          delivery: data.delivery_enabled ?? false,
          pickupEstimatedTime: data.pickup_time_estimate || '20 - 30 min',
          deliveryEstimatedTime: data.delivery_time_estimate || '[NOG IN TE VULLEN]',
          minimumOrder: parseFloat(data.minimum_order || 15.00),
          deliveryFee: parseFloat(data.delivery_fee || 2.50),
          freeDeliveryFrom: parseFloat(data.free_delivery_from || 35.00),
          openingHours: data.opening_hours || defaultSettings.openingHours,
          deliveryPostcodes: data.delivery_postcodes || ['3800'],
          vatRate: parseFloat(data.vat_rate || 6.00),
          smsNotifications: data.sms_notifications ?? false,
          emailNotifications: data.email_notifications ?? false,
          notificationEmail: data.notification_email || '',
          notificationPhone: data.notification_phone || '',
          restaurantPaused: data.restaurant_paused ?? false,
          pauseMessage: data.pause_message || defaultSettings.pauseMessage,
          maxOrdersPerSlot: data.max_orders_per_slot || 0,
          orderConfirmationMessage: data.order_confirmation_message || defaultSettings.orderConfirmationMessage,
          mollieEnabled: data.mollie_enabled ?? false,
          cashEnabled: data.cash_enabled ?? true,
          bancontactAtCounter: data.bancontact_at_counter ?? true
        };
      }
    } catch (err) {
      console.warn("Supabase getSettings error:", err);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (stored) {
    // Merge stored with defaults so new fields are always present
    return { ...defaultSettings, ...JSON.parse(stored) };
  }
  return defaultSettings;
};

export const saveSettings = async (settings) => {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload = {
        id: 'general',
        pickup_enabled: settings.pickup,
        delivery_enabled: settings.delivery,
        pickup_time_estimate: settings.pickupEstimatedTime,
        delivery_time_estimate: settings.deliveryEstimatedTime,
        minimum_order: settings.minimumOrder,
        delivery_fee: settings.deliveryFee,
        free_delivery_from: settings.freeDeliveryFrom,
        opening_hours: settings.openingHours,
        delivery_postcodes: settings.deliveryPostcodes,
        vat_rate: settings.vatRate,
        sms_notifications: settings.smsNotifications,
        email_notifications: settings.emailNotifications,
        notification_email: settings.notificationEmail,
        notification_phone: settings.notificationPhone,
        restaurant_paused: settings.restaurantPaused,
        pause_message: settings.pauseMessage,
        max_orders_per_slot: settings.maxOrdersPerSlot,
        order_confirmation_message: settings.orderConfirmationMessage,
        mollie_enabled: settings.mollieEnabled,
        cash_enabled: settings.cashEnabled,
        bancontact_at_counter: settings.bancontactAtCounter,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase.from('restaurant_settings').upsert([dbPayload], { onConflict: 'id' });
      if (error) console.error("Supabase saveSettings error:", error);
    } catch (err) {
      console.error("Supabase saveSettings exception:", err);
    }
  }

  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  return true;
};
