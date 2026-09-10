<template>
  <div class="space-y-8 pb-16">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Site Configuration & Google AdSense Settings
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Manage brand identities, contact coordinates, AdSense publisher verification, and ad slot toggles.
        </p>
      </div>

      <button
        @click="saveSettings"
        :disabled="saving"
        class="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow disabled:opacity-50"
      >
        <span v-if="saving">SAVING TO MONGODB...</span>
        <span v-else>SAVE CONFIGURATION</span>
      </button>
    </div>

    <div v-if="loading" class="text-center py-20 text-brand-gold text-xs font-mono">
      Loading Settings...
    </div>

    <div v-else class="space-y-8 text-xs">
      
      <!-- 1. Google AdSense & Monetization -->
      <div class="bg-brand-surface border border-brand-border p-6 space-y-6">
        <div class="border-b border-brand-border pb-3">
          <span class="text-xs font-bold text-brand-gold uppercase tracking-wider">Monetization Engine</span>
          <h3 class="text-base font-heading font-bold text-white uppercase mt-0.5">
            Google AdSense Configuration
          </h3>
          <p class="text-gray-400 text-xs">
            Configure your publisher client code and toggle active ad placements across all pages.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-black border border-brand-border rounded">
            <div>
              <h4 class="text-white font-bold uppercase text-xs">Enable Google AdSense System</h4>
              <p class="text-gray-400 text-[11px] mt-0.5">Toggle on when you are applying for or running active AdSense ads.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="form.adsenseEnabled" type="checkbox" class="sr-only peer" />
              <div class="w-11 h-6 bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
            </label>
          </div>

          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
              Google AdSense Publisher ID *
            </label>
            <input
              v-model="form.adsensePublisherId"
              type="text"
              placeholder="e.g. ca-pub-9876543210123456"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
            <span class="text-[10px] text-gray-500 block mt-1">
              Found in your Google AdSense account under Account &gt; Settings &gt; Account information.
            </span>
          </div>

          <!-- Individual Ad Slot Toggles -->
          <div class="pt-2 border-t border-brand-border/60">
            <span class="block text-gray-300 font-medium uppercase tracking-wider mb-3">
              Active Ad Placement Toggles:
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <label class="flex items-center gap-2.5 p-3 bg-black border border-brand-border rounded cursor-pointer">
                <input v-model="form.adSlots.header" type="checkbox" class="w-4 h-4 accent-brand-gold" />
                <span class="text-gray-200">Header Banner Slot</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 bg-black border border-brand-border rounded cursor-pointer">
                <input v-model="form.adSlots.inArticle" type="checkbox" class="w-4 h-4 accent-brand-gold" />
                <span class="text-gray-200">In-Article / Mid Slot</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 bg-black border border-brand-border rounded cursor-pointer">
                <input v-model="form.adSlots.sidebar" type="checkbox" class="w-4 h-4 accent-brand-gold" />
                <span class="text-gray-200">Sidebar Slot</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 bg-black border border-brand-border rounded cursor-pointer">
                <input v-model="form.adSlots.footer" type="checkbox" class="w-4 h-4 accent-brand-gold" />
                <span class="text-gray-200">Footer Banner Slot</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Brand & Contact Identity -->
      <div class="bg-brand-surface border border-brand-border p-6 space-y-6">
        <div class="border-b border-brand-border pb-3">
          <span class="text-xs font-bold text-brand-gold uppercase tracking-wider">Brand Information</span>
          <h3 class="text-base font-heading font-bold text-white uppercase mt-0.5">
            Identity & Contact Details
          </h3>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Website Name</label>
              <input
                v-model="form.siteName"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Tagline</label>
              <input
                v-model="form.tagline"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Direct Phone Hotline *</label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">WhatsApp Number</label>
              <input
                v-model="form.whatsapp"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Official Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Studio Physical Address</label>
              <input
                v-model="form.address"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Working Hours</label>
              <input
                v-model="form.workingHours"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Header Logo URL</label>
              <input
                v-model="form.logoUrl"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Footer Logo URL</label>
              <input
                v-model="form.footerLogoUrl"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Webmaster & Search Verification -->
      <div class="bg-brand-surface border border-brand-border p-6 space-y-6">
        <div class="border-b border-brand-border pb-3">
          <span class="text-xs font-bold text-brand-gold uppercase tracking-wider">Search Console & Analytics</span>
          <h3 class="text-base font-heading font-bold text-white uppercase mt-0.5">
            Webmaster Integrations
          </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Google Analytics GA4 ID</label>
            <input
              v-model="form.googleAnalyticsId"
              type="text"
              placeholder="G-XXXXXXXXXX"
              class="w-full bg-black border border-brand-border text-white px-3 py-2 outline-none font-mono"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Google Site Verification Code</label>
            <input
              v-model="form.googleSiteVerification"
              type="text"
              placeholder="google-site-verification token"
              class="w-full bg-black border border-brand-border text-white px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          @click="saveSettings"
          :disabled="saving"
          class="px-8 py-3 bg-brand-gold hover:bg-brand-gold-light text-black font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow disabled:opacity-50"
        >
          <span v-if="saving">SAVING...</span>
          <span v-else>SAVE CONFIGURATION</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSettings, updateSettings } from '../../api';
import { useToast } from '../../composables/useToast';

const { showToast } = useToast();

const loading = ref(true);
const saving = ref(false);

const form = ref({
  siteName: 'SPACES & PLACES',
  tagline: 'Interior Designer and Architects in Lahore',
  phone: '+92 300 1999967',
  whatsapp: '+923001999967',
  email: 'info@spacesandplaces.com.pk',
  address: 'Gulberg & DHA, Lahore, Punjab, Pakistan',
  workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
  logoUrl: '/uploads/header-logo.webp',
  footerLogoUrl: '/uploads/SP-Logo-for-web-footer-1.png',
  adsensePublisherId: 'ca-pub-9876543210123456',
  adsenseEnabled: true,
  adSlots: {
    header: true,
    inArticle: true,
    sidebar: true,
    footer: true
  },
  googleAnalyticsId: '',
  googleSiteVerification: '',
  socialLinks: {}
});

onMounted(async () => {
  try {
    const data = await getSettings();
    if (data && data.siteName) {
      form.value = {
        ...form.value,
        ...data,
        adSlots: { ...form.value.adSlots, ...(data.adSlots || {}) }
      };
    }
  } catch (err) {
    showToast('Error loading settings: ' + err.message, 'error');
  } finally {
    loading.value = false;
  }
});

async function saveSettings() {
  saving.value = true;
  try {
    await updateSettings(form.value);
    showToast('Configuration updated in MongoDB Atlas!', 'success');
  } catch (err) {
    showToast('Error saving settings: ' + err.message, 'error');
  } finally {
    saving.value = false;
  }
}
</script>
