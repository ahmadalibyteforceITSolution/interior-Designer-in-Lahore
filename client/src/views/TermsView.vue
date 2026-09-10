<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="LEGAL"
      service-name="Terms & Conditions"
    />

    <section class="py-20 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">1. Agreement to Terms</h2>
          <p>By accessing or using the Spaces & Places web platform and consulting services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">2. Intellectual Property Rights</h2>
          <p>All architectural drawings, 3D renderings, elevations, photographs, articles, and graphic branding showcased on Spaces & Places are the exclusive intellectual property of Spaces & Places and protected by copyright and intellectual property laws.</p>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">3. Quotations & BOQs</h2>
          <p>Preliminary estimates and Bill of Quantities (BOQs) generated or communicated are valid for 30 calendar days from issuance. Structural execution is governed by specific written contracts executed with our engineering department.</p>
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
    const data = await getPage('terms-conditions');
    pageData.value = data;
    setMeta(data);
  } catch (err) {}
});
</script>
