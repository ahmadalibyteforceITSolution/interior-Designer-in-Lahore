<template>
  <div class="space-y-6">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Media Library Manager
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Browse {{ mediaFiles.length }} images migrated from inner-design1, upload new photography, and copy direct URLs.
        </p>
      </div>

      <!-- Upload Button -->
      <label class="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow cursor-pointer inline-flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
        <span>Upload New Image</span>
        <input type="file" @change="handleUpload" accept="image/*,video/mp4" class="hidden" />
      </label>
    </div>

    <!-- Search & Filters -->
    <div class="flex items-center gap-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search filename (e.g. logo, bahria, villa)..."
        class="bg-brand-surface border border-brand-border focus:border-brand-gold text-white px-4 py-2 text-xs outline-none w-full max-w-md"
      />
      <span class="text-xs text-gray-400 font-mono">
        Showing {{ filteredMedia.length }} of {{ mediaFiles.length }} assets
      </span>
    </div>

    <!-- Media Grid -->
    <div v-if="loading" class="text-center py-20 text-brand-gold text-xs font-mono">
      Loading Media Library...
    </div>

    <div v-else-if="filteredMedia.length === 0" class="text-center py-20 text-gray-400 text-xs">
      No media files matching your search.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="item in pagedMedia"
        :key="item.name"
        class="bg-brand-surface border border-brand-border p-2.5 rounded group relative flex flex-col justify-between hover:border-brand-gold/70 transition-colors"
      >
        <div class="h-28 w-full bg-black overflow-hidden flex items-center justify-center relative">
          <img
            :src="item.url"
            :alt="item.name"
            loading="lazy"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="mt-2 space-y-1">
          <p class="text-[10px] text-gray-300 truncate font-mono" :title="item.name">
            {{ item.name }}
          </p>
          <div class="flex items-center justify-between text-[9px] text-gray-500 font-mono">
            <span>{{ (item.size / 1024).toFixed(0) }} KB</span>
          </div>
        </div>

        <!-- Hover Actions -->
        <div class="mt-2 pt-2 border-t border-brand-border/60 flex items-center justify-between gap-1">
          <button
            @click="copyUrl(item.url)"
            class="flex-1 py-1 bg-[#1c1c1c] hover:bg-brand-gold hover:text-black text-gray-200 text-[10px] font-bold uppercase rounded transition-colors"
          >
            Copy URL
          </button>
          <button
            @click="removeFile(item.name)"
            class="p-1 text-red-400 hover:text-red-300 text-[10px]"
            title="Delete file"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-6">
      <button
        @click="page = Math.max(1, page - 1)"
        :disabled="page === 1"
        class="px-3 py-1.5 bg-brand-surface border border-brand-border text-xs text-gray-300 disabled:opacity-30"
      >
        Previous
      </button>
      <span class="text-xs text-brand-gold font-mono px-3">
        Page {{ page }} of {{ totalPages }}
      </span>
      <button
        @click="page = Math.min(totalPages, page + 1)"
        :disabled="page === totalPages"
        class="px-3 py-1.5 bg-brand-surface border border-brand-border text-xs text-gray-300 disabled:opacity-30"
      >
        Next
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getMedia, uploadMedia, deleteMedia } from '../../api';
import { useToast } from '../../composables/useToast';

const { showToast } = useToast();

const mediaFiles = ref([]);
const loading = ref(true);
const search = ref('');
const page = ref(1);
const perPage = 30;

async function loadMedia() {
  loading.value = true;
  try {
    const data = await getMedia();
    mediaFiles.value = data;
  } catch (err) {
    showToast('Error loading media: ' + err.message, 'error');
  } finally {
    loading.value = false;
  }
}

const filteredMedia = computed(() => {
  if (!search.value) return mediaFiles.value;
  return mediaFiles.value.filter(m => m.name.toLowerCase().includes(search.value.toLowerCase()));
});

const totalPages = computed(() => Math.ceil(filteredMedia.value.length / perPage));

const pagedMedia = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredMedia.value.slice(start, start + perPage);
});

async function handleUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    showToast('Uploading image...', 'info');
    await uploadMedia(file);
    showToast('Image uploaded successfully!', 'success');
    loadMedia();
  } catch (err) {
    showToast('Upload error: ' + err.message, 'error');
  }
}

function copyUrl(url) {
  navigator.clipboard.writeText(url);
  showToast(`Copied image URL: ${url}`, 'success');
}

async function removeFile(filename) {
  if (confirm(`Delete file "${filename}"?`)) {
    try {
      await deleteMedia(filename);
      showToast('File removed', 'info');
      loadMedia();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  }
}

onMounted(loadMedia);
</script>
