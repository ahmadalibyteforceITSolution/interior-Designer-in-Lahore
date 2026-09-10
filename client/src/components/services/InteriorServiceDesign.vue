<template>
  <section class="py-16 bg-[#111111] border-y border-brand-border/60 text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-border pb-6">
        <div>
          <span class="text-[11px] font-bold text-brand-gold tracking-widest uppercase flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-gold"></span>
            MATERIALITY & TACTILE FINISHES
          </span>
          <h2 class="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase mt-2">
            Bespoke Material & Finishes Palette
          </h2>
        </div>
        <p class="text-xs text-gray-400 max-w-md leading-relaxed">
          Every interior curated by Spaces & Places incorporates authentic, noble materials tested for durability, acoustic resonance, and sensory luxury in Lahore residences.
        </p>
      </div>

      <!-- 4 Material Swatches Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Swatch 1: Italian Marble -->
        <div class="bg-black border border-brand-border p-5 space-y-4 hover:border-brand-gold transition-colors duration-300 group">
          <div class="h-44 w-full bg-[#1c1c1c] overflow-hidden relative">
            <img src="/uploads/01-01-8.jpg" alt="Italian Calacatta Marble" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-brand-gold font-mono uppercase">Stone Atelier</span>
          </div>
          <div>
            <h3 class="text-sm font-heading font-bold uppercase tracking-wider text-white">Italian Calacatta & Statuario</h3>
            <p class="text-[11px] text-gray-400 mt-1 leading-relaxed">Book-matched natural marble slabs with low-porosity sealers, honed to an exquisite velvet-matte finish.</p>
          </div>
          <div class="pt-2 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>ORIGIN: CARRARA, ITALY</span>
            <span class="text-brand-gold">HONED / POLISHED</span>
          </div>
        </div>

        <!-- Swatch 2: Solid Hardwoods -->
        <div class="bg-black border border-brand-border p-5 space-y-4 hover:border-brand-gold transition-colors duration-300 group">
          <div class="h-44 w-full bg-[#1c1c1c] overflow-hidden relative">
            <img src="/uploads/01-05-6.jpg" alt="Seasoned Hardwoods" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-brand-gold font-mono uppercase">Joinery</span>
          </div>
          <div>
            <h3 class="text-sm font-heading font-bold uppercase tracking-wider text-white">Burmese Teak & American Walnut</h3>
            <p class="text-[11px] text-gray-400 mt-1 leading-relaxed">100% kiln-dried hardwoods with moisture content strictly under 10% to prevent seasonal warping in Punjab climate.</p>
          </div>
          <div class="pt-2 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>SEASONED HARDWOOD</span>
            <span class="text-brand-gold"><10% MOISTURE</span>
          </div>
        </div>

        <!-- Swatch 3: Architectural Metals -->
        <div class="bg-black border border-brand-border p-5 space-y-4 hover:border-brand-gold transition-colors duration-300 group">
          <div class="h-44 w-full bg-[#1c1c1c] overflow-hidden relative">
            <img src="/uploads/01-01-14.jpg" alt="PVD Titanium Accents" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-brand-gold font-mono uppercase">Hardware</span>
          </div>
          <div>
            <h3 class="text-sm font-heading font-bold uppercase tracking-wider text-white">PVD Titanium Brass & Bronze</h3>
            <p class="text-[11px] text-gray-400 mt-1 leading-relaxed">Vapor-deposited physical titanium coatings ensuring tarnish-free, scratch-resistant cabinet pulls and door trims.</p>
          </div>
          <div class="pt-2 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>FINISH: PVD COATED</span>
            <span class="text-brand-gold">ANTI-TARNISH</span>
          </div>
        </div>

        <!-- Swatch 4: Acoustic Fabrics -->
        <div class="bg-black border border-brand-border p-5 space-y-4 hover:border-brand-gold transition-colors duration-300 group">
          <div class="h-44 w-full bg-[#1c1c1c] overflow-hidden relative">
            <img src="/uploads/01-02-10.jpg" alt="Acoustic Wall Slats" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-brand-gold font-mono uppercase">Textiles</span>
          </div>
          <div>
            <h3 class="text-sm font-heading font-bold uppercase tracking-wider text-white">Acoustic Wall Slats & Boucle</h3>
            <p class="text-[11px] text-gray-400 mt-1 leading-relaxed">High Martindale-rated stain-resistant upholstery combined with micro-perforated acoustic timber paneling.</p>
          </div>
          <div class="pt-2 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>ACOUSTIC RATING</span>
            <span class="text-brand-gold">NRC 0.85+</span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  page: {
    type: Object,
    default: () => ({})
  }
});
</script>