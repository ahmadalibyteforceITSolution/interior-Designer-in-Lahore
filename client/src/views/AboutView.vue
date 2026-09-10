<template>
  <div class="bg-brand-light-bg dark:bg-black min-h-screen transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="ABOUT US"
      service-name="Studio Philosophy"
    />

    <AdSenseSlot slot-type="header" />

    <OverviewSection :overview-data="pageData?.overview" />

    <!-- Studio Values -->
    <SectionCardsGrid
      :sections="pageData?.sections"
      section-badge="OUR FOUNDATIONAL PILLARS"
      section-title="TIMELESS ARCHITECTURE & INTEGRATED DESIGN"
      section-subtitle="Rooted in classical craftsmanship, elevated by Scandinavian minimalism and thermodynamic climate science."
    />

    <!-- Leadership / Design Atelier -->
    <section class="py-20 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-3">
          <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">OUR MULTIDISCIPLINARY ATELIER</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white uppercase">
            ARCHITECTS, ENGINEERS & ARTISANS
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Our collaborative structure ensures seamless translation from raw CAD schematics to fine on-site masonry.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border p-6 text-center space-y-4 hover:border-amber-500 dark:hover:border-brand-gold/60 shadow-sm dark:shadow-none transition-all duration-300">
            <div class="w-20 h-20 mx-auto rounded-full bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-lg font-heading font-bold text-gray-900 dark:text-white">Principal Architects</h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Chartered architects with extensive experience in DHA, Bahria Town, and LDA regulatory master planning and sustainable solar path modeling.
            </p>
          </div>

          <div class="bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border p-6 text-center space-y-4 hover:border-amber-500 dark:hover:border-brand-gold/60 shadow-sm dark:shadow-none transition-all duration-300">
            <div class="w-20 h-20 mx-auto rounded-full bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            </div>
            <h3 class="text-lg font-heading font-bold text-gray-900 dark:text-white">Interior Styling Directors</h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Curators of fine Italian marbles, bespoke lighting fixtures, ambient acoustic textiles, and ergonomic custom woodwork.
            </p>
          </div>

          <div class="bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border p-6 text-center space-y-4 hover:border-amber-500 dark:hover:border-brand-gold/60 shadow-sm dark:shadow-none transition-all duration-300">
            <div class="w-20 h-20 mx-auto rounded-full bg-amber-500/10 dark:bg-[#1e1e1e] border border-amber-600/30 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-heading font-bold text-gray-900 dark:text-white">Site Project Engineers</h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Civil engineers ensuring strict adherence to PEC structural codes, laboratory concrete cube testing, and milestone delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <AdSenseSlot slot-type="inArticle" />

    <ProjectGallery :gallery="pageData?.gallery" />

    <FaqAccordion :faqs="pageData?.faqs" />

    <CtaBanner :cta-data="pageData?.cta" />

  </div>
</template>

<script setup>
import { usePageData } from '../composables/usePageData';
import HeroBanner from '../components/common/HeroBanner.vue';
import OverviewSection from '../components/common/OverviewSection.vue';
import SectionCardsGrid from '../components/common/SectionCardsGrid.vue';
import ProjectGallery from '../components/common/ProjectGallery.vue';
import FaqAccordion from '../components/common/FaqAccordion.vue';
import CtaBanner from '../components/common/CtaBanner.vue';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const { pageData } = usePageData('about-us');
</script>
