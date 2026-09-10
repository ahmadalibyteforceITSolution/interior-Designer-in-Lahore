<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-28 pb-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Back Link -->
      <div class="mb-8">
        <router-link
          to="/blogs"
          class="inline-flex items-center gap-2 text-xs text-amber-700 dark:text-brand-gold hover:underline uppercase font-bold tracking-wider"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back to Journal</span>
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20 text-amber-700 dark:text-brand-gold font-mono text-xs uppercase tracking-widest">
        Loading Article...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 space-y-4">
        <h2 class="text-2xl font-heading font-black text-gray-900 dark:text-white">Article Not Found</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400">The requested editorial article does not exist or has been removed.</p>
        <router-link to="/blogs" class="inline-block px-6 py-2.5 bg-brand-gold text-black font-bold text-xs uppercase">
          View All Articles
        </router-link>
      </div>

      <!-- Post Content -->
      <article v-else-if="post" class="space-y-8">
        
        <!-- Post Header -->
        <header class="space-y-4 border-b border-gray-200 dark:border-brand-border pb-8">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-amber-500/10 dark:bg-brand-gold/15 border border-amber-600/30 dark:border-brand-gold/40 text-amber-700 dark:text-brand-gold text-[10px] font-bold uppercase tracking-wider">
              {{ post.category }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">• {{ post.readTime }}</span>
          </div>

          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-gray-900 dark:text-white leading-tight">
            {{ post.title }}
          </h1>

          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono pt-2">
            <span>Written by <strong class="text-gray-900 dark:text-white">{{ post.author }}</strong></span>
            <span>Published {{ new Date(post.createdAt).toLocaleDateString() }}</span>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="post.featuredImage" class="h-80 sm:h-96 w-full overflow-hidden border border-gray-200 dark:border-brand-border">
          <img
            :src="post.featuredImage"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- In-Article Top AdSense Slot (Google Approved Placement) -->
        <AdSenseSlot slot-type="header" />

        <!-- Article Rich Body Content -->
        <div
          class="prose dark:prose-invert prose-stone max-w-none text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-4"
          v-html="post.content"
        ></div>

        <!-- In-Article Mid AdSense Slot -->
        <AdSenseSlot slot-type="inArticle" />

        <!-- Tags -->
        <div v-if="post.tags?.length" class="pt-6 border-t border-gray-200 dark:border-brand-border flex flex-wrap items-center gap-2">
          <span class="text-xs text-amber-700 dark:text-brand-gold font-bold uppercase tracking-wider mr-2">Tags:</span>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-gray-700 dark:text-gray-300 text-xs"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Author Box -->
        <div class="p-6 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border flex items-start gap-4 shadow-sm">
          <div class="w-12 h-12 rounded-full bg-brand-gold/15 dark:bg-black border border-amber-600 dark:border-brand-gold flex items-center justify-center text-amber-700 dark:text-brand-gold font-bold font-heading text-lg shrink-0">
            SP
          </div>
          <div class="space-y-1">
            <h4 class="text-gray-900 dark:text-white font-heading font-bold text-sm">{{ post.author }}</h4>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Published by the architectural research and editorial desk at Spaces & Places Studio Lahore. Dedicated to bringing spatial elegance, structural clarity, and cost transparency to Pakistani homeowners and enterprises.
            </p>
          </div>
        </div>

        <!-- Consultation CTA Strip -->
        <div class="p-8 bg-white dark:bg-[#121212] border border-amber-600/40 dark:border-brand-gold/40 text-center space-y-4 shadow-sm">
          <h3 class="text-xl font-heading font-black text-gray-900 dark:text-white uppercase">
            PLANNING A SIMILAR PROJECT IN LAHORE?
          </h3>
          <p class="text-xs text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Our principal architects and interior leads are available for discovery sessions and plot feasibility evaluations.
          </p>
          <button
            @click="openLetsTalk('Inquiry from: ' + post.title)"
            class="px-8 py-3 bg-brand-gold hover:bg-brand-gold-light text-black font-bold text-xs uppercase tracking-wider shadow-md"
          >
            SCHEDULE A CONSULTATION
          </button>
        </div>

      </article>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlog } from '../api';
import { useSeo } from '../composables/useSeo';
import { useModal } from '../composables/useModal';
import AdSenseSlot from '../components/layout/AdSenseSlot.vue';

const route = useRoute();
const { setMeta } = useSeo();
const { openLetsTalk } = useModal();

const post = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const slug = route.params.slug;
    const data = await getBlog(slug);
    post.value = data;

    setMeta({
      title: data.metaTitle || `${data.title} | Spaces & Places`,
      metaDescription: data.metaDescription || data.excerpt,
      focusKeywords: data.tags?.join(', ') || 'Interior Design, Architecture Lahore',
      canonicalUrl: `https://spacesandplaces.com.pk/blog/${data.slug}`,
      ogImage: data.featuredImage
    });

    injectArticleSchema(data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

function injectArticleSchema(post) {
  let script = document.getElementById('article-schema-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'article-schema-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featuredImage ? [`https://spacesandplaces.com.pk${post.featuredImage}`] : [],
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": [{
      "@type": "Person",
      "name": post.author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Spaces & Places",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spacesandplaces.com.pk/uploads/header-logo.webp"
      }
    },
    "description": post.excerpt
  };

  script.textContent = JSON.stringify(schema);
}
</script>
