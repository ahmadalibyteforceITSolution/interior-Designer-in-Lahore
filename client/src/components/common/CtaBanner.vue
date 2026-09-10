<template>
  <section class="py-20 relative overflow-hidden bg-brand-light-bg dark:bg-[#0e0e0e] border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
    <!-- Gold Ambient Background Glow -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
      <span class="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 dark:bg-brand-gold/15 border border-amber-600/30 dark:border-brand-gold/40 text-amber-700 dark:text-brand-gold text-xs font-bold tracking-widest uppercase">
        START YOUR PROJECT WITH LAHORE'S TOP ARCHITECTS
      </span>

      <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
        {{ ctaData?.title || 'READY TO TRANSFORM YOUR SPACE INTO A MASTERPIECE?' }}
      </h2>

      <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
        {{ ctaData?.subtitle || 'Schedule a private design consultation at our Lahore office or request an on-site feasibility evaluation today.' }}
      </p>

      <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
        <button
          @click="openLetsTalk(ctaData?.title || 'Direct Consultation')"
          class="px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-black font-heading font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg flex items-center gap-3"
        >
          <span>{{ ctaData?.buttonText || 'BOOK CONSULTATION' }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>

        <a
          :href="'tel:' + (settings.phone || '+923001999967')"
          class="px-6 py-4 border border-amber-700/60 dark:border-brand-gold/60 text-amber-800 dark:text-brand-gold hover:bg-brand-gold hover:text-black text-xs font-heading font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
          </svg>
          <span>CALL +92 300 1999967</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useModal } from '../../composables/useModal';
import { useSettings } from '../../composables/useSettings';

defineProps({
  ctaData: {
    type: Object,
    default: null
  }
});

const { openLetsTalk } = useModal();
const { settings } = useSettings();
</script>
