<template>
  <section class="py-16 bg-[#0c0f12] border-y border-cyan-900/30 text-white relative overflow-hidden">
    
    <!-- Background Technical Drafting Grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-800/40 pb-6">
        <div>
          <span class="text-[11px] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-2 font-mono">
            <span class="w-2 h-2 rounded-sm bg-cyan-400"></span>
            ARCHITECTURAL METHODOLOGY & BYLAWS
          </span>
          <h2 class="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase mt-2">
            4-Step Architectural Master Planning Roadmap
          </h2>
        </div>
        <p class="text-xs text-gray-400 max-w-md leading-relaxed font-mono">
          Rigorous PCATP-compliant workflows connecting preliminary plot diagnostic studies to complete statutory authority sanctions in Lahore.
        </p>
      </div>

      <!-- 4-Step Technical Phased Roadmap -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Step 1 -->
        <div class="bg-[#12171d] border border-cyan-900/50 p-6 space-y-3 relative hover:border-cyan-400 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-2xl font-heading font-black text-cyan-400/30">01</span>
            <span class="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-mono">PHASE I</span>
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">Plot & Solar Diagnostic</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Soil bearing capacity testing, sun-path solar azimuth calculation, and prevailing wind vector analysis to minimize summer heat gain.</p>
          <ul class="text-[11px] text-cyan-200/80 space-y-1 pt-2 border-t border-cyan-900/40 font-mono">
            <li>* Sun-Shadow Angle Modeling</li>
            <li>* Soil Strata Core Drilling</li>
          </ul>
        </div>

        <!-- Step 2 -->
        <div class="bg-[#12171d] border border-cyan-900/50 p-6 space-y-3 relative hover:border-cyan-400 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-2xl font-heading font-black text-cyan-400/30">02</span>
            <span class="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-mono">PHASE II</span>
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">3D Ray-Traced Schematics</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Photorealistic 4K exterior renderings and immersive 1:1 scale Virtual Reality walkthroughs simulating all four seasons and evening lighting.</p>
          <ul class="text-[11px] text-cyan-200/80 space-y-1 pt-2 border-t border-cyan-900/40 font-mono">
            <li>* Unreal Engine 5 VR Simulation</li>
            <li>* Material & Texture Approval</li>
          </ul>
        </div>

        <!-- Step 3 -->
        <div class="bg-[#12171d] border border-cyan-900/50 p-6 space-y-3 relative hover:border-cyan-400 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-2xl font-heading font-black text-cyan-400/30">03</span>
            <span class="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-mono">PHASE III</span>
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">Structural Engineering</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Certified PEC structural calculations compliant with Zone 2B seismic codes, foundation beam schedules, and MEP integration.</p>
          <ul class="text-[11px] text-cyan-200/80 space-y-1 pt-2 border-t border-cyan-900/40 font-mono">
            <li>* Seismic Zone 2B Compliance</li>
            <li>* Clash-Free MEP Working Drawings</li>
          </ul>
        </div>

        <!-- Step 4 -->
        <div class="bg-[#12171d] border border-cyan-900/50 p-6 space-y-3 relative hover:border-cyan-400 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-2xl font-heading font-black text-cyan-400/30">04</span>
            <span class="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-300 font-mono">PHASE IV</span>
          </div>
          <h3 class="text-base font-heading font-bold uppercase text-white">Authority Sanctions</h3>
          <p class="text-xs text-gray-400 leading-relaxed">Complete liaison and submission portfolio management for DHA Lahore, Bahria Town, and LDA statutory building sanctions.</p>
          <ul class="text-[11px] text-cyan-200/80 space-y-1 pt-2 border-t border-cyan-900/40 font-mono">
            <li>* DHA & LDA Regulatory Approval</li>
            <li>* Fast-Track Sanction Handling</li>
          </ul>
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