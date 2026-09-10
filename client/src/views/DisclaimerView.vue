<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="LEGAL"
      service-name="Disclaimer"
    />

    <section class="py-20 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">Professional Architectural Advisory Notice</h2>
          <p>The information contained on this website is for general information purposes only. While Spaces & Places endeavors to keep the information up to date and correct, construction rates and soil variables vary significantly depending on plot location in DHA, Bahria Town, or Lahore municipal jurisdictions.</p>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">Engineering & Soil Specificity</h2>
          <p>Structural stability requires site-specific geotechnical soil testing, structural calculations, and seismic load analyses prior to foundation pouring.</p>
        </div>
      </div>
    </section>

    <CtaBanner :cta-data="pageData?.cta" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPage } from '../api';
import { useSeo } from '../composables/useSeo';
import HeroBanner from '../components/common/HeroBanner.vue';
import CtaBanner from '../components/common/CtaBanner.vue';

const { setMeta } = useSeo();
const pageData = ref(null);

onMounted(async () => {
  try {
    const data = await getPage('disclaimer');
    pageData.value = data;
    setMeta(data);
  } catch (err) {}
});
</script>
