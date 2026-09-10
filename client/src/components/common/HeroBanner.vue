<template>
  <section class="relative w-full min-h-[640px] lg:min-h-[760px] flex items-center justify-center overflow-hidden pt-20">
    
    <!-- Background Video (if available) -->
    <video
      v-if="heroData?.bgVideo"
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.92]"
    >
      <source :src="heroData.bgVideo" type="video/mp4" />
    </video>

    <!-- Background Image with Ken Burns Luxury Motion -->
    <div
      v-else
      class="absolute inset-0 w-full h-full bg-cover bg-center z-0 animate-ken-burns filter brightness-[0.92]"
      :style="{ backgroundImage: `url(${heroData?.bgImage || '/uploads/living-eye-level.jpg'})` }"
    ></div>

    <!-- Cinematic Balanced Overlays (Decreased Black Effect so Architecture is Visible) -->
    <div
      class="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/35 to-black/10"
    ></div>
    <div
      class="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-black/30"
    ></div>
    <!-- Ambient Gold Radial Glow -->
    <div
      class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl z-10 pointer-events-none animate-float"
    ></div>

    <!-- Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="max-w-3xl space-y-6 animate-fade-in-up">
        
        <!-- Breadcrumb / Badge -->
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold text-[11px] font-bold tracking-widest uppercase shadow-gold-glow backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
            {{ heroData?.badge || 'SPACES & PLACES STUDIO' }}
          </span>
          <span v-if="categoryName" class="text-xs text-gray-400 uppercase tracking-widest font-mono">
            / {{ categoryName }}
          </span>
        </div>

        <!-- Main Heading -->
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[1.12] drop-shadow-lg"
        >
          {{ heroData?.title || 'INTERIOR DESIGNER AND ARCHITECTS IN LAHORE' }}
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow-md">
          {{ heroData?.subtitle || 'From concept to completion, we combine creativity, precision, and craftsmanship to design breathtaking spaces that reflect your prestige and lifestyle.' }}
        </p>

        <!-- CTA Buttons -->
        <div class="pt-6 flex flex-wrap items-center gap-4">
          <button
            @click="openLetsTalk(serviceName || 'Consultation')"
            class="btn-gold-shimmer px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-black font-heading font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg flex items-center gap-3"
          >
            <span>{{ heroData?.ctaText || "LET'S TALK" }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

          <a
            :href="'tel:' + (settings.phone || '+923001999967')"
            class="px-6 py-4 border border-white/30 hover:border-brand-gold text-white hover:text-brand-gold text-xs font-heading font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-2.5"
          >
            <svg class="w-4 h-4 text-brand-gold shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
            </svg>
            <span>{{ settings.phone || '+92 300 1999967' }}</span>
          </a>
        </div>

      </div>
    </div>

    <!-- Floating Luxury Status Pill (Bottom Right) -->
    <div class="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-4 bg-black/60 backdrop-blur-md border border-brand-border/80 px-5 py-3 rounded-none shadow-2xl animate-float">
      <div class="w-3 h-3 rounded-full bg-brand-gold animate-pulse"></div>
      <div class="text-left font-mono text-[11px] leading-tight">
        <span class="text-white font-bold block uppercase tracking-wider">350+ Turnkey Projects</span>
        <span class="text-brand-gold">DHA • Bahria Town • Gulberg</span>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useModal } from '../../composables/useModal';
import { useSettings } from '../../composables/useSettings';

defineProps({
  heroData: {
    type: Object,
    default: () => ({})
  },
  categoryName: {
    type: String,
    default: ''
  },
  serviceName: {
    type: String,
    default: ''
  }
});

const { openLetsTalk } = useModal();
const { settings } = useSettings();
</script>
