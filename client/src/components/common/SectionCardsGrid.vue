<template>
  <section v-if="sections?.length" class="py-20 bg-[#f7f6f4] dark:bg-black transition-colors duration-300 relative border-b border-gray-200 dark:border-brand-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">
          {{ sectionBadge || 'CORE SPECIALIZATIONS' }}
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight">
          {{ sectionTitle || 'COMPREHENSIVE DESIGN & EXECUTION CAPABILITIES' }}
        </h2>
        <p v-if="sectionSubtitle" class="text-sm text-gray-600 dark:text-gray-400">
          {{ sectionSubtitle }}
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(card, index) in sections"
          :key="card.id || index"
          class="bg-white dark:bg-[#121212] border border-gray-200 dark:border-brand-border hover:border-amber-500 dark:hover:border-brand-gold/70 p-6 sm:p-8 transition-all duration-300 group relative flex flex-col justify-between shadow-sm hover:shadow-xl dark:hover:shadow-gold-glow rounded-none"
        >
          <!-- Card Content -->
          <div class="space-y-4">
            <!-- Top Row: Counter & Subtitle -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-brand-border/60 pb-4">
              <span class="text-xs font-mono font-bold text-amber-700 dark:text-brand-gold tracking-widest">
                {{ String(index + 1).padStart(2, '0') }} / 0{{ sections.length }}
              </span>
              <span class="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                {{ card.subtitle || 'Spaces & Places' }}
              </span>
            </div>

            <!-- Card Image if present -->
            <div v-if="card.image" class="w-full h-52 overflow-hidden my-3 border border-gray-200 dark:border-brand-border/40">
              <img
                :src="card.image"
                :alt="card.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <!-- Title -->
            <h3 class="text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-brand-gold transition-colors">
              {{ card.title }}
            </h3>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ card.description }}
            </p>

            <!-- Key Points Checklist -->
            <div v-if="card.points?.length" class="pt-2 space-y-1.5">
              <div
                v-for="(pt, pIdx) in card.points"
                :key="pIdx"
                class="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"
              >
                <div class="w-1.5 h-1.5 bg-amber-600 dark:bg-brand-gold rounded-full shrink-0"></div>
                <span>{{ pt }}</span>
              </div>
            </div>
          </div>

          <!-- Card Footer Action -->
          <div class="pt-6 mt-6 border-t border-gray-100 dark:border-brand-border/40 flex items-center justify-between">
            <button
              @click="openLetsTalk(card.title)"
              class="text-xs font-bold text-amber-700 dark:text-brand-gold hover:underline uppercase tracking-wider flex items-center gap-2 transition-transform group-hover:translate-x-1"
            >
              <span>INQUIRE ABOUT THIS</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useModal } from '../../composables/useModal';

defineProps({
  sections: {
    type: Array,
    default: () => []
  },
  sectionBadge: {
    type: String,
    default: ''
  },
  sectionTitle: {
    type: String,
    default: ''
  },
  sectionSubtitle: {
    type: String,
    default: ''
  }
});

const { openLetsTalk } = useModal();
</script>
