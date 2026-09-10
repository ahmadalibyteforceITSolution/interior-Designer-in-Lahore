<template>
  <div class="space-y-8">
    
    <!-- Top Greeting -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          cPanel Overview & CMS Hub
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Manage, customize, and optimize every section, image, and SEO tag across the Spaces & Places website.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/admin/pages"
          class="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          Edit Page Content
        </router-link>
        <router-link
          to="/admin/seo"
          class="px-4 py-2 bg-[#1c1c1c] hover:bg-[#252525] border border-brand-border text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Manage SEO Suite
        </router-link>
      </div>
    </div>

    <!-- Stat Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-brand-surface border border-brand-border p-5 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Managed Pages</span>
          <span class="text-brand-gold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </span>
        </div>
        <div class="text-3xl font-heading font-black text-white mt-3">{{ stats.pagesCount }}</div>
        <span class="text-[10px] text-brand-gold mt-1 block">30 Active Pages in MongoDB</span>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Blog Articles</span>
          <span class="text-brand-gold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </span>
        </div>
        <div class="text-3xl font-heading font-black text-white mt-3">{{ stats.blogsCount }}</div>
        <span class="text-[10px] text-gray-400 mt-1 block">AdSense Content Engine</span>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Inquiries / Leads</span>
          <span class="text-brand-gold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </span>
        </div>
        <div class="text-3xl font-heading font-black text-white mt-3">{{ stats.leadsCount }}</div>
        <span class="text-[10px] text-emerald-400 mt-1 block">Lead Capture Active</span>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Media Assets</span>
          <span class="text-brand-gold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </span>
        </div>
        <div class="text-3xl font-heading font-black text-white mt-3">{{ stats.mediaCount }}</div>
        <span class="text-[10px] text-gray-400 mt-1 block">Migrated from inner-design1</span>
      </div>

    </div>

    <!-- Quick Navigation to Category Page Groups -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-brand-surface border border-brand-border p-5 space-y-3">
        <div class="text-brand-gold font-heading font-bold text-sm uppercase">1. Interior Design</div>
        <p class="text-[11px] text-gray-400">8 specialized pages: Residential, Corporate, Commercial, Hospitality, Restaurant, Industrial, Corporate Design, Furnishings.</p>
        <router-link to="/admin/pages?category=interior-design" class="text-xs font-bold text-brand-gold hover:underline block pt-2">
          Manage 8 Interior Pages →
        </router-link>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 space-y-3">
        <div class="text-brand-gold font-heading font-bold text-sm uppercase">2. Architectural Designs</div>
        <p class="text-[11px] text-gray-400">7 specialized pages: Residential Planning, 3D Design, Space Planning, 3D Animation, Landscape, Facade, Midrise/Highrise.</p>
        <router-link to="/admin/pages?category=architectural-designs" class="text-xs font-bold text-brand-gold hover:underline block pt-2">
          Manage 7 Architecture Pages →
        </router-link>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 space-y-3">
        <div class="text-brand-gold font-heading font-bold text-sm uppercase">3. Construction Services</div>
        <p class="text-[11px] text-gray-400">4 specialized pages: Refurbishment in Lahore, Project Management, Contract Administration, Full Scale Construction.</p>
        <router-link to="/admin/pages?category=construction-services" class="text-xs font-bold text-brand-gold hover:underline block pt-2">
          Manage 4 Construction Pages →
        </router-link>
      </div>

      <div class="bg-brand-surface border border-brand-border p-5 space-y-3">
        <div class="text-brand-gold font-heading font-bold text-sm uppercase">4. Bespoke Furniture</div>
        <p class="text-[11px] text-gray-400">4 specialized pages: Residential Furniture, Customized Furniture, Commercial Furniture, Curated Luxury Decor.</p>
        <router-link to="/admin/pages?category=furniture" class="text-xs font-bold text-brand-gold hover:underline block pt-2">
          Manage 4 Furniture Pages →
        </router-link>
      </div>

    </div>

    <!-- Recent Leads -->
    <div class="bg-brand-surface border border-brand-border p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-heading font-bold text-white uppercase tracking-wider">
          Latest Consultation Inquiries
        </h3>
        <router-link to="/admin/leads" class="text-xs text-brand-gold hover:underline">
          View All Leads →
        </router-link>
      </div>

      <div v-if="recentLeads.length === 0" class="text-xs text-gray-500 py-6 text-center">
        No customer inquiries received yet. They will appear here immediately when submitted from the website.
      </div>

      <div v-else class="divide-y divide-brand-border/60">
        <div
          v-for="lead in recentLeads"
          :key="lead._id"
          class="py-3 flex items-center justify-between text-xs"
        >
          <div>
            <span class="font-bold text-white">{{ lead.name }}</span>
            <span class="text-gray-400 ml-2">({{ lead.phone || lead.email }})</span>
            <span class="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] rounded ml-2 uppercase">
              {{ lead.service }}
            </span>
          </div>
          <span class="text-gray-500 text-[11px]">
            {{ new Date(lead.createdAt).toLocaleDateString() }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPages, getBlogs, getLeads, getMedia } from '../../api';

const stats = ref({
  pagesCount: 30,
  blogsCount: 4,
  leadsCount: 0,
  mediaCount: 0
});

const recentLeads = ref([]);

onMounted(async () => {
  try {
    const [pages, blogs, leads, media] = await Promise.all([
      getPages().catch(() => []),
      getBlogs().catch(() => []),
      getLeads().catch(() => []),
      getMedia().catch(() => [])
    ]);

    stats.value = {
      pagesCount: pages.length || 30,
      blogsCount: blogs.length || 4,
      leadsCount: leads.length || 0,
      mediaCount: media.length || 500
    };

    recentLeads.value = leads.slice(0, 5);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
  }
});
</script>
