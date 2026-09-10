import { ref } from 'vue';
import { getSettings } from '../api';

const settings = ref({
  siteName: 'SPACES & PLACES',
  tagline: 'Interior Designer and Architects in Lahore',
  phone: '+92 300 1999967',
  whatsapp: '+923001999967',
  email: 'contact@spacezandplaces.com',
  address: '5CCA, 5th Floor, Block C, DHA Phase 6, Lahore',
  workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
  logoUrl: '/uploads/header-logo.webp',
  logoDarkUrl: '/logo-dark.png',
  footerLogoUrl: '/uploads/SP-Logo-for-web-footer-1.png',
  adsensePublisherId: 'ca-pub-9876543210123456',
  adsenseEnabled: true,
  adSlots: { header: true, inArticle: true, sidebar: true, footer: true },
  socialLinks: {
    facebook: 'https://facebook.com/spacesandplaces',
    instagram: 'https://instagram.com/spacesandplaces',
    linkedin: 'https://linkedin.com/company/spacesandplaces',
    youtube: 'https://youtube.com'
  }
});

const isLoaded = ref(false);

export function useSettings() {
  async function loadSettings() {
    if (isLoaded.value) return;
    try {
      const data = await getSettings();
      if (data && data.siteName) {
        settings.value = { ...settings.value, ...data };
      }
      isLoaded.value = true;
    } catch (err) {
      console.warn('Using default settings (offline/loading)');
    }
  }

  function setSettings(newSettings) {
    settings.value = { ...settings.value, ...newSettings };
  }

  return {
    settings,
    isLoaded,
    loadSettings,
    setSettings
  };
}
