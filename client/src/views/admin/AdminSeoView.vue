<template>
  <div class="space-y-8 pb-16">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          cPanel SEO Suite & Google AdSense Hub
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Configure search engine rankings, meta tags, Google AdSense verification, sitemaps, and robots.txt.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="/sitemap.xml"
          target="_blank"
          class="px-4 py-2 border border-brand-border text-gray-300 hover:text-brand-gold text-xs font-bold uppercase rounded transition-colors flex items-center gap-1.5"
        >
          <span>View Live sitemap.xml</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
        <a
          href="/robots.txt"
          target="_blank"
          class="px-4 py-2 border border-brand-border text-gray-300 hover:text-brand-gold text-xs font-bold uppercase rounded transition-colors"
        >
          View robots.txt
        </a>
      </div>
    </div>

    <!-- Active SEO Page Editor -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Select Page to Edit SEO -->
      <div class="lg:col-span-4 bg-brand-surface border border-brand-border p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-brand-border pb-3">
          <h3 class="text-sm font-heading font-bold text-white uppercase">Select Page</h3>
          <span class="text-xs text-brand-gold font-mono">{{ seoList.length }} Pages</span>
        </div>

        <input
          v-model="pageSearch"
          type="text"
          placeholder="Search page..."
          class="w-full bg-black border border-brand-border text-white px-3 py-1.5 text-xs outline-none"
        />

        <div class="max-h-[520px] overflow-y-auto space-y-1 pr-1">
          <button
            v-for="p in filteredSeoList"
            :key="p.slug"
            @click="selectPage(p)"
            :class="[
              'w-full text-left p-2.5 rounded text-xs transition-colors flex items-center justify-between',
              selectedPage?.slug === p.slug
                ? 'bg-brand-gold text-black font-bold'
                : 'text-gray-300 hover:bg-[#181818] hover:text-white'
            ]"
          >
            <span class="truncate pr-2">{{ p.title }}</span>
            <span class="text-[10px] font-mono opacity-75">/{{ p.slug }}</span>
          </button>
        </div>
      </div>

      <!-- Right: Detailed SEO Editor & Google SERP Simulator -->
      <div v-if="selectedPage" class="lg:col-span-8 bg-brand-surface border border-brand-border p-6 space-y-6">
        
        <div class="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h3 class="text-base font-heading font-bold text-white uppercase">
              Editing SEO for: {{ selectedPage.title }}
            </h3>
            <span class="text-xs text-brand-gold font-mono">https://spacesandplaces.com.pk/{{ selectedPage.slug === 'home' ? '' : selectedPage.slug }}</span>
          </div>
          <button
            @click="savePageSeo"
            :disabled="savingSeo"
            class="px-5 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase rounded transition-colors shadow-gold-glow disabled:opacity-50"
          >
            <span v-if="savingSeo">Saving...</span>
            <span v-else>Update SEO</span>
          </button>
        </div>

        <!-- Google SERP Preview Simulator -->
        <div class="p-5 bg-black border border-brand-border rounded space-y-1 font-sans">
          <span class="text-[10px] text-gray-500 uppercase tracking-wider block mb-2 font-mono">
            Live Google SERP Snippet Preview:
          </span>
          <div class="text-[#8ab4f8] text-lg font-medium truncate hover:underline cursor-pointer">
            {{ selectedPage.metaTitle || selectedPage.title + ' | Spaces & Places Lahore' }}
          </div>
          <div class="text-[#bdc1c6] text-xs font-mono">
            https://spacesandplaces.com.pk/{{ selectedPage.slug === 'home' ? '' : selectedPage.slug }}
          </div>
          <div class="text-gray-300 text-xs leading-relaxed pt-1">
            {{ selectedPage.metaDescription || 'No meta description configured yet. Search engines will generate a snippet from on-page content.' }}
          </div>
        </div>

        <!-- Meta Input Fields -->
        <div class="space-y-4 text-xs">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-gray-300 font-medium uppercase tracking-wider">Meta Title *</label>
              <span class="text-[11px] font-mono" :class="getTitleColor(selectedPage.metaTitle?.length)">
                {{ selectedPage.metaTitle?.length || 0 }} / 60 chars (Optimal: 50-60)
              </span>
            </div>
            <input
              v-model="selectedPage.metaTitle"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold text-sm"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-gray-300 font-medium uppercase tracking-wider">Meta Description *</label>
              <span class="text-[11px] font-mono" :class="getDescColor(selectedPage.metaDescription?.length)">
                {{ selectedPage.metaDescription?.length || 0 }} / 160 chars (Optimal: 120-160)
              </span>
            </div>
            <textarea
              v-model="selectedPage.metaDescription"
              rows="3"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Target Focus Keywords</label>
            <input
              v-model="selectedPage.focusKeywords"
              type="text"
              placeholder="e.g. Interior Designer Lahore, Architects DHA, House Plans"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Canonical URL</label>
              <input
                v-model="selectedPage.canonicalUrl"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Social Share Image (OG:Image)</label>
              <input
                v-model="selectedPage.ogImage"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
          </div>

          <div class="pt-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="selectedPage.indexRobots"
                type="checkbox"
                class="w-4 h-4 accent-brand-gold"
              />
              <span class="text-gray-300 font-medium">Allow Google & search crawlers to index this page (index, follow)</span>
            </label>
          </div>
        </div>

      </div>

    </div>

    <!-- Global Robots.txt Editor -->
    <div class="bg-brand-surface border border-brand-border p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <h3 class="text-base font-heading font-bold text-white uppercase">Dynamic robots.txt Editor</h3>
          <p class="text-xs text-gray-400">Controls which crawlers and bots are permitted to index your site.</p>
        </div>
        <button
          @click="saveRobots"
          :disabled="savingRobots"
          class="px-5 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase rounded transition-colors disabled:opacity-50"
        >
          <span v-if="savingRobots">Saving...</span>
          <span v-else>Save robots.txt</span>
        </button>
      </div>

      <div class="text-xs">
        <textarea
          v-model="robotsContent"
          rows="5"
          class="w-full bg-black border border-brand-border font-mono text-emerald-400 p-4 outline-none resize-none leading-relaxed"
        ></textarea>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getSeoList, updateSeo, getRobotsTxt, updateRobotsTxt } from '../../api';
