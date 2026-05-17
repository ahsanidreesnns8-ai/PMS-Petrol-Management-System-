export const DEFAULT_SITE_CONFIG = {
  pumpName: 'JUTT GM',
  tagline: 'Premium Fuel Network • Pakistan',
  address: 'Ferozepur Road, Lahore',
  phone: '+92 321 0000000',
  email: 'info@juttgm.com',
  facebook: 'https://www.facebook.com/juttgm',
  instagram: 'https://www.instagram.com/juttgm',
  location: {
    lat: 31.5204,
    lng: 74.3587,
    name: 'JUTT GM - Lahore Main',
  },
};

const STORAGE_KEY = 'juttgm_site_config';

export const getSiteConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_SITE_CONFIG,
        ...parsed,
        location: { ...DEFAULT_SITE_CONFIG.location, ...parsed?.location },
      };
    }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_SITE_CONFIG };
};

export const saveSiteConfig = (config) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

export const HUMAN_VERIFY_KEY = 'juttgm_human_verified';
