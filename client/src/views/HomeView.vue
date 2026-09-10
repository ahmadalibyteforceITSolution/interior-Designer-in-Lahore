<template>
  <div class="bg-brand-light-bg dark:bg-black min-h-screen transition-colors duration-300">
    
    <!-- Hero Banner -->
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="STUDIO LAHORE"
      service-name="General Architectural & Interior Inquiry"
    />

    <!-- Header AdSense Slot -->
    <AdSenseSlot slot-type="header" />

    <!-- Overview Section -->
    <OverviewSection :overview-data="pageData?.overview" />

    <!-- Services Grid (4 Pillars with direct links to all dropdowns) -->
    <SectionCardsGrid
      :sections="pageData?.sections"
      section-badge="OUR FOUR CORE DIVISIONS"
      section-title="COMPREHENSIVE ARCHITECTURAL & INTERIOR EXCELLENCE"
      section-subtitle="Explore our specialized practices designed to guide your project from raw plot to fully furnished luxury."
    />

    <!-- Quick Navigation to All Specialized Subpages (Matches screenshot exactly) -->
    <section class="py-20 bg-white dark:bg-[#0c0c0c] border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          <!-- Column 1: Interior Design -->
          <div>
            <h3 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Interior Design
            </h3>
            <ul class="divide-y divide-gray-100 dark:divide-brand-border/40 text-sm">
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Interior Designers in Lahore</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Interior Design Services Lahore</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Best Interior Designers in Lahore</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Interior Designers in DHA Lahore</router-link></li>
              <li><router-link to="/corporate-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Interior Designers in Gulberg Lahore</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Interior Designers in Bahria Town Lahore</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Residential Interior Design</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern House Interior Design</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Luxury Home Interior Projects</router-link></li>
              <li><router-link to="/interior-furnishings" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Living Room & Bedroom Interiors</router-link></li>
              <li><router-link to="/residential-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern Kitchen Interior Design</router-link></li>
              <li><router-link to="/corporate-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Office Interior Design</router-link></li>
              <li><router-link to="/corporate-design" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Corporate Workspace Design</router-link></li>
              <li><router-link to="/restaurant-design" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Restaurant Interior Design</router-link></li>
              <li><router-link to="/hospitality-interior" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Cafe & Hospitality Interiors</router-link></li>
            </ul>
          </div>

          <!-- Column 2: Architecture -->
          <div>
            <h3 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Architecture
            </h3>
            <ul class="divide-y divide-gray-100 dark:divide-brand-border/40 text-sm">
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Architects in Lahore</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Architectural Design Services</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Best Architectural Firms in Lahore</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Architects in DHA Lahore</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Architects in Bahria Town Lahore</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Architects in Gulberg Lahore</router-link></li>
              <li><router-link to="/facade-elevation-design" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Front Elevation Design Lahore</router-link></li>
              <li><router-link to="/3d-architectural-design-lahore" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">3D House Elevation Design</router-link></li>
              <li><router-link to="/facade-elevation-design" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern Front Facade Design</router-link></li>
              <li><router-link to="/facade-elevation-design" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Contemporary Elevation Plans</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Residential Architectural Design</router-link></li>
              <li><router-link to="/space-planning-services-lahore" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Residential Architecture Projects</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern House Architectural Plans</router-link></li>
              <li><router-link to="/architectural-residential-planning" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Luxury Villa Design Lahore</router-link></li>
              <li><router-link to="/full-scale-construction-company-in-lahore" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Turnkey House Construction Plans</router-link></li>
            </ul>
          </div>

          <!-- Column 3: Furniture -->
          <div>
            <h3 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Furniture
            </h3>
            <ul class="divide-y divide-gray-100 dark:divide-brand-border/40 text-sm">
              <li><router-link to="/residential-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Furniture Stores in Lahore</router-link></li>
              <li><router-link to="/residential-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Furniture Showrooms in DHA Lahore</router-link></li>
              <li><router-link to="/customized-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Furniture Manufacturers in Lahore</router-link></li>
              <li><router-link to="/customized-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern Furniture Design</router-link></li>
              <li><router-link to="/customized-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Customized Furniture Lahore</router-link></li>
              <li><router-link to="/customized-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Bespoke Made-to-Order Furniture</router-link></li>
              <li><router-link to="/customized-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Custom Wood Furniture</router-link></li>
              <li><router-link to="/residential-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Residential Home Furniture</router-link></li>
              <li><router-link to="/residential-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Luxury Living Room Furniture</router-link></li>
              <li><router-link to="/residential-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Modern Bedroom Furniture</router-link></li>
              <li><router-link to="/commercial-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Commercial Furniture Solutions</router-link></li>
              <li><router-link to="/commercial-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Office & Executive Furniture</router-link></li>
              <li><router-link to="/commercial-furniture" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Office Desks & Workstations</router-link></li>
              <li><router-link to="/decor" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Luxury Dining Sets & Sofas</router-link></li>
              <li><router-link to="/decor" class="py-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-700 dark:hover:text-brand-gold hover:pl-1 transition-all block">Home Decor & Furnishings</router-link></li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- Trusted Clients Carousel -->
    <ClientLogosCarousel />

    <!-- Project Gallery -->
    <ProjectGallery :gallery="pageData?.gallery" />

    <!-- Statistics Strip -->
    <section class="py-16 bg-[#faf9f6] dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-brand-border shadow-sm dark:shadow-none transition-colors duration-300">
            <div class="text-3xl sm:text-4xl font-heading font-black text-amber-700 dark:text-brand-gold">350+</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Completed Projects</div>
          </div>
          <div class="p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-brand-border shadow-sm dark:shadow-none transition-colors duration-300">
            <div class="text-3xl sm:text-4xl font-heading font-black text-amber-700 dark:text-brand-gold">12+</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Years Experience</div>
          </div>
          <div class="p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-brand-border shadow-sm dark:shadow-none transition-colors duration-300">
            <div class="text-3xl sm:text-4xl font-heading font-black text-amber-700 dark:text-brand-gold">14+</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Design Honors</div>
          </div>
          <div class="p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-brand-border shadow-sm dark:shadow-none transition-colors duration-300">
            <div class="text-3xl sm:text-4xl font-heading font-black text-amber-700 dark:text-brand-gold">100%</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Turnkey Guarantee</div>
          </div>
        </div>
      </div>
    </section>

    <!-- In-Article / Mid-page AdSense Slot -->
    <AdSenseSlot slot-type="inArticle" />

    <!-- FAQs Accordion -->
    <FaqAccordion :faqs="pageData?.faqs" />

    <!-- Call to Action Banner -->
    <CtaBanner :cta-data="pageData?.cta" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPage } from '../api';
import { useSeo } from '../composables/useSeo';
import HeroBanner from '../components/common/HeroBanner.vue';
import OverviewSection from '../components/common/OverviewSection.vue';
import SectionCardsGrid from '../components/common/SectionCardsGrid.vue';
import ClientLogosCarousel from '../components/common/ClientLogosCarousel.vue';
import ProjectGallery from '../components/common/ProjectGallery.vue';
import FaqAccordion from '../components/common/FaqAccordion.vue';
import CtaBanner from '../components/common/CtaBanner.vue';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const { setMeta } = useSeo();
const pageData = ref(null);

onMounted(async () => {
  try {
    const data = await getPage('home');
    pageData.value = data;
    setMeta(data);
  } catch (err) {
    console.error('Error fetching home page:', err);
  }
});
</script>
