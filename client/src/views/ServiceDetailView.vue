<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <!-- Loading State -->
    <div v-if="loading" class="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div class="w-12 h-12 border-4 border-amber-600 dark:border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs text-amber-700 dark:text-brand-gold font-mono uppercase tracking-widest">Loading Spaces & Places Experience...</p>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="error" class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h2 class="text-3xl font-heading font-black text-gray-900 dark:text-white">Page Not Found</h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md">The requested architectural service page could not be located or has been relocated.</p>
      <router-link to="/" class="px-6 py-3 bg-brand-gold text-black font-bold text-xs uppercase tracking-wider">
        Return to Home
      </router-link>
    </div>

    <!-- Main Dynamic Content -->
    <div v-else-if="pageData">
      
      <!-- Dynamic Hero Banner -->
      <HeroBanner
        :hero-data="pageData.hero"
        :category-name="pageData.category?.replace('-', ' ')"
        :service-name="pageData.title"
      />

      <!-- Top AdSense Slot -->
      <AdSenseSlot slot-type="header" />

      <!-- Overview Section -->
      <OverviewSection :overview-data="pageData.overview" />

      <!-- Detailed Section Cards (editable/deletable from admin) -->
      <SectionCardsGrid
        v-if="pageData.sections?.length"
        :sections="pageData.sections"
        :section-badge="pageData.sectionBadge || 'SERVICE CAPABILITIES'"
        :section-title="pageData.sectionTitle || `${pageData.title.toUpperCase()} ARCHITECTURE`"
        :section-subtitle="pageData.sectionSubtitle || 'Specialized deliverables, engineering methodologies, and noble material specifications.'"
      />

      <!-- In-Article / Mid-page AdSense Slot -->
      <AdSenseSlot slot-type="inArticle" />

      <!-- Dynamic Project Gallery -->
      <ProjectGallery
        v-if="pageData.gallery?.length"
        :gallery="pageData.gallery"
      />

      <!-- Dynamic FAQs (with Schema.org structured data) -->
      <FaqAccordion
        v-if="pageData.faqs?.length"
        :faqs="pageData.faqs"
      />

      <!-- Bottom Call to Action Banner -->
      <CtaBanner :cta-data="pageData.cta" />

    </div>

  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import defaultPages from '../data/defaultPages.json';
import { getPage } from '../api';
import { useSeo } from '../composables/useSeo';
import HeroBanner from '../components/common/HeroBanner.vue';
import OverviewSection from '../components/common/OverviewSection.vue';
import SectionCardsGrid from '../components/common/SectionCardsGrid.vue';
import ProjectGallery from '../components/common/ProjectGallery.vue';
import FaqAccordion from '../components/common/FaqAccordion.vue';
import CtaBanner from '../components/common/CtaBanner.vue';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const route = useRoute();
const { setMeta } = useSeo();

const currentSlug = computed(() => route.params.slug || route.path.replace(/^\//, ''));

function getInitialData(slug) {
  return defaultPages.find(p => p.slug === slug) || null;
}

const initial = getInitialData(currentSlug.value);
const pageData = ref(initial);
const loading = ref(!initial);
const error = ref(null);

if (initial) {
  setMeta(initial);
}

async function loadPageContent() {
  const slug = currentSlug.value;
  error.value = null;

  // Immediate fallback if not already set
  if (!pageData.value) {
    const fallback = getInitialData(slug);
    if (fallback) {
      pageData.value = fallback;
      setMeta(fallback);
      loading.value = false;
    }
  }

  try {
    const data = await getPage(slug, (fresh) => {
      if (fresh && fresh.title) {
        pageData.value = fresh;
        setMeta(fresh);
      }
    });
    if (data && data.title) {
      pageData.value = data;
      setMeta(data);
    }
  } catch (err) {
    if (!pageData.value) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
}

onMounted(loadPageContent);

watch(
  () => route.path,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fallback = getInitialData(currentSlug.value);
    if (fallback) {
      pageData.value = fallback;
      setMeta(fallback);
      loading.value = false;
    }
    loadPageContent();
  }
);
</script>
