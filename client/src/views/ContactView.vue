<template>
  <div class="bg-brand-light-bg dark:bg-black min-h-screen transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="CONTACT US"
      service-name="Direct Consultation"
    />

    <AdSenseSlot slot-type="header" />

    <!-- Main Contact Section -->
    <section class="py-20 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left: Studio Details -->
          <div class="lg:col-span-5 space-y-8">
            <div>
              <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">DIRECT CONTACT</span>
              <h2 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white uppercase mt-1">
                GET IN TOUCH WITH OUR LAHORE STUDIO
              </h2>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                Whether you are commencing an ambitious residential estate, expanding an office campus, or seeking bespoke furniture, our team is at your service.
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="space-y-4 text-xs">
              
              <div class="p-4 bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border flex items-start gap-4 transition-colors duration-300 shadow-sm dark:shadow-none">
                <div class="w-10 h-10 rounded bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase">Design Gallery & Studio</h4>
                  <p class="text-gray-600 dark:text-gray-400 mt-0.5">{{ settings.address || '5CCA, 5th Floor, Block C, DHA Phase 6, Lahore' }}</p>
                  <span class="text-[11px] text-amber-700 dark:text-brand-gold mt-1 block">Private Appointments Preferred</span>
                </div>
              </div>

              <div class="p-4 bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border flex items-start gap-4 transition-colors duration-300 shadow-sm dark:shadow-none">
                <div class="w-10 h-10 rounded bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold shrink-0">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase">Phone & WhatsApp Hotline</h4>
                  <a :href="'tel:' + (settings.phone || '+923001999967')" class="text-amber-700 dark:text-brand-gold hover:underline font-bold mt-0.5 block">
                    {{ settings.phone || '+92 300 1999967' }}
                  </a>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">Available Monday – Saturday (9:00 AM – 7:00 PM PKT)</span>
                </div>
              </div>

              <div class="p-4 bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border flex items-start gap-4 transition-colors duration-300 shadow-sm dark:shadow-none">
                <div class="w-10 h-10 rounded bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase">Official Email</h4>
                  <a :href="'mailto:' + (settings.email || 'contact@spacezandplaces.com')" class="text-amber-700 dark:text-brand-gold hover:underline mt-0.5 block">
                    {{ settings.email || 'contact@spacezandplaces.com' }}
                  </a>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">Inquiries reviewed within 24 business hours</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Right: Interactive Lead Form -->
          <div class="lg:col-span-7 bg-[#faf9f6] dark:bg-[#141414] border border-gray-200 dark:border-brand-border p-8 relative shadow-md dark:shadow-none transition-colors duration-300">
            <div class="absolute top-0 left-0 right-0 h-1 bg-brand-gold"></div>

            <h3 class="text-xl font-heading font-black text-gray-900 dark:text-white uppercase mb-2">
              SEND US A PROJECT INQUIRY
            </h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-6">
              Our lead architectural estimator will review your specifications and provide initial feasibility guidance.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Your Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="e.g. Asad Malik"
                    class="w-full bg-white dark:bg-black border border-gray-300 dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-4 py-3 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    class="w-full bg-white dark:bg-black border border-gray-300 dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Email Address *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    class="w-full bg-white dark:bg-black border border-gray-300 dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-4 py-3 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Service Required</label>
                  <select
                    v-model="form.service"
                    class="w-full bg-white dark:bg-black border border-gray-300 dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-4 py-3 outline-none transition-colors"
                  >
                    <option value="Residential Interior">Residential Interior</option>
                    <option value="Corporate Interior">Corporate Interior</option>
                    <option value="Commercial Interior">Commercial Interior</option>
                    <option value="Hospitality & Restaurant">Hospitality & Restaurant</option>
                    <option value="Architectural Residential Planning">Architectural Residential Planning</option>
                    <option value="3D Architectural Rendering">3D Architectural Rendering</option>
                    <option value="Full Scale Turnkey Construction">Full Scale Turnkey Construction</option>
                    <option value="Refurbishment in Lahore">Refurbishment in Lahore</option>
                    <option value="Bespoke Luxury Furniture">Bespoke Luxury Furniture</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Plot Location & Project Scope</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Please describe your plot size (e.g. 1 Kanal DHA Phase 7), current status (raw land vs renovation), and expected completion timeframe..."
                  class="w-full bg-white dark:bg-black border border-gray-300 dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-4 py-3 outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-black font-heading font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="loading">TRANSMITTING INQUIRY...</span>
                <span v-else>SUBMIT CONSULTATION REQUEST</span>
                <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>

    <!-- Google Maps Studio Location Embed -->
    <section class="w-full h-80 bg-gray-100 dark:bg-[#181818] border-b border-gray-200 dark:border-brand-border relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108865.04856417758!2d74.2704494119859!3d31.503923497843787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a50718a15%3A0x6d9f7f8582d96924!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        :style="isDark ? 'border:0; filter: grayscale(100%) invert(90%) contrast(85%);' : 'border:0;'"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Spaces & Places Lahore Studio Location"
      ></iframe>
    </section>

    <AdSenseSlot slot-type="inArticle" />

    <FaqAccordion :faqs="pageData?.faqs" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPage, submitLead } from '../api';
import { useSeo } from '../composables/useSeo';
import { useSettings } from '../composables/useSettings';
import { useToast } from '../composables/useToast';
import { useTheme } from '../composables/useTheme';
import HeroBanner from '../components/common/HeroBanner.vue';
import FaqAccordion from '../components/common/FaqAccordion.vue';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const { setMeta } = useSeo();
const { settings } = useSettings();
const { showToast } = useToast();
const { isDark } = useTheme();

const pageData = ref(null);
const loading = ref(false);
const form = ref({
  name: '',
  email: '',
  phone: '',
  service: 'General Consultation',
  message: '',
  source: 'contact_page'
});

onMounted(async () => {
  try {
    const data = await getPage('contact');
    pageData.value = data;
    setMeta(data);
  } catch (err) {
    console.error('Error fetching contact page:', err);
  }
});

async function handleSubmit() {
  loading.value = true;
  try {
    await submitLead(form.value);
    showToast('Inquiry submitted successfully! Our lead architect will contact you.', 'success');
    form.value = {
      name: '',
      email: '',
      phone: '',
      service: 'General Consultation',
      message: '',
      source: 'contact_page'
    };
  } catch (err) {
    showToast(err.message || 'Error submitting message. Please call us directly.', 'error');
  } finally {
    loading.value = false;
  }
}
</script>
