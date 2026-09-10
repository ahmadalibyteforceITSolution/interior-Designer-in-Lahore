<template>
  <footer class="bg-brand-light-surface dark:bg-black text-gray-600 dark:text-gray-400 border-t border-brand-light-border dark:border-brand-border pt-16 pb-12 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-light-border dark:border-brand-border/60">
        
        <!-- Col 1: Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <router-link to="/" class="inline-block">
            <img
              :src="currentFooterLogo"
              alt="Spaces & Places"
              class="h-14 w-auto object-contain"
            />
          </router-link>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
            Spaces & Places is Lahore's preeminent multidimensional architectural planning, luxury interior design, and turnkey construction studio. We harmonize aesthetic innovation with engineering mastery.
          </p>
          <div class="pt-2">
            <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <span class="text-amber-700 dark:text-brand-gold font-bold">Studio:</span>
              <span>{{ settings.address || '5CCA, 5th Floor, Block C, DHA Phase 6, Lahore' }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 mt-1.5">
              <span class="text-amber-700 dark:text-brand-gold font-bold">Direct Line:</span>
              <a :href="'tel:' + (settings.phone || '+923001999967')" class="hover:text-amber-700 dark:hover:text-brand-gold">{{ settings.phone || '+92 300 1999967' }}</a>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 mt-1.5">
              <span class="text-amber-700 dark:text-brand-gold font-bold">Email:</span>
              <a :href="'mailto:' + (settings.email || 'contact@spacezandplaces.com')" class="hover:text-amber-700 dark:hover:text-brand-gold">{{ settings.email || 'contact@spacezandplaces.com' }}</a>
            </div>
          </div>
        </div>

        <!-- Col 2: Interior Services -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-gold/40 pb-2">
            Interior Design
          </h3>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/residential-interior" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Residential Interior</router-link></li>
            <li><router-link to="/corporate-interior" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Corporate Interior</router-link></li>
            <li><router-link to="/commercial-interior" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Commercial Interior</router-link></li>
            <li><router-link to="/hospitality-interior" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Hospitality Interior</router-link></li>
            <li><router-link to="/restaurant-design" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Restaurant Design</router-link></li>
            <li><router-link to="/industrial-design" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Industrial Design</router-link></li>
            <li><router-link to="/interior-furnishings" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Interior Furnishings</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Architecture & Build -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-gold/40 pb-2">
            Architecture & Build
          </h3>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/architectural-residential-planning" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Residential Planning</router-link></li>
            <li><router-link to="/3d-architectural-design-lahore" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">3D Design & Rendering</router-link></li>
            <li><router-link to="/facade-elevation-design" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Facade & Elevation</router-link></li>
            <li><router-link to="/landscape-design" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Landscape Architecture</router-link></li>
            <li><router-link to="/full-scale-construction-company-in-lahore" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Full Scale Construction</router-link></li>
            <li><router-link to="/refurbishment-services-in-lahore" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Refurbishment Services</router-link></li>
            <li><router-link to="/project-management-in-lahore" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Project Management</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Furniture & Legal (AdSense Requirements) -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-gold/40 pb-2">
            Furniture & Trust
          </h3>
          <ul class="space-y-2 text-xs">
            <li><router-link to="/residential-furniture" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Residential Furniture</router-link></li>
            <li><router-link to="/customized-furniture" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Customized Furniture</router-link></li>
            <li><router-link to="/commercial-furniture" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Commercial Furniture</router-link></li>
            <li><router-link to="/our-clients" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Our Clients Portfolio</router-link></li>
            <li class="pt-3 border-t border-brand-light-border dark:border-brand-border/40">
              <router-link to="/privacy-policy" class="text-amber-700 dark:text-brand-gold hover:underline font-medium">Privacy Policy (GDPR/AdSense)</router-link>
            </li>
            <li><router-link to="/terms-conditions" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Terms & Conditions</router-link></li>
            <li><router-link to="/disclaimer" class="hover:text-amber-700 dark:hover:text-brand-gold transition-colors">Professional Disclaimer</router-link></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500 gap-4">
        <p>© {{ new Date().getFullYear() }} Spaces & Places. All Rights Reserved. Luxury Interior Designers & Architects in Lahore.</p>
        <div class="flex items-center space-x-6">
          <router-link to="/privacy-policy" class="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy</router-link>
          <router-link to="/terms-conditions" class="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms</router-link>
          <a href="/sitemap.xml" target="_blank" class="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Sitemap</a>
          <router-link to="/admin" class="text-amber-700 dark:text-brand-gold/80 hover:text-amber-800 dark:hover:text-brand-gold font-medium">cPanel Admin</router-link>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useSettings } from '../../composables/useSettings';
import { useTheme } from '../../composables/useTheme';

const { settings } = useSettings();
const { isDark } = useTheme();

const currentFooterLogo = computed(() => {
  if (!isDark.value) {
    return settings.value?.logoDarkUrl || '/logo-dark.png';
  }
  return settings.value?.footerLogoUrl || settings.value?.logoUrl || '/uploads/SP-Logo-for-web-footer-1.png';
});
</script>