import { useToast } from '../../composables/useToast';

const { showToast } = useToast();

const seoList = ref([]);
const selectedPage = ref(null);
const pageSearch = ref('');
const savingSeo = ref(false);

const robotsContent = ref('');
const savingRobots = ref(false);

const filteredSeoList = computed(() => {
  if (!pageSearch.value) return seoList.value;
  return seoList.value.filter(p =>
    p.title.toLowerCase().includes(pageSearch.value.toLowerCase()) ||
    p.slug.toLowerCase().includes(pageSearch.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    const [pages, robots] = await Promise.all([
      getSeoList(),
      getRobotsTxt().catch(() => ({ robotsTxt: '' }))
    ]);
    seoList.value = pages;
    if (pages.length > 0) {
      selectedPage.value = { ...pages[0] };
    }
    robotsContent.value = robots.robotsTxt || '';
  } catch (err) {
    showToast('Error loading SEO suite: ' + err.message, 'error');
  }
});

function selectPage(p) {
  selectedPage.value = { ...p };
}

function getTitleColor(len) {
  if (!len) return 'text-gray-400';
  if (len >= 45 && len <= 65) return 'text-emerald-400';
  return 'text-amber-400';
}

function getDescColor(len) {
  if (!len) return 'text-gray-400';
  if (len >= 110 && len <= 165) return 'text-emerald-400';
  return 'text-amber-400';
}

async function savePageSeo() {
  if (!selectedPage.value) return;
  savingSeo.value = true;
  try {
    await updateSeo(selectedPage.value.slug, selectedPage.value);
    showToast(`SEO updated for ${selectedPage.value.title}!`, 'success');
  } catch (err) {
    showToast('Error saving SEO: ' + err.message, 'error');
  } finally {
    savingSeo.value = false;
  }
}

async function saveRobots() {
  savingRobots.value = true;
  try {
    await updateRobotsTxt(robotsContent.value);
    showToast('robots.txt updated in MongoDB successfully!', 'success');
  } catch (err) {
    showToast('Error saving robots.txt: ' + err.message, 'error');
  } finally {
    savingRobots.value = false;
  }
}
</script>
