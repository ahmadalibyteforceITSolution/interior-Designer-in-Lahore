<template>
  <div v-if="loading" class="text-center py-20 text-brand-gold font-mono text-xs uppercase tracking-widest">
    Loading Page Data from MongoDB...
  </div>

  <div v-else-if="page" class="space-y-8 pb-20">
    
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <div class="flex items-center gap-2">
          <router-link to="/admin/pages" class="text-brand-gold text-xs hover:underline uppercase font-bold">
            ← Back to Pages
          </router-link>
          <span class="text-gray-500">•</span>
          <span class="text-xs uppercase text-gray-400 font-mono">/{{ page.slug === 'home' ? '' : page.slug }}</span>
        </div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight mt-1">
          Edit Page: {{ page.title }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <a
          :href="`/${page.slug === 'home' ? '' : page.slug}`"
          target="_blank"
          class="px-4 py-2 border border-brand-border text-gray-300 hover:text-brand-gold hover:border-brand-gold text-xs font-bold uppercase rounded transition-colors"
        >
          View Live Page
        </a>
        <button
          v-if="!isProtected(page.slug)"
          @click="handleDelete"
          class="px-3 py-2 border border-red-900/60 text-red-400 hover:bg-red-950/50 text-xs font-bold uppercase rounded transition-colors"
        >
          Delete Page
        </button>
        <button
          @click="saveChanges"
          :disabled="saving"
          class="px-6 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow disabled:opacity-50 flex items-center gap-2"
        >
          <span v-if="saving">SAVING TO MONGODB...</span>
          <span v-else>SAVE ALL CHANGES</span>
        </button>
      </div>
    </div>

    <!-- Section Navigation Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-brand-border pb-3 text-xs font-bold uppercase tracking-wider">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 transition-colors rounded-sm',
          activeTab === tab.id
            ? 'bg-brand-gold text-black shadow-gold-glow'
            : 'bg-[#181818] text-gray-300 hover:bg-[#252525]'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- TAB 1: HERO SECTION -->
    <div v-show="activeTab === 'hero'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="border-b border-brand-border pb-3">
        <h3 class="text-base font-heading font-bold text-white uppercase">Hero Banner Section</h3>
        <p class="text-xs text-gray-400">Edit the top header banner that visitors see immediately upon landing.</p>
      </div>

      <div class="space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Badge Tag</label>
            <input
              v-model="page.hero.badge"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">CTA Button Text</label>
            <input
              v-model="page.hero.ctaText"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Main Heading / Title</label>
          <input
            v-model="page.hero.title"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none text-sm font-bold"
          />
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Subtitle / Tagline</label>
          <textarea
            v-model="page.hero.subtitle"
            rows="2"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Background Image URL</label>
            <input
              v-model="page.hero.bgImage"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Background Video URL (Optional)</label>
            <input
              v-model="page.hero.bgVideo"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>

        <!-- Preview Thumbnail -->
        <div v-if="page.hero.bgImage" class="pt-2">
          <span class="block text-gray-400 text-[11px] mb-1">Hero Image Preview:</span>
          <div class="h-40 w-80 overflow-hidden border border-brand-border bg-black">
            <img :src="page.hero.bgImage" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: OVERVIEW SECTION -->
    <div v-show="activeTab === 'overview'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="border-b border-brand-border pb-3">
        <h3 class="text-base font-heading font-bold text-white uppercase">Intro & Overview Section</h3>
        <p class="text-xs text-gray-400">Detailed company or service background with key highlights checklist.</p>
      </div>

      <div class="space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Section Badge</label>
            <input
              v-model="page.overview.badge"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Featured Image URL</label>
            <input
              v-model="page.overview.image"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Section Heading</label>
          <input
            v-model="page.overview.title"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none text-sm font-bold"
          />
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Section Subtitle</label>
          <input
            v-model="page.overview.subtitle"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Paragraph 1</label>
          <textarea
            v-model="page.overview.paragraph1"
            rows="3"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none leading-relaxed"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Paragraph 2</label>
          <textarea
            v-model="page.overview.paragraph2"
            rows="3"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none leading-relaxed"
          ></textarea>
        </div>

        <!-- Highlights Checklist -->
        <div class="space-y-2 pt-2">
          <div class="flex items-center justify-between">
            <label class="block text-gray-300 font-medium uppercase tracking-wider">Key Highlights / Checkpoints</label>
            <button
              @click="addHighlight"
              type="button"
              class="text-brand-gold text-xs hover:underline uppercase font-bold"
            >
              + Add Highlight
            </button>
          </div>

          <div
            v-for="(item, idx) in page.overview.highlights"
            :key="idx"
            class="flex items-center gap-2"
          >
            <input
              v-model="page.overview.highlights[idx]"
              type="text"
              class="flex-1 bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
            <button
              @click="removeHighlight(idx)"
              type="button"
              class="text-red-400 hover:text-red-300 p-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: DETAILED SECTIONS & CARDS (FULL CRUD) -->
    <div v-show="activeTab === 'sections'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <h3 class="text-base font-heading font-bold text-white uppercase">Section Feature Cards</h3>
          <p class="text-xs text-gray-400">Add, edit, or delete any feature or service card on this page.</p>
        </div>
        <button
          @click="addSectionCard"
          type="button"
          class="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded"
        >
          + Add New Section Card
        </button>
      </div>

      <div v-if="page.sections?.length === 0" class="text-center py-10 text-gray-400 text-xs">
        No feature cards added yet. Click "+ Add New Section Card" above to add one.
      </div>

      <div class="space-y-6">
        <div
          v-for="(sec, sIdx) in page.sections"
          :key="sIdx"
          class="bg-black border border-brand-border p-5 space-y-4 relative"
        >
          <div class="flex items-center justify-between border-b border-brand-border pb-3">
            <span class="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Card #{{ sIdx + 1 }}: {{ sec.title || 'Untitled Card' }}
            </span>
            <button
              @click="removeSectionCard(sIdx)"
              type="button"
              class="text-red-400 hover:text-red-300 text-xs uppercase font-bold"
            >
              Delete Card
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Card Title *</label>
              <input
                v-model="sec.title"
                type="text"
                class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Card Subtitle</label>
              <input
                v-model="sec.subtitle"
                type="text"
                class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div class="text-xs">
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Description</label>
            <textarea
              v-model="sec.description"
              rows="2"
              class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none"
            ></textarea>
          </div>

          <div class="text-xs">
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Card Image URL</label>
            <input
              v-model="sec.image"
              type="text"
              class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>

          <!-- Card Points Checklist -->
          <div class="text-xs space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-gray-400 uppercase tracking-wider">Bullet Points</label>
              <button
                @click="addCardPoint(sec)"
                type="button"
                class="text-brand-gold text-[11px] hover:underline"
              >
                + Add Point
              </button>
            </div>
            <div
              v-for="(pt, pIdx) in sec.points"
              :key="pIdx"
              class="flex items-center gap-2"
            >
              <input
                v-model="sec.points[pIdx]"
                type="text"
                class="flex-1 bg-[#181818] border border-brand-border text-white px-3 py-1.5 outline-none"
              />
              <button
                @click="removeCardPoint(sec, pIdx)"
                type="button"
                class="text-red-400 hover:text-red-300 p-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: GALLERY (FULL CRUD) -->
    <div v-show="activeTab === 'gallery'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <h3 class="text-base font-heading font-bold text-white uppercase">Project Gallery Images</h3>
          <p class="text-xs text-gray-400">Add, edit, or remove showcase images for this page.</p>
        </div>
        <button
          @click="addGalleryItem"
          type="button"
          class="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded"
        >
          + Add Image to Gallery
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(img, gIdx) in page.gallery"
          :key="gIdx"
          class="bg-black border border-brand-border p-4 space-y-3 relative text-xs"
        >
          <div class="h-36 overflow-hidden border border-brand-border bg-[#181818]">
            <img :src="img.image" :alt="img.title" class="w-full h-full object-cover" />
          </div>

          <div>
            <label class="block text-gray-400 uppercase text-[10px] mb-0.5">Title</label>
            <input
              v-model="img.title"
              type="text"
              class="w-full bg-[#181818] border border-brand-border text-white px-2.5 py-1.5 outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-400 uppercase text-[10px] mb-0.5">Image URL</label>
            <input
              v-model="img.image"
              type="text"
              class="w-full bg-[#181818] border border-brand-border text-white px-2.5 py-1.5 outline-none font-mono"
            />
          </div>

          <div>
            <label class="block text-gray-400 uppercase text-[10px] mb-0.5">Category</label>
            <input
              v-model="img.category"
              type="text"
              class="w-full bg-[#181818] border border-brand-border text-white px-2.5 py-1.5 outline-none"
            />
          </div>

          <button
            @click="removeGalleryItem(gIdx)"
            type="button"
            class="w-full py-1.5 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white uppercase font-bold text-[10px] transition-colors"
          >
            Remove Image
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 5: FAQS (FULL CRUD) -->
    <div v-show="activeTab === 'faqs'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <h3 class="text-base font-heading font-bold text-white uppercase">Frequently Asked Questions (FAQs)</h3>
          <p class="text-xs text-gray-400">Powers both the on-page accordion and Google FAQPage schema for rich search results.</p>
        </div>
        <button
          @click="addFaq"
          type="button"
          class="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded"
        >
          + Add New FAQ
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, fIdx) in page.faqs"
          :key="fIdx"
          class="bg-black border border-brand-border p-4 space-y-3 relative text-xs"
        >
          <div class="flex items-center justify-between">
            <span class="text-brand-gold font-bold uppercase">Question #{{ fIdx + 1 }}</span>
            <button
              @click="removeFaq(fIdx)"
              type="button"
              class="text-red-400 hover:text-red-300 uppercase font-bold"
            >
              Delete
            </button>
          </div>

          <div>
            <label class="block text-gray-400 uppercase text-[10px] mb-1">Question</label>
            <input
              v-model="faq.question"
              type="text"
              class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold"
            />
          </div>

          <div>
            <label class="block text-gray-400 uppercase text-[10px] mb-1">Answer</label>
            <textarea
              v-model="faq.answer"
              rows="3"
              class="w-full bg-[#181818] border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 6: BOTTOM CALL TO ACTION -->
    <div v-show="activeTab === 'cta'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="border-b border-brand-border pb-3">
        <h3 class="text-base font-heading font-bold text-white uppercase">Bottom Call to Action Banner</h3>
        <p class="text-xs text-gray-400">The closing conversion section at the bottom of the page.</p>
      </div>

      <div class="space-y-4 text-xs">
        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">CTA Heading</label>
          <input
            v-model="page.cta.title"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold"
          />
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">CTA Subtitle</label>
          <textarea
            v-model="page.cta.subtitle"
            rows="2"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Button Text</label>
            <input
              v-model="page.cta.buttonText"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Button Link</label>
            <input
              v-model="page.cta.buttonLink"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 7: SEO & META DATA -->
    <div v-show="activeTab === 'seo'" class="bg-brand-surface border border-brand-border p-6 space-y-6">
      <div class="border-b border-brand-border pb-3">
        <h3 class="text-base font-heading font-bold text-white uppercase">Page SEO & Google AdSense Metadata</h3>
        <p class="text-xs text-gray-400">Manage titles, meta tags, focus keywords, and canonical URLs for Google indexation.</p>
      </div>

      <!-- Live Google Snippet Simulator -->
      <div class="p-4 bg-black border border-brand-border rounded space-y-1 font-sans">
        <span class="text-[10px] text-gray-500 uppercase tracking-wider block mb-2 font-mono">Google Search Result Preview:</span>
        <div class="text-[#1a0dab] dark:text-[#8ab4f8] text-base font-medium truncate">
          {{ page.metaTitle || page.title + ' | Spaces & Places' }}
        </div>
        <div class="text-[#006621] dark:text-[#bdc1c6] text-xs">
          https://spacesandplaces.com.pk/{{ page.slug === 'home' ? '' : page.slug }}
        </div>
        <div class="text-gray-300 text-xs leading-snug">
          {{ page.metaDescription || 'No meta description set yet.' }}
        </div>
      </div>

      <div class="space-y-4 text-xs">
        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
            Meta Title (Recommended: 50-60 characters)
          </label>
          <input
            v-model="page.metaTitle"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
          />
          <span class="text-[10px] text-gray-500 block mt-1">
            Current length: {{ page.metaTitle?.length || 0 }} chars
          </span>
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">
            Meta Description (Recommended: 120-160 characters)
          </label>
          <textarea
            v-model="page.metaDescription"
            rows="3"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none resize-none"
          ></textarea>
          <span class="text-[10px] text-gray-500 block mt-1">
            Current length: {{ page.metaDescription?.length || 0 }} chars
          </span>
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Focus Keywords (Comma separated)</label>
          <input
            v-model="page.focusKeywords"
            type="text"
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Canonical URL</label>
            <input
              v-model="page.canonicalUrl"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">OpenGraph Social Share Image URL</label>
            <input
              v-model="page.ogImage"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>
        </div>

        <div class="pt-2">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              v-model="page.indexRobots"
              type="checkbox"
              class="w-4 h-4 accent-brand-gold"
            />
            <span class="text-gray-300 font-medium">Index this page on Google & Search Engines (index, follow)</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Save Bar -->
    <div class="sticky bottom-6 bg-[#181818]/95 backdrop-blur border border-brand-gold/40 p-4 rounded shadow-2xl flex items-center justify-between">
      <span class="text-xs text-brand-gold font-medium">
        Unsaved modifications will be written directly to MongoDB Atlas.
      </span>
      <button
        @click="saveChanges"
        :disabled="saving"
        class="px-8 py-3 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow disabled:opacity-50"
      >
        <span v-if="saving">SAVING TO MONGODB...</span>
        <span v-else>SAVE ALL CHANGES</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPage, updatePage, deletePage } from '../../api';
