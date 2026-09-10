<template>
  <section class="py-16 bg-[#faf9f6] dark:bg-black relative border-b border-gray-200 dark:border-brand-border transition-colors duration-300" id="snp-portfolio-gallery">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">{{ sectionBadge || 'OUR PORTFOLIO' }}</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight">
          {{ sectionTitle || 'CURATED ARCHITECTURAL & INTERIOR PROJECTS' }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {{ sectionSubtitle || 'Explore our award-winning residential estates, bespoke commercial spaces, and iconic corporate ateliers across Pakistan and the UAE.' }}
        </p>
      </div>

      <!-- Filter Bar -->
      <div v-if="availableCategories.length > 2" class="snp-port-filters">
        <button
          v-for="cat in availableCategories"
          :key="cat"
          @click="setFilter(cat)"
          :class="['snp-port-filter-btn', currentFilter === cat ? 'active' : '']"
        >
          {{ cat === 'all' ? 'All' : cat }}
        </button>
      </div>

      <!-- Project Cards Grid -->
      <div class="snp-port-grid">
        <div
          v-for="proj in visibleProjects"
          :key="proj.id"
          class="snp-port-card group"
          tabindex="0"
          role="button"
          :aria-label="'View ' + proj.title + ' project'"
          @click="openModal(proj, 0)"
          @keydown.enter="openModal(proj, 0)"
        >
          <img
            class="snp-card-img"
            :src="proj.cover"
            :alt="proj.title"
            loading="lazy"
          />
          <span class="snp-count-badge">▶ {{ proj.images.length }} Photos</span>
          
          <div class="snp-port-card-overlay">
            <span class="snp-cat-badge">{{ proj.category }}</span>
            <h3 class="snp-card-title">{{ proj.title }}</h3>
            <p class="snp-card-desc">{{ proj.desc }}</p>
            <span class="snp-card-cta">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              View Gallery
            </span>
          </div>
        </div>
      </div>

      <!-- Controls: View More / View Less -->
      <div v-if="filteredProjects.length > ITEMS_PER_PAGE" class="snp-port-controls">
        <button v-if="!showAll" class="snp-port-btn" @click="showAll = true">
          View More ({{ filteredProjects.length - ITEMS_PER_PAGE }} More Projects)
        </button>
        <button v-else class="snp-port-btn" @click="handleViewLess">
          View Less
        </button>
      </div>

    </div>

    <!-- Modal Lightbox + Slider -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="isModalOpen"
          id="snp-modal-overlay"
          class="active"
          role="dialog"
          aria-modal="true"
          aria-label="Project Gallery Lightbox"
          @click.self="closeModal"
        >
          <button class="snp-modal-close" aria-label="Close" @click="closeModal">×</button>
          
          <!-- Prev / Next Arrows -->
          <button class="snp-modal-arrow snp-prev" aria-label="Previous image" @click="prevSlide">‹</button>
          <button class="snp-modal-arrow snp-next" aria-label="Next image" @click="nextSlide">›</button>

          <div class="snp-modal-inner">
            <!-- Main Slide Image -->
            <div class="snp-modal-img-wrap">
              <img
                :key="currentSlide?.src"
                :src="currentSlide?.src"
                :alt="currentSlide?.title || activeProject?.title"
                class="animate-fade-in"
              />
            </div>

            <!-- Slide Caption -->
            <div class="snp-modal-caption">
              <p class="snp-modal-title">{{ currentSlide?.title || activeProject?.title }}</p>
              <p class="snp-modal-desc">{{ currentSlide?.desc || activeProject?.desc }}</p>
            </div>

            <!-- Counter -->
            <div class="snp-modal-counter">
              {{ activeIdx + 1 }} / {{ activeProject?.images?.length || 0 }}
            </div>

            <!-- Thumbnails Strip -->
            <div class="snp-modal-thumbs" ref="thumbsRef">
              <img
                v-for="(img, idx) in activeProject?.images"
                :key="idx"
                :src="img.src"
                :alt="img.title"
                :class="['snp-modal-thumb', activeIdx === idx ? 'active' : '']"
                loading="lazy"
                @click="showSlide(idx)"
              />
            </div>
          </div>
        </div>
      </transition>
    </teleport>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import rawProjects from '../../data/projectsData.json';

const props = defineProps({
  gallery: {
    type: Array,
    default: () => []
  },
  sectionBadge: {
    type: String,
    default: ''
  },
  sectionTitle: {
    type: String,
    default: ''
  },
  sectionSubtitle: {
    type: String,
    default: ''
  }
});

const ITEMS_PER_PAGE = 6;
const currentFilter = ref('all');
const showAll = ref(false);

const isModalOpen = ref(false);
const activeProject = ref(null);
const activeIdx = ref(0);
const thumbsRef = ref(null);

const allProjects = computed(() => {
  if (props.gallery && props.gallery.length > 0) {
    return props.gallery.map((g, idx) => {
      const cover = g.image || g.cover || '/uploads/01-01-8.jpg';
      const images = (g.images && g.images.length > 0)
        ? g.images
        : [{ src: cover, title: g.title, desc: g.description || g.desc || g.title }];
      return {
        id: g.id || `gallery-item-${idx}`,
        title: g.title || `Featured Execution 0${idx + 1}`,
        cover: cover,
        category: g.category || 'Featured Portfolio',
        desc: g.description || g.desc || `${g.title} designed and crafted by Spaces & Places Lahore.`,
        images: images
      };
    });
  }
  const list = rawProjects && rawProjects.length > 0 ? rawProjects : [];
  return list.filter(p => p && p.id !== 'leisure' && p.title?.toUpperCase() !== 'LEISURE');
});

const availableCategories = computed(() => {
  const cats = new Set();
  allProjects.value.forEach(p => {
    if (p.category && p.category.trim()) cats.add(p.category.trim());
  });
  return ['all', ...Array.from(cats)];
});

const filteredProjects = computed(() => {
  if (currentFilter.value === 'all') return allProjects.value;
  return allProjects.value.filter(p => p.category && p.category.toLowerCase() === currentFilter.value.toLowerCase());
});

const visibleProjects = computed(() => {
  if (showAll.value) return filteredProjects.value;
  return filteredProjects.value.slice(0, ITEMS_PER_PAGE);
});

const currentSlide = computed(() => {
  if (!activeProject.value || !activeProject.value.images) return null;
  return activeProject.value.images[activeIdx.value] || null;
});

function setFilter(cat) {
  currentFilter.value = cat;
  showAll.value = false;
}

function handleViewLess() {
  showAll.value = false;
  const el = document.getElementById('snp-portfolio-gallery');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openModal(project, idx = 0) {
  activeProject.value = project;
  activeIdx.value = idx;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
  scrollThumbIntoView(idx);
}

function closeModal() {
  isModalOpen.value = false;
  document.body.style.overflow = '';
  activeProject.value = null;
}

function showSlide(idx) {
  if (!activeProject.value || !activeProject.value.images) return;
  const count = activeProject.value.images.length;
  if (idx < 0) idx = count - 1;
  if (idx >= count) idx = 0;
  activeIdx.value = idx;
  scrollThumbIntoView(idx);
}

function prevSlide() {
  showSlide(activeIdx.value - 1);
}

function nextSlide() {
  showSlide(activeIdx.value + 1);
}

function scrollThumbIntoView(idx) {
  nextTick(() => {
    if (!thumbsRef.value) return;
    const thumbs = thumbsRef.value.querySelectorAll('.snp-modal-thumb');
    if (thumbs && thumbs[idx]) {
      thumbs[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
}

function handleKeydown(e) {
  if (!isModalOpen.value) return;
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'Escape') closeModal();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Filter bar */
.snp-port-filters {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e0da;
  flex-wrap: wrap;
}
:global(.dark) .snp-port-filters {
  border-bottom-color: #262626;
}

.snp-port-filter-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 13px 30px;
  font-family: 'Heebo', sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #888;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
  margin-bottom: -2px;
}
.snp-port-filter-btn:hover {
  color: #111;
}
:global(.dark) .snp-port-filter-btn:hover {
  color: #fff;
}
.snp-port-filter-btn.active {
  color: #b8955a;
  border-bottom-color: #b8955a;
}

/* Grid */
.snp-port-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}
@media (max-width: 767px) {
  .snp-port-grid {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .snp-port-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .snp-port-filter-btn {
    padding: 10px 18px;
    font-size: 12px;
  }
}

/* Project Card */
.snp-port-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 390px;
  background: #000000 !important;
  display: block;
}

.snp-card-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.6s ease, opacity 0.4s ease, filter 0.4s ease !important;
}
.snp-port-card:hover .snp-card-img {
  transform: scale(1.08) !important;
  opacity: 0.2 !important;
  filter: brightness(0.5) !important;
}

/* Overlay */
.snp-port-card-overlay {
  position: absolute !important;
  inset: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  padding: 30px 24px !important;
  background: rgba(0, 0, 0, 0.4) !important;
  opacity: 0 !important;
  transform: translateY(12px) !important;
  transition: opacity 0.35s ease, transform 0.35s ease !important;
  pointer-events: none !important;
  z-index: 5 !important;
}
.snp-port-card:hover .snp-port-card-overlay {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.snp-cat-badge {
  font-family: 'Heebo', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: #e5be79 !important;
  margin-bottom: 10px !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9) !important;
}
.snp-card-title {
  font-family: 'Lato', sans-serif !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: #ffffff !important;
  margin: 0 0 12px 0 !important;
  line-height: 1.35 !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9) !important;
}
.snp-card-desc {
  font-family: 'Heebo', sans-serif !important;
  font-size: 13px !important;
  font-weight: 300 !important;
  color: rgba(255, 255, 255, 0.9) !important;
  line-height: 1.65 !important;
  max-height: 85px !important;
  overflow: hidden !important;
  margin: 0 0 18px 0 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9) !important;
}
.snp-card-cta {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Heebo', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  background: #b8955a !important;
  border: 1px solid #b8955a !important;
  padding: 10px 24px !important;
  border-radius: 2px !important;
  pointer-events: auto !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6) !important;
  transition: background 0.25s, transform 0.25s !important;
}
.snp-card-cta:hover {
  background: #9d7c43 !important;
  border-color: #9d7c43 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
}
.snp-card-cta svg {
  width: 14px !important;
  height: 14px !important;
  fill: currentColor !important;
}

