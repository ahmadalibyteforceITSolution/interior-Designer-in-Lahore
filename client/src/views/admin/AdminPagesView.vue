<template>
  <div class="space-y-6 pb-16">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Page Content & Section CMS
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Manage all live website pages, create new dynamic service pages, and customize their hero, overview, service cards, gallery, FAQs, and CTA sections.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter pages by title or slug..."
          class="bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 text-xs outline-none w-52 sm:w-60"
        />

        <button
          @click="openCreateModal"
          class="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow flex items-center gap-1.5 whitespace-nowrap"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Page</span>
        </button>
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
            <td class="py-3 px-4 text-right space-x-2 whitespace-nowrap">
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
              <button
                v-if="!isProtected(page.slug)"
                @click="handleDeletePage(page)"
                :disabled="deletingSlug === page.slug"
                class="px-2.5 py-1.5 border border-red-900/60 text-red-400 hover:bg-red-950/50 text-[10px] uppercase tracking-wider rounded transition-colors inline-block disabled:opacity-40"
              >
                <span v-if="deletingSlug === page.slug">Deleting...</span>
                <span v-else>Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- CREATE NEW PAGE MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-2xl bg-brand-surface border border-brand-border p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div class="absolute top-0 left-0 right-0 h-1 bg-brand-gold"></div>

        <div class="flex items-center justify-between border-b border-brand-border pb-4">
          <div>
            <span class="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Page Creation Wizard</span>
            <h2 class="text-xl font-heading font-black text-white uppercase mt-0.5">
              Create New Website Page
            </h2>
          </div>
          <button
            @click="showModal = false"
            class="text-gray-400 hover:text-white text-lg font-mono p-1"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="handleCreatePage" class="space-y-4 text-xs">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
              Page Title * (e.g., Luxury Penthouse Interior Design Lahore)
            </label>
            <input
              v-model="newPage.title"
              @input="onTitleInput"
              type="text"
              required
              placeholder="Enter comprehensive page title..."
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2.5 outline-none font-bold text-sm"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
                URL Route Slug * (e.g., penthouse-interior-lahore)
              </label>
              <div class="flex items-center bg-black border border-brand-border focus-within:border-brand-gold px-3 py-2">
                <span class="text-brand-gold font-mono mr-1">/</span>
                <input
                  v-model="newPage.slug"
                  type="text"
                  required
                  placeholder="custom-url-slug"
                  class="w-full bg-transparent text-white outline-none font-mono text-xs"
                />
              </div>
              <p class="text-[10px] text-gray-500 mt-1">Auto-generated from title. Alphanumeric and hyphens only.</p>
            </div>

            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
                Category *
              </label>
              <select
                v-model="newPage.category"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2.5 outline-none"
              >
                <option value="interior-design">Interior Design</option>
                <option value="architectural-designs">Architectural Designs</option>
                <option value="construction-services">Construction Services</option>
                <option value="furniture">Custom Furniture</option>
                <option value="commercial">Commercial & Retail</option>
                <option value="main">Main Core Page</option>
                <option value="legal">Legal & Policy</option>
              </select>
            </div>
          </div>

          <!-- SEO Meta Preview -->
          <div class="bg-black/60 border border-brand-border/80 p-4 space-y-3 rounded">
            <h4 class="text-brand-gold font-bold uppercase text-[11px] tracking-wider flex items-center gap-2">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              SEO Meta & Google Search Tags (Auto-Populated)
            </h4>

            <div>
              <label class="block text-gray-400 font-medium mb-1 text-[11px]">Meta Title Tag</label>
              <input
                v-model="newPage.metaTitle"
                type="text"
                class="w-full bg-[#141414] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none text-xs"
              />
            </div>

            <div>
              <label class="block text-gray-400 font-medium mb-1 text-[11px]">Meta Description (Google Snippet)</label>
              <textarea
                v-model="newPage.metaDescription"
                rows="2"
                class="w-full bg-[#141414] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none text-xs resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-gray-400 font-medium mb-1 text-[11px]">Focus Keywords (Comma Separated)</label>
              <input
                v-model="newPage.focusKeywords"
                type="text"
                class="w-full bg-[#141414] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none text-xs font-mono"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-brand-border">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 border border-brand-border text-gray-300 hover:text-white uppercase font-bold text-xs rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="creating"
              class="px-6 py-2 bg-brand-gold hover:bg-brand-gold-light text-black uppercase font-bold text-xs tracking-wider rounded transition-colors shadow-gold-glow disabled:opacity-50 flex items-center gap-2"
            >
              <span v-if="creating">CREATING & SCAFFOLDING...</span>
              <span v-else>CREATE PAGE & OPEN SECTION EDITOR →</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPages, createPage, deletePage } from '../../api';