import { useToast } from '../../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();

const PROTECTED_SLUGS = ['home', 'about-us', 'our-clients', 'contact', 'blogs', 'privacy-policy', 'terms-conditions', 'disclaimer'];

function isProtected(slug) {
  return PROTECTED_SLUGS.includes(slug);
}

const page = ref(null);
const loading = ref(true);
const saving = ref(false);
const activeTab = ref('hero');

const tabs = [
  { id: 'hero', name: '1. Hero Banner' },
  { id: 'overview', name: '2. Intro & Overview' },
  { id: 'sections', name: '3. Feature Cards' },
  { id: 'gallery', name: '4. Project Gallery' },
  { id: 'faqs', name: '5. FAQs' },
  { id: 'cta', name: '6. Bottom CTA' },
  { id: 'seo', name: '7. SEO & Meta' },
];

onMounted(async () => {
  try {
    const slug = route.params.slug;
    const data = await getPage(slug);
    // Ensure default shapes
    if (!data.hero) data.hero = {};
    if (!data.overview) data.overview = {};
    if (!data.sections) data.sections = [];
    if (!data.gallery) data.gallery = [];
    if (!data.faqs) data.faqs = [];
    if (!data.cta) data.cta = {};
    page.value = data;
  } catch (err) {
    showToast('Failed to load page: ' + err.message, 'error');
  } finally {
    loading.value = false;
  }
});

