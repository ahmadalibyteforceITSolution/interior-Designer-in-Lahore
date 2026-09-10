<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="OUR CLIENTS"
      service-name="Commercial Collaborations"
    />

    <AdSenseSlot slot-type="header" />

    <OverviewSection :overview-data="pageData?.overview" />

    <!-- Full Client Grid -->
    <section class="py-20 bg-white dark:bg-[#101010] border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-3">
          <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">COMMERCIAL EXCELLENCE</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white uppercase">
            OUR CORPORATE PARTNERS & BRANDS
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We deliver state-of-the-art corporate offices, retail flagship showrooms, industrial facilities, and hospitality venues across Pakistan.
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
          <div
            v-for="(client, idx) in clientsList"
            :key="idx"
            class="bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border hover:border-amber-600/70 dark:hover:border-brand-gold/70 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group hover:shadow-lg dark:hover:shadow-gold-glow rounded-sm"
          >
            <div class="h-24 flex items-center justify-center w-full mb-3">
              <img
                :src="client.logo"
                :alt="client.name"
                class="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-90 group-hover:opacity-100"
              />
            </div>
            <h4 class="text-sm font-heading font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-brand-gold transition-colors">
              {{ client.name }}
            </h4>
            <span class="text-[11px] text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{{ client.sector }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Testimonials Strip -->
    <section class="py-20 bg-[#faf9f6] dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-2">
          <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">CLIENT ENDORSEMENTS</span>
          <h2 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-black border border-gray-200 dark:border-brand-border p-8 relative space-y-4 shadow-sm">
            <div class="text-amber-600 dark:text-brand-gold text-2xl font-serif">“</div>
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "Spaces & Places transformed our 1-Kanal villa in DHA Phase 6 into a serene modern sanctuary. The level of detail on the fluted marble walls and custom false ceilings exceeded our expectations."
            </p>
            <div class="pt-4 border-t border-gray-200 dark:border-brand-border/60">
              <h5 class="text-gray-900 dark:text-white font-bold text-xs">Dr. H. Farooq</h5>
              <span class="text-amber-700 dark:text-brand-gold text-[11px]">DHA Phase 6 Villa Homeowner</span>
            </div>
          </div>

          <div class="bg-white dark:bg-black border border-gray-200 dark:border-brand-border p-8 relative space-y-4 shadow-sm">
            <div class="text-amber-600 dark:text-brand-gold text-2xl font-serif">“</div>
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "The corporate office renovation executed for our regional headquarters in Gulberg was completed on time and within BOQ. Their acoustic zoning and workstation ergonomics have boosted team energy noticeably."
            </p>
            <div class="pt-4 border-t border-gray-200 dark:border-brand-border/60">
              <h5 class="text-gray-900 dark:text-white font-bold text-xs">M. Zubair Khan</h5>
              <span class="text-amber-700 dark:text-brand-gold text-[11px]">Director Operations, Commercial Group</span>
            </div>
          </div>

          <div class="bg-white dark:bg-black border border-gray-200 dark:border-brand-border p-8 relative space-y-4 shadow-sm">
            <div class="text-amber-600 dark:text-brand-gold text-2xl font-serif">“</div>
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "Working with Spaces & Places while based in London was effortless. Their weekly video walkthroughs and meticulous milestone tracking gave our family complete confidence."
            </p>
            <div class="pt-4 border-t border-gray-200 dark:border-brand-border/60">
              <h5 class="text-gray-900 dark:text-white font-bold text-xs">S. Bilal Shah</h5>
              <span class="text-amber-700 dark:text-brand-gold text-[11px]">Overseas Resident, Bahria Town Villa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SectionCardsGrid
      v-if="pageData?.sections?.length"
      :sections="pageData.sections"
      section-badge="COMMERCIAL SCOPE"
      section-title="SECTORS WE TRANSFORM"
      section-subtitle="From high-traffic retail flagship stores to corporate headquarters and luxury hospitality."
    />

    <!-- FAQs Accordion -->
    <FaqAccordion :faqs="pageData?.faqs" />

    <AdSenseSlot slot-type="inArticle" />

    <CtaBanner :cta-data="pageData?.cta" />

  </div>
</template>

<script setup>
import { usePageData } from '../composables/usePageData';
import HeroBanner from '../components/common/HeroBanner.vue';
import OverviewSection from '../components/common/OverviewSection.vue';
import SectionCardsGrid from '../components/common/SectionCardsGrid.vue';
import FaqAccordion from '../components/common/FaqAccordion.vue';
import CtaBanner from '../components/common/CtaBanner.vue';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const { pageData } = usePageData('our-clients');

const clientsList = [
  { name: 'Brighto Paints', logo: '/uploads/brighto-logo.png', sector: 'Paints & Coatings' },
  { name: 'Descon Engineering', logo: '/uploads/descon-logo.png', sector: 'Industrial Engineering' },
  { name: 'Jotun Paints', logo: '/uploads/jotun-logo.png', sector: 'Chemicals & Finishes' },
  { name: 'HA Steels', logo: '/uploads/ha-steels-logo.png', sector: 'Steel & Construction' },
  { name: 'Leisure Salon', logo: '/uploads/leisure-salon-logo.png', sector: 'Luxury Hospitality' },
  { name: 'American Club', logo: '/uploads/american-club-logo.png', sector: 'Private Members Club' },
  { name: 'Shawarma Stop', logo: '/uploads/shawarma-stop-logo.png', sector: 'Food & Beverage' },
  { name: 'Prestige Cars', logo: '/uploads/prestige-cars-logo.png', sector: 'Automotive Showroom' },
  { name: 'Dastify', logo: '/uploads/dastify-logo.png', sector: 'E-Commerce Logistics' },
  { name: 'Biotech Packages', logo: '/uploads/biotech-packages-logo.png', sector: 'Manufacturing' },
  { name: 'Hussain Mills', logo: '/uploads/hussain-logo.png', sector: 'Textile Industry' },
  { name: 'Gifto', logo: '/uploads/gifto-logo.png', sector: 'Retail Chain' }
];
</script>
