import { siteConfig } from '../config/siteConfig';

export const updatePageSEO = ({ title, description }) => {
  const company = siteConfig.companyName;
  const pageTitle = title ? `${title} | ${company}` : `${company} - ${siteConfig.tagline}`;
  document.title = pageTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", description || siteConfig.description || pageTitle);
  }
};