/* Image count badge */
.snp-count-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.65);
  color: #e5be79;
  font-family: 'Heebo', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 5px 12px;
  border-radius: 2px;
  z-index: 4;
  backdrop-filter: blur(4px);
  transition: opacity 0.3s;
}

/* View More Controls */
.snp-port-controls {
  text-align: center;
  padding: 36px 0 10px;
}
.snp-port-btn {
  display: inline-block;
  background: transparent;
  border: 1px solid #b8955a;
  color: #b8955a;
  font-family: 'Heebo', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 14px 48px;
  cursor: pointer;
  transition: background 0.28s, color 0.28s;
  margin: 4px;
}
.snp-port-btn:hover {
  background: #b8955a;
  color: #fff;
}

/* Modal Lightbox */
#snp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.94);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
}

.snp-modal-inner {
  position: relative;
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .snp-modal-inner {
    padding: 0 44px;
  }
}

.snp-modal-close {
  position: fixed;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  z-index: 100001;
  transition: color 0.2s;
  padding: 0;
}
.snp-modal-close:hover {
  color: #c9a96e;
}

.snp-modal-img-wrap {
  width: 100%;
  max-height: 68vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.snp-modal-img-wrap img {
  max-width: 100%;
  max-height: 68vh;
  object-fit: contain;
  display: block;
  border: none;
}

.snp-modal-caption {
  text-align: center;
  padding: 14px 20px 6px;
  max-width: 760px;
}
.snp-modal-caption .snp-modal-title {
  font-family: 'Lato', sans-serif;
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
  margin: 0 0 6px 0;
}
.snp-modal-caption .snp-modal-desc {
  font-family: 'Heebo', sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.snp-modal-counter {
  font-family: 'Heebo', sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #c9a96e;
  padding: 6px 0 0;
  text-align: center;
}

.snp-modal-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 32px;
  line-height: 1;
  padding: 16px 16px;
  cursor: pointer;
  z-index: 100001;
  transition: background 0.25s, color 0.25s;
}
.snp-modal-arrow:hover {
  background: #b8955a;
  color: #fff;
}
.snp-modal-arrow.snp-prev {
  left: 0;
}
.snp-modal-arrow.snp-next {
  right: 0;
}

.snp-modal-thumbs {
  display: flex;
  gap: 8px;
  padding: 12px 0 0;
  overflow-x: auto;
  max-width: 800px;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #b8955a #222;
}
.snp-modal-thumbs::-webkit-scrollbar {
  height: 4px;
}
.snp-modal-thumbs::-webkit-scrollbar-thumb {
  background: #b8955a;
}
.snp-modal-thumb {
  flex: 0 0 72px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.45;
  border: 2px solid transparent;
  transition: opacity 0.2s, border-color 0.2s;
}
.snp-modal-thumb.active {
  opacity: 1;
  border-color: #c9a96e;
}
</style>
