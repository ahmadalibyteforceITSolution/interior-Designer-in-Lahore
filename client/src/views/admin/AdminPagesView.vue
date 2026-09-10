<template>
  <div class="space-y-6">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Page Content & Section CMS
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Select any of the 30 pages from the header navigation to edit, add, or delete its Hero, Overview, Features, Gallery, FAQs, or CTA sections.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter pages by title or slug..."
          class="bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 text-xs outline-none w-64"
        />
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-brand-border pb-3 text-xs font-bold uppercase tracking-wider">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="selectedCategory = cat.id"
        :class="[
          'px-4 py-2 transition-colors rounded-sm',
          selectedCategory === cat.id
            ? 'bg-brand-gold text-black shadow-gold-glow'
            : 'bg-[#181818] text-gray-300 hover:bg-[#252525] hover:text-white'
        ]"
      >
        {{ cat.name }} ({{ getCategoryCount(cat.id) }})
      </button>
    </div>

    <!-- Pages Table -->
    <div class="bg-brand-surface border border-brand-border overflow-hidden">
      
      <div v-if="loading" class="text-center py-20 text-brand-gold font-mono text-xs uppercase tracking-widest">
        Loading Pages from MongoDB...
      </div>

      <div v-else-if="filteredPages.length === 0" class="text-center py-16 text-gray-400 text-xs">
        No pages matching your filter.
      </div>

      <table v-else class="w-full text-left text-xs">
        <thead class="bg-[#161616] text-gray-400 uppercase tracking-wider border-b border-brand-border">
          <tr>
            <th class="py-3.5 px-4">Page Title & Navigation Item</th>
            <th class="py-3.5 px-4">URL Route Slug</th>
            <th class="py-3.5 px-4">Category</th>
            <th class="py-3.5 px-4">Last Updated</th>
            <th class="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border/60">
          <tr
            v-for="page in filteredPages"
            :key="page.slug"
            class="hover:bg-[#141414] transition-colors"
          >
            <td class="py-3 px-4 font-bold text-white flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span>{{ page.title }}</span>
            </td>
            <td class="py-3 px-4 text-gray-400 font-mono">
              /{{ page.slug === 'home' ? '' : page.slug }}
            </td>
            <td class="py-3 px-4">
              <span class="px-2.5 py-1 bg-black border border-brand-border text-brand-gold text-[10px] uppercase tracking-wider rounded">
                {{ formatCategory(page.category) }}
              </span>
            </td>
            <td class="py-3 px-4 text-gray-400">
              {{ page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'Active' }}
            </td>
            <td class="py-3 px-4 text-right space-x-2">
              <router-link
                :to="`/admin/pages/${page.slug}`"
                class="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-light text-black font-bold uppercase tracking-wider text-[10px] rounded transition-colors inline-block"
              >
                Edit Sections
              </router-link>
              <a
                :href="`/${page.slug === 'home' ? '' : page.slug}`"
                target="_blank"
                class="px-3 py-1.5 border border-brand-border text-gray-300 hover:text-brand-gold hover:border-brand-gold text-[10px] uppercase tracking-wider rounded transition-colors inline-block"
              >
                View Live
              </a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPages } from '../../api';

const route = useRoute();
const pages = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref(route.query.category || 'all');

const categories = [
  { id: 'all', name: 'All 30 Pages' },
  { id: 'main', name: 'Main Pages' },
  { id: 'interior-design', name: 'Interior Design (8)' },
  { id: 'architectural-designs', name: 'Architecture (7)' },
  { id: 'construction-services', name: 'Construction (4)' },
  { id: 'furniture', name: 'Furniture (4)' },
  { id: 'legal', name: 'Legal & Policy (3)' },
];

function getCategoryCount(catId) {
  if (catId === 'all') return pages.value.length;
  return pages.value.filter(p => p.category === catId).length;
}

function formatCategory(cat) {
  if (!cat) return 'General';
  return cat.replace('-', ' ');
}

const filteredPages = computed(() => {
  return pages.value.filter(p => {
    const matchesCat = selectedCategory.value === 'all' || p.category === selectedCategory.value;
    const matchesSearch = !searchQuery.value ||
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCat && matchesSearch;
  });
});

onMounted(async () => {
  try {
    const data = await getPages();
    pages.value = data;
  } catch (err) {
    console.error('Error fetching pages:', err);
  } finally {
    loading.value = false;
  }
});
</script>
