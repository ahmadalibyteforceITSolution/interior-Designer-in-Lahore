<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <!-- Hero Banner -->
    <section class="relative pt-32 pb-20 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">INSIGHTS & PERSPECTIVES</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight">
          ARCHITECTURAL DESIGN & INTERIOR JOURNAL
        </h1>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Authoritative articles on Lahore real estate trends, construction cost frameworks, and luxury interior design techniques.
        </p>

        <!-- Search and Category Filters -->
        <div class="pt-6 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            v-model="search"
            @input="handleSearch"
            type="text"
            placeholder="Search articles (e.g. 1 Kanal, Cost, Minimalist)..."
            class="flex-1 bg-[#faf9f6] dark:bg-black border border-gray-300 dark:border-brand-border focus:border-amber-600 dark:focus:border-brand-gold text-gray-900 dark:text-white px-4 py-2.5 text-xs outline-none"
          />
          <select
            v-model="selectedCategory"
            @change="handleFilter"
            class="bg-[#faf9f6] dark:bg-black border border-gray-300 dark:border-brand-border focus:border-amber-600 dark:focus:border-brand-gold text-gray-900 dark:text-white px-4 py-2.5 text-xs outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Architecture">Architecture</option>
            <option value="Construction">Construction</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Top AdSense Slot -->
    <AdSenseSlot slot-type="header" />

    <!-- Blog Posts Grid -->
    <section class="py-16 bg-[#faf9f6] dark:bg-black transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div v-if="loading" class="text-center py-20 text-amber-700 dark:text-brand-gold font-mono text-xs uppercase tracking-widest">
          Loading Articles...
        </div>

        <div v-else-if="blogs.length === 0" class="text-center py-20 text-gray-600 dark:text-gray-400 text-sm">
          No articles found matching your criteria. Try adjusting your search query.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          
          <article
            v-for="blog in blogs"
            :key="blog.slug"
            class="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border hover:border-amber-600/60 dark:hover:border-brand-gold/60 transition-all duration-300 group flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-gold-glow"
          >
            <div>
              <!-- Featured Image -->
              <router-link :to="`/blog/${blog.slug}`" class="block h-64 overflow-hidden relative">
                <img
                  :src="blog.featuredImage || '/uploads/01-01-8.jpg'"
                  :alt="blog.title"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-black/80 border border-brand-gold text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                    {{ blog.category }}
                  </span>
                </div>
              </router-link>

              <!-- Body -->
              <div class="p-6 space-y-3">
                <div class="flex items-center gap-3 text-[11px] text-gray-500 font-mono">
                  <span>{{ blog.author }}</span>
                  <span>•</span>
                  <span>{{ blog.readTime }}</span>
                  <span>•</span>
                  <span>{{ new Date(blog.createdAt).toLocaleDateString() }}</span>
                </div>

                <h2 class="text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-brand-gold transition-colors leading-snug">
                  <router-link :to="`/blog/${blog.slug}`">
                    {{ blog.title }}
                  </router-link>
                </h2>

                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {{ blog.excerpt }}
                </p>

                <!-- Tags -->
                <div v-if="blog.tags?.length" class="flex flex-wrap gap-1.5 pt-2">
                  <span
                    v-for="tag in blog.tags"
                    :key="tag"
                    class="px-2 py-0.5 bg-gray-100 dark:bg-[#1f1f1f] text-gray-600 dark:text-gray-400 text-[10px] tracking-wide"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer Action -->
            <div class="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-brand-border/40 flex items-center justify-between">
              <router-link
                :to="`/blog/${blog.slug}`"
                class="text-xs font-bold text-amber-700 dark:text-brand-gold hover:text-amber-800 dark:hover:text-brand-gold-light uppercase tracking-wider flex items-center gap-2"
              >
                <span>READ COMPLETE ARTICLE</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </router-link>
            </div>

          </article>

        </div>

      </div>
    </section>

    <!-- Bottom AdSense Slot -->
    <AdSenseSlot slot-type="footer" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBlogs } from '../api';
import { useSeo } from '../composables/useSeo';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const { setMeta } = useSeo();

const blogs = ref([]);
const loading = ref(true);
const search = ref('');
const selectedCategory = ref('All');

async function loadBlogs() {
  loading.value = true;
  try {
    const data = await getBlogs({
      category: selectedCategory.value,
      search: search.value
    });
    blogs.value = data;
  } catch (err) {
    console.error('Error fetching blogs:', err);
  } finally {
    loading.value = false;
  }
}

let searchTimer = null;
function handleSearch() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    loadBlogs();
  }, 350);
}

function handleFilter() {
  loadBlogs();
}

onMounted(() => {
  setMeta({
    title: 'Architectural & Interior Design Journal | Spaces & Places Lahore',
    metaDescription: 'Read the latest expert guides on architectural planning, construction costs, interior trends, and space optimization in Lahore, Pakistan.',
    focusKeywords: 'Interior Design Blog Pakistan, House Construction Guide Lahore, Architecture Articles'
  });
  loadBlogs();
});
</script>