import { useToast } from '../../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();

const pages = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref(route.query.category || 'all');

const showModal = ref(false);
const creating = ref(false);
const deletingSlug = ref(null);

const PROTECTED_SLUGS = ['home', 'about-us', 'our-clients', 'contact', 'blogs', 'privacy-policy', 'terms-conditions', 'disclaimer'];

function isProtected(slug) {
  return PROTECTED_SLUGS.includes(slug);
}

const newPage = ref({
  title: '',
  slug: '',
  category: 'interior-design',
  metaTitle: '',
  metaDescription: '',
  focusKeywords: ''
});

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function onTitleInput() {
  const generatedSlug = slugify(newPage.value.title);
  newPage.value.slug = generatedSlug;
  newPage.value.metaTitle = newPage.value.title ? `${newPage.value.title} | Spaces & Places Lahore` : '';
  newPage.value.metaDescription = newPage.value.title
    ? `Discover bespoke luxury ${newPage.value.title} by Spaces & Places, leading architects and interior designers in Lahore.`
    : '';
  newPage.value.focusKeywords = newPage.value.title
    ? `${newPage.value.title}, Interior Designers in Lahore, Architects in Lahore`
    : '';
}

function openCreateModal() {
  newPage.value = {
    title: '',
    slug: '',
    category: selectedCategory.value !== 'all' ? selectedCategory.value : 'interior-design',
    metaTitle: '',
    metaDescription: '',
    focusKeywords: ''
  };
  showModal.value = true;
}

async function handleCreatePage() {
  const cleanSlug = slugify(newPage.value.slug || newPage.value.title);
  if (!cleanSlug) {
    showToast('Please enter a valid page title and route slug', 'error');
    return;
  }

  creating.value = true;
  try {
    const payload = {
      title: newPage.value.title.trim(),
      slug: cleanSlug,
      category: newPage.value.category,
      metaTitle: newPage.value.metaTitle,
      metaDescription: newPage.value.metaDescription,
      focusKeywords: newPage.value.focusKeywords
    };

    const res = await createPage(payload);
    showToast(`Page "/${cleanSlug}" created successfully!`, 'success');
    showModal.value = false;

    // Refresh local list
    pages.value.unshift(res.page || payload);

    // Redirect to edit its sections immediately
    router.push(`/admin/pages/${cleanSlug}`);
  } catch (err) {
    showToast('Error creating page: ' + err.message, 'error');
  } finally {
    creating.value = false;
  }
}

async function handleDeletePage(page) {
  if (isProtected(page.slug)) {
    showToast('Core system pages cannot be deleted.', 'error');
    return;
  }

  const confirmed = window.confirm(`Are you sure you want to permanently delete "/${page.slug}" (${page.title})? This will remove its live URL and all sections.`);
  if (!confirmed) return;

  deletingSlug.value = page.slug;
  try {
    const targetIdentifier = page._id || page.slug;
    await deletePage(targetIdentifier);
    pages.value = pages.value.filter(p => (page._id ? p._id !== page._id : p.slug !== page.slug));
    showToast(`Page "/${page.slug}" deleted successfully.`, 'success');
  } catch (err) {
    showToast('Error deleting page: ' + err.message, 'error');
  } finally {
    deletingSlug.value = null;
  }
}

const categories = [
  { id: 'all', name: 'All Pages' },
  { id: 'main', name: 'Main Pages' },
  { id: 'interior-design', name: 'Interior Design' },
  { id: 'architectural-designs', name: 'Architecture' },
  { id: 'construction-services', name: 'Construction' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'legal', name: 'Legal & Policy' },
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