function addHighlight() {
  if (!page.value.overview.highlights) page.value.overview.highlights = [];
  page.value.overview.highlights.push('New highlight point');
}

function removeHighlight(idx) {
  page.value.overview.highlights.splice(idx, 1);
}

function addSectionCard() {
  if (!page.value.sections) page.value.sections = [];
  page.value.sections.push({
    id: 'sec-' + Date.now(),
    title: 'New Service Section',
    subtitle: 'Specialized Discipline',
    description: 'Detailed description of this offering.',
    image: '/uploads/01-01-8.jpg',
    points: ['Key benefit 1', 'Key benefit 2']
  });
}

function removeSectionCard(idx) {
  if (confirm('Are you sure you want to delete this section card?')) {
    page.value.sections.splice(idx, 1);
  }
}

function addCardPoint(sec) {
  if (!sec.points) sec.points = [];
  sec.points.push('New checkpoint');
}

function removeCardPoint(sec, idx) {
  sec.points.splice(idx, 1);
}

function addGalleryItem() {
  if (!page.value.gallery) page.value.gallery = [];
  page.value.gallery.push({
    title: 'Project Title',
    image: '/uploads/01-01-8.jpg',
    category: 'Showcase',
    alt: 'Project Showcase'
  });
}

function removeGalleryItem(idx) {
  page.value.gallery.splice(idx, 1);
}

