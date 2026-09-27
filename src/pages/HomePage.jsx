import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { IntroSection } from '../components/sections/IntroSection';
import { CategoriesSection } from '../components/sections/CategoriesSection';
import { FeaturedDishesSection } from '../components/sections/FeaturedDishesSection';
import { AtmosphereSection } from '../components/sections/AtmosphereSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { FAQSection } from '../components/sections/FAQSection';
import { CTASection } from '../components/sections/CTASection';
import { DishModal } from '../features/menu/DishModal';
import { siteContent } from '../content/siteContent';
import { faqs } from '../content/faqs';
import { getMenuItems, getCategories } from '../lib/dataStore';
import { updatePageSEO } from '../lib/seo';

export const HomePage = ({ onNavigate, onAddToCart }) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);

  useEffect(() => {
    updatePageSEO({
      title: "Shoarma- & Lavasteen Grillrestaurant Sint-Truiden",
      description: "Geniet van de heerlijkste grillgerechten, malse shoarma, verse schotels en pizza's bij Grill Room Isis in Sint-Truiden. Bestel eenvoudig online voor afhaling."
    });

    const loadData = async () => {
      const items = await getMenuItems();
      const cats = await getCategories();
      setDishes(items);
      setCategories(cats);
    };

    loadData();
  }, []);

  return (
    <>
      <HeroSection content={siteContent.hero} onNavigate={onNavigate} />
      <FeaturedDishesSection
        dishes={dishes}
        onSelectDish={(dish) => setSelectedDishForModal(dish)}
        onNavigate={onNavigate}
      />
      <CategoriesSection categories={categories} onNavigate={onNavigate} />
      <IntroSection content={siteContent.intro} />
      <AtmosphereSection content={siteContent.atmosphere} />
      <ProcessSection content={siteContent.process} />
      <FAQSection faqs={faqs} />
      <CTASection content={siteContent.cta} onNavigate={onNavigate} />

      {/* Dish Customization Modal */}
      <DishModal
        dish={selectedDishForModal}
        isOpen={Boolean(selectedDishForModal)}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};
