import React, { useEffect } from 'react';
import { ServicesSection } from '../components/sections/ServicesSection';
import { services } from '../content/services';
import { updatePageSEO } from '../lib/seo';

export const ServicesPage = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSEO({ title: "Diensten", description: "Bekijk ons volledige aanbod aan professionele diensten." });
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <ServicesSection services={services} onNavigate={onNavigate} />
    </div>
  );
};
