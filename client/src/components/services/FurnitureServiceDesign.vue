<template>
  <section class="py-16 bg-[#0e0c0b] border-y border-stone-800 text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
        <div>
          <span class="text-[11px] font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2 font-mono">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            IN-HOUSE ATELIER STANDARDS
          </span>
          <h2 class="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase mt-2">
            Bespoke Joinery & Furniture Engineering
          </h2>
        </div>
        <p class="text-xs text-gray-400 max-w-md leading-relaxed">
          Every piece of furniture is handcrafted in our dedicated Lahore workshop using certified seasoned hardwoods, German Blum hardware, and high-resilience ergonomic foams.
        </p>
      </div>

      <!-- 3 Atelier Benchmarks -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="bg-[#141210] border border-stone-800 p-6 space-y-4 hover:border-amber-400/80 transition-colors">
          <div class="w-12 h-12 rounded bg-amber-950/40 border border-amber-700/40 flex items-center justify-center text-amber-400 text-xl font-black">
            W1
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">Kiln-Dried Hardwood Integrity</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            We cure all Burmese Teak and American Walnut in climate-controlled kilns until moisture drops below 10%. Backed by a 10-year internal frame structural guarantee.
          </p>
          <div class="text-[10px] text-amber-400/80 font-mono">10-YEAR FRAME WARRANTY</div>
        </div>

        <div class="bg-[#141210] border border-stone-800 p-6 space-y-4 hover:border-amber-400/80 transition-colors">
          <div class="w-12 h-12 rounded bg-amber-950/40 border border-amber-700/40 flex items-center justify-center text-amber-400 text-xl font-black">
            H2
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">German Blum Concealed Hardware</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            All cabinet hinges, push-to-open mechanisms, and undermount soft-close drawer runners are sourced from Blum Austria with lifetime smooth-gliding guarantees.
          </p>
          <div class="text-[10px] text-amber-400/80 font-mono">BLUM AUSTRIA CONCEALED RUNNERS</div>
        </div>

        <div class="bg-[#141210] border border-stone-800 p-6 space-y-4 hover:border-amber-400/80 transition-colors">
          <div class="w-12 h-12 rounded bg-amber-950/40 border border-amber-700/40 flex items-center justify-center text-amber-400 text-xl font-black">
            E3
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">Multi-Density Ergonomic Cushioning</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            Triple-layer seating cores combining 32D high-support base foam, 40D memory foam contours, and a luxurious down-feather top layer for cloud-like comfort.
          </p>
          <div class="text-[10px] text-amber-400/80 font-mono">TRIPLE-LAYER FEATHER TOPPER</div>
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