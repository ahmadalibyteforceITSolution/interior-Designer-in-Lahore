<template>
  <section v-if="faqs?.length" class="py-20 bg-white dark:bg-brand-surface relative border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Heading -->
      <div class="text-center mb-12 space-y-2">
        <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">{{ badge || 'ANSWERS & CLARITY' }}</span>
        <h2 class="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white uppercase tracking-tight">
          {{ title || 'FREQUENTLY ASKED QUESTIONS' }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {{ subtitle || 'Everything you need to know about our architectural, interior, and construction services in Lahore.' }}
        </p>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="border border-gray-200 dark:border-brand-border bg-[#faf9f6] dark:bg-[#141414] transition-colors shadow-sm dark:shadow-none"
          :class="openIndex === idx ? 'border-amber-500 dark:border-brand-gold/50' : 'hover:border-gray-300 dark:hover:border-brand-border/90'"
        >
          <button
            @click="toggle(idx)"
            class="w-full flex items-center justify-between p-5 text-left transition-colors"
          >
            <span class="text-sm sm:text-base font-heading font-bold text-gray-900 dark:text-white pr-4">
              {{ faq.question }}
            </span>
            <div
              :class="[
                'w-7 h-7 rounded-full border border-gray-300 dark:border-brand-border flex items-center justify-center shrink-0 text-amber-700 dark:text-brand-gold transition-transform duration-300',
                openIndex === idx ? 'rotate-180 bg-brand-gold text-black border-brand-gold' : ''
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </button>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="openIndex === idx" class="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-brand-border/40">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  faqs: {
    type: Array,
    default: () => []
  },
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
});

const openIndex = ref(0);

function toggle(idx) {
  openIndex.value = openIndex.value === idx ? -1 : idx;
}

// Inject Schema.org FAQPage for Google SEO
function injectFaqSchema() {
  if (!props.faqs?.length) return;
  let script = document.getElementById('faq-schema-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'faq-schema-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": props.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  script.textContent = JSON.stringify(schema);
}

onMounted(injectFaqSchema);
watch(() => props.faqs, injectFaqSchema, { deep: true });
</script>