function addFaq() {
  if (!page.value.faqs) page.value.faqs = [];
  page.value.faqs.push({
    question: 'How do you guarantee quality?',
    answer: 'We provide comprehensive structural testing, BOQ transparency, and on-site supervision.'
  });
}

function removeFaq(idx) {
  page.value.faqs.splice(idx, 1);
}

async function saveChanges() {
  saving.value = true;
  try {
    const targetIdentifier = page.value._id || route.params.slug || page.value.slug;
    await updatePage(targetIdentifier, page.value);
    showToast('All page sections saved to MongoDB successfully!', 'success');
  } catch (err) {
    showToast('Error saving: ' + err.message, 'error');
  } finally {
    saving.value = false;
  }
}

async function handleDelete() {
  if (isProtected(page.value.slug)) {
    showToast('Core system pages cannot be deleted.', 'error');
    return;
  }

  const confirmed = window.confirm(`Are you sure you want to permanently delete "/${page.value.slug}" (${page.value.title})? This will remove its live page and all sections.`);
  if (!confirmed) return;

  try {
    const targetIdentifier = page.value._id || page.value.slug;
    await deletePage(targetIdentifier);
    showToast(`Page "/${page.value.slug}" deleted successfully.`, 'success');
    router.push('/admin/pages');
  } catch (err) {
    showToast('Error deleting page: ' + err.message, 'error');
  }
}
</script>
