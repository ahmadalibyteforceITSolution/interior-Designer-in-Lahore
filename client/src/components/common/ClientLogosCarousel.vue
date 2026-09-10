<template>
  <section class="py-16 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border overflow-hidden transition-colors duration-300 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="text-center space-y-2">
        <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">PROVEN TRUST</span>
        <h3 class="text-xl sm:text-2xl md:text-3xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight">
          TRUSTED BY PRESTIGIOUS CORPORATE & COMMERCIAL BRANDS
        </h3>
      </div>
    </div>

    <!-- Infinite Continuous Marquee (Left to Right) -->
    <div class="relative w-full overflow-hidden marquee-wrapper py-2">
      <!-- Gradient Fade Edges -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-brand-surface to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-brand-surface to-transparent z-10 pointer-events-none"></div>

      <!-- Moving Track (Infinite Smooth Loop, moves left to right) -->
      <div class="marquee-track flex gap-6 items-center w-max">
        <div
          v-for="(client, index) in duplicatedClients"
          :key="index"
          class="h-24 w-52 shrink-0 bg-transparent border-0 p-3 flex items-center justify-center transition-all duration-300 group"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            loading="lazy"
            class="max-h-16 max-w-[175px] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const clients = [
  { name: 'Brighto Paints', logo: '/uploads/brighto-logo.png' },
  { name: 'Descon Engineering', logo: '/uploads/descon-logo.png' },
  { name: 'Jotun Paints', logo: '/uploads/jotun-logo.png' },
  { name: 'HA Steels', logo: '/uploads/ha-steels-logo.png' },
  { name: 'Leisure Salon', logo: '/uploads/leisure-salon-logo.png' },
  { name: 'American Club', logo: '/uploads/american-club-logo.png' },
  { name: 'Shawarma Stop', logo: '/uploads/shawarma-stop-logo.png' },
  { name: 'Prestige Cars', logo: '/uploads/prestige-cars-logo.png' },
  { name: 'Dastify', logo: '/uploads/dastify-logo.png' },
  { name: 'Biotech Packages', logo: '/uploads/biotech-packages-logo.png' },
  { name: 'Hussain Mills', logo: '/uploads/hussain-logo.png' },
  { name: 'Gifto', logo: '/uploads/gifto-logo.png' },
];

// Duplicate list 3 times for completely seamless infinite loop
const duplicatedClients = [...clients, ...clients, ...clients];
</script>

<style scoped>
.marquee-track {
  animation: moveLeftToRight 35s linear infinite;
}

.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes moveLeftToRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
