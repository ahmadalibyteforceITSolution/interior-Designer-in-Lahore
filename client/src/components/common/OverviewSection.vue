<template>
  <section
    v-if="overviewData"
    class="py-20 relative overflow-hidden transition-colors duration-300 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Text content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-600/30 dark:border-brand-gold/30 text-amber-700 dark:text-brand-gold text-[11px] font-bold tracking-widest uppercase">
            {{ overviewData.badge || 'OVERVIEW' }}
          </div>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            {{ overviewData.title }}
          </h2>

          <p v-if="overviewData.subtitle" class="text-amber-700 dark:text-brand-gold font-medium text-sm tracking-wide">
            {{ overviewData.subtitle }}
          </p>

          <p v-if="overviewData.paragraph1" class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {{ overviewData.paragraph1 }}
          </p>

          <p v-if="overviewData.paragraph2" class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {{ overviewData.paragraph2 }}
          </p>

          <!-- Highlights Checklist -->
          <div v-if="overviewData.highlights?.length" class="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="(item, idx) in overviewData.highlights"
              :key="idx"
              class="flex items-start gap-2.5 text-xs text-gray-800 dark:text-gray-200"
            >
              <div class="mt-0.5 text-amber-600 dark:text-brand-gold shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Featured Image -->
        <div class="lg:col-span-5">
          <div class="relative group">
            <!-- Decorative Golden Frame -->
            <div class="absolute -inset-2 border border-amber-600/30 dark:border-brand-gold/30 transform translate-x-2 translate-y-2 pointer-events-none group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
            
            <div class="relative bg-gray-100 dark:bg-black border border-gray-200 dark:border-brand-border overflow-hidden shadow-2xl">
              <img
                :src="overviewData.image || '/uploads/01-01-8.jpg'"
                :alt="overviewData.title || 'Overview Image'"
                loading="lazy"
                class="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-xs text-brand-gold font-mono tracking-wider">
                SPACES & PLACES STUDIO • LAHORE
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  overviewData: {
    type: Object,
    default: null
  }
});
</script>
