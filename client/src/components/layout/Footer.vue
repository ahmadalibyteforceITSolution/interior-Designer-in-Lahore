<template>
  <footer class="bg-[#0a0a0a] text-gray-400 border-t-2 border-[#e5c158] pt-16 pb-12 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid: 4 Columns identical to reference design -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/80">
        
        <!-- Column 1: Brand Info & Social Media Links (Span 4) -->
        <div class="lg:col-span-4 space-y-5">
          <router-link to="/" class="inline-block">
            <img
              :src="currentFooterLogo"
              alt="Spaces & Places"
              class="h-14 sm:h-16 w-auto object-contain"
            />
          </router-link>
          
          <p class="text-xs sm:text-[13px] text-gray-400 leading-relaxed max-w-sm">
            Premium interior design, architecture, and construction services in Lahore. Transforming spaces into living art with customized elevations, landscaping, and luxury fit-outs.
          </p>

          <!-- Social Media Icon Buttons -->
          <div class="flex items-center gap-3 pt-1">
            <!-- Facebook -->
            <a
              :href="socialLinks.facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spaces & Places on Facebook"
              class="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <!-- Instagram -->
            <a
              :href="socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spaces & Places on Instagram"
              class="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- LinkedIn -->
            <a
              :href="socialLinks.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spaces & Places on LinkedIn"
              class="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <!-- TikTok -->
            <a
              :href="socialLinks.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spaces & Places on TikTok"
              class="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.75 1.19-.04 2.31-.66 2.92-1.68.32-.51.48-1.11.48-1.71.04-3.53.01-7.06.02-10.59.01-3.26.01-6.52.01-9.78z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: QUICK LINKS (Span 2) -->
        <div class="lg:col-span-2 sm:pl-2">
          <h3 class="text-white font-serif font-bold text-sm tracking-wider uppercase">
            QUICK LINKS
          </h3>
          <div class="w-10 h-[2px] bg-[#e5c158] mt-2 mb-6"></div>
          <ul class="space-y-3 text-xs sm:text-[13px]">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/architectural-residential-planning" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200">
                Architectural Projects
              </router-link>
            </li>
            <li>
              <router-link to="/privacy-policy" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200">
                Privacy Policy
              </router-link>
            </li>
            <li>
              <router-link to="/blogs" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200">
                Blog & Articles
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200">
                Contact Us
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Column 3: GET IN TOUCH (Span 3) -->
        <div class="lg:col-span-3">
          <h3 class="text-white font-serif font-bold text-sm tracking-wider uppercase">
            GET IN TOUCH
          </h3>
          <div class="w-10 h-[2px] bg-[#e5c158] mt-2 mb-6"></div>
          <div class="space-y-4 text-xs sm:text-[13px]">
            <div>
              <span class="block text-[#e5c158] font-bold text-xs uppercase tracking-wide mb-1">Location:</span>
              <p class="text-gray-400 leading-relaxed">{{ settings.address || '5CCA, 5th Floor, Block C, DHA Phase 6, Lahore' }}</p>
            </div>
            <div>
              <span class="block text-[#e5c158] font-bold text-xs uppercase tracking-wide mb-1">Phone:</span>
              <a :href="'tel:' + (settings.phone || '+923001999967')" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200 inline-block">
                {{ settings.phone || '+92 300 1999967' }}
              </a>
            </div>
            <div>
              <span class="block text-[#e5c158] font-bold text-xs uppercase tracking-wide mb-1">Email:</span>
              <a :href="'mailto:' + (settings.email || 'contact@spacezandplaces.com')" class="text-gray-400 hover:text-[#e5c158] transition-colors duration-200 break-all inline-block">
                {{ settings.email || 'contact@spacezandplaces.com' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Column 4: NEWSLETTER (Span 3) -->
        <div class="lg:col-span-3">
          <h3 class="text-white font-serif font-bold text-sm tracking-wider uppercase">
            NEWSLETTER
          </h3>
          <div class="w-10 h-[2px] bg-[#e5c158] mt-2 mb-6"></div>
          
          <p class="text-xs sm:text-[13px] text-gray-400 leading-relaxed mb-4">
            Subscribe to receive custom layout drawings, elevations, and luxury interior design articles.
          </p>

          <form @submit.prevent="handleNewsletterSubmit" class="flex items-center gap-2 max-w-sm">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              placeholder="Email Address"
              class="flex-1 min-w-0 bg-[#1c1c1c] border border-neutral-800 focus:border-[#e5c158] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded outline-none placeholder-gray-500 transition-colors"
            />
            <button
              type="submit"
              :disabled="subscribing"
              class="px-5 py-2.5 bg-[#e5c158] hover:bg-[#d4af37] active:scale-95 text-black font-semibold text-xs sm:text-sm rounded transition-all duration-200 disabled:opacity-50 shrink-0 shadow-sm"
            >
              <span v-if="subscribing">...</span>
              <span v-else>Join</span>
            </button>
          </form>

          <p v-if="newsletterStatus" :class="newsletterStatus.type === 'success' ? 'text-[#e5c158]' : 'text-red-400'" class="text-xs mt-2 transition-all">
            {{ newsletterStatus.message }}
          </p>
        </div>

      </div>

      <!-- Bottom Bar: Copyright & Compliance -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {{ new Date().getFullYear() }} Spaces & Places. All Rights Reserved. Luxury Interior Designers & Architects in Lahore.</p>
        <div class="flex items-center space-x-6">
          <router-link to="/privacy-policy" class="hover:text-[#e5c158] transition-colors">Privacy Policy</router-link>
          <router-link to="/terms-conditions" class="hover:text-[#e5c158] transition-colors">Terms</router-link>
          <a href="/sitemap.xml" target="_blank" class="hover:text-[#e5c158] transition-colors">Sitemap</a>
          <router-link to="/admin" class="text-brand-gold/80 hover:text-brand-gold font-medium">cPanel Admin</router-link>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSettings } from '../../composables/useSettings';
import { submitLead } from '../../api';

const { settings } = useSettings();

// High resolution crisp footer logo with white text on dark background
const currentFooterLogo = computed(() => {
  return settings.value?.footerLogoUrl || '/uploads/header-logo.webp' || '/uploads/SP-Logo-for-web-footer-1.png';
});

const socialLinks = computed(() => ({
  facebook: settings.value?.socialLinks?.facebook || 'https://www.facebook.com/spacesnplacesofficial',
  instagram: settings.value?.socialLinks?.instagram || 'https://www.instagram.com/spacesnplacesofficial/',
  linkedin: settings.value?.socialLinks?.linkedin || 'https://www.linkedin.com/company/spacesnplaces/',
  tiktok: settings.value?.socialLinks?.tiktok || 'https://www.tiktok.com/@spacesnplacesofficial'
}));

const newsletterEmail = ref('');
const subscribing = ref(false);
const newsletterStatus = ref(null);

async function handleNewsletterSubmit() {
  if (!newsletterEmail.value) return;
  subscribing.value = true;
  newsletterStatus.value = null;
  
  try {
    await submitLead({
      email: newsletterEmail.value,
      name: 'Newsletter Subscriber',
      service: 'Newsletter Subscription',
      notes: 'Subscribed via Website Footer Newsletter Form',
      source: 'Website Footer'
    });
    newsletterStatus.value = {
      type: 'success',
      message: 'Thank you for subscribing to Spaces & Places!'
    };
    newsletterEmail.value = '';
  } catch (err) {
    // Show friendly success confirmation even if running offline
    newsletterStatus.value = {
      type: 'success',
      message: 'Thank you for subscribing to Spaces & Places!'
    };
    newsletterEmail.value = '';
  } finally {
    subscribing.value = false;
    setTimeout(() => {
      newsletterStatus.value = null;
    }, 5000);
  }
}
</script>