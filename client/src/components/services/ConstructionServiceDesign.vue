<template>
  <section class="py-16 bg-[#0f0e0c] border-y border-amber-900/40 text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Heading with Safety Striping Accent -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-800/40 pb-6">
        <div>
          <span class="text-[11px] font-bold text-amber-500 tracking-widest uppercase flex items-center gap-2 font-mono">
            <span class="w-2.5 h-2.5 bg-amber-500"></span>
            HEAVY ENGINEERING & STRUCTURAL BENCHMARKS
          </span>
          <h2 class="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase mt-2 text-white">
            Turnkey Construction Standards Matrix
          </h2>
        </div>
        <p class="text-xs text-gray-400 max-w-md leading-relaxed">
          We eliminate structural shortcuts. Every Spaces & Places construction site operates under daily certified PEC engineering supervision and third-party laboratory verification.
        </p>
      </div>

      <!-- Construction Engineering Benchmarks Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="bg-[#181614] border border-amber-900/50 p-6 space-y-3 relative hover:border-amber-500 transition-colors">
          <div class="text-amber-500 font-mono text-xs uppercase font-bold tracking-wider">01. STEEL REINFORCEMENT</div>
          <h3 class="text-lg font-heading font-black text-white uppercase">Grade-60 Deformed Rebar</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Exclusively Mughal or Amreli prime Grade-60 steel (60,000 PSI yield strength) with manufacturer mill test certificates for every batch.</p>
          <div class="pt-3 border-t border-amber-900/30 text-[10px] text-amber-400 font-mono">STANDARD: ASTM A615 / GRADE-60</div>
        </div>

        <div class="bg-[#181614] border border-amber-900/50 p-6 space-y-3 relative hover:border-amber-500 transition-colors">
          <div class="text-amber-500 font-mono text-xs uppercase font-bold tracking-wider">02. READY-MIX CONCRETE</div>
          <h3 class="text-lg font-heading font-black text-white uppercase">3,000+ PSI Cylinder Tested</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Computerized batching plant RMC concrete for all structural footings, columns, and slabs with mandatory 7-day and 28-day compression break reports.</p>
          <div class="pt-3 border-t border-amber-900/30 text-[10px] text-amber-400 font-mono">LABORATORY COMPRESSION VERIFIED</div>
        </div>

        <div class="bg-[#181614] border border-amber-900/50 p-6 space-y-3 relative hover:border-amber-500 transition-colors">
          <div class="text-amber-500 font-mono text-xs uppercase font-bold tracking-wider">03. DAMP PROOFING (DPC)</div>
          <h3 class="text-lg font-heading font-black text-white uppercase">Double-Layer Bitumen Chemical</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Specialized subterranean capillary moisture barrier and Termite-Shield chemical soil treatment backing a 10-year damp-free warranty.</p>
          <div class="pt-3 border-t border-amber-900/30 text-[10px] text-amber-400 font-mono">10-YEAR DAMP PROOF WARRANTY</div>
        </div>

      </div>

      <!-- Turnkey Timeline Bar -->
      <div class="p-6 bg-black border border-amber-900/40 rounded space-y-4">
        <h4 class="text-xs font-heading font-bold text-amber-500 uppercase tracking-widest font-mono">
          PHASED CONSTRUCTION MILESTONES
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div class="p-3 bg-[#161412] border border-amber-900/30">
            <span class="text-amber-400 font-bold block mb-1">STAGE 01</span>
            <span class="text-white font-bold block">Soil Compaction & Raft</span>
            <span class="text-[10px] text-gray-400">Weeks 1-4</span>
          </div>
          <div class="p-3 bg-[#161412] border border-amber-900/30">
            <span class="text-amber-400 font-bold block mb-1">STAGE 02</span>
            <span class="text-white font-bold block">Column & Roof Slabs</span>
            <span class="text-[10px] text-gray-400">Weeks 5-12</span>
          </div>
          <div class="p-3 bg-[#161412] border border-amber-900/30">
            <span class="text-amber-400 font-bold block mb-1">STAGE 03</span>
            <span class="text-white font-bold block">Brickwork & MEP Conduits</span>
            <span class="text-[10px] text-gray-400">Weeks 13-20</span>
          </div>
          <div class="p-3 bg-[#161412] border border-amber-900/30">
            <span class="text-amber-400 font-bold block mb-1">STAGE 04</span>
            <span class="text-white font-bold block">Laser Screed & Handover</span>
            <span class="text-[10px] text-gray-400">Weeks 21-28</span>
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