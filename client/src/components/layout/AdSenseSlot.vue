<template>
  <div
    v-if="isEnabled"
    :class="[
      'my-8 mx-auto w-full transition-all overflow-hidden flex flex-col items-center justify-center',
      slotType === 'header' ? 'max-w-5xl py-4' : '',
      slotType === 'inArticle' ? 'max-w-4xl py-6 my-10' : '',
      slotType === 'sidebar' ? 'w-full py-4' : '',
      slotType === 'footer' ? 'max-w-5xl py-6' : '',
    ]"
  >
    <!-- AdSense Label -->
    <div class="text-[10px] tracking-widest text-gray-500 uppercase mb-1 font-mono">
      Advertisement
    </div>

    <!-- Ad Unit Wrapper -->
    <div
      class="w-full bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded flex items-center justify-center p-4 min-h-[90px] relative overflow-hidden transition-colors duration-300 shadow-sm"
    >
      <!-- Real Google AdSense Tag -->
      <ins
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="settings.adsensePublisherId || 'ca-pub-9876543210123456'"
        :data-ad-slot="adSlotId || '1234567890'"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <!-- Pre-Approval Preview Banner (Safe & Compliant) -->
      <div class="text-center py-2">
        <div class="flex items-center justify-center gap-2 text-amber-700 dark:text-brand-gold/70 text-xs font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Google AdSense Placement ({{ slotType.toUpperCase() }})</span>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
          Publisher ID: {{ settings.adsensePublisherId || 'Configurable in cPanel Dashboard' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSettings } from '../../composables/useSettings';

const props = defineProps({
  slotType: {
    type: String,
    default: 'inArticle' // 'header' | 'inArticle' | 'sidebar' | 'footer'
  },
  adSlotId: {
    type: String,
    default: ''
  }
});

const { settings } = useSettings();

const isEnabled = computed(() => {
  if (!settings.value.adsenseEnabled) return false;
  if (!settings.value.adSlots) return true;
  return settings.value.adSlots[props.slotType] !== false;
});

onMounted(() => {
  try {
    if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
      window.adsbygoogle.push({});
    }
  } catch (e) {
    // adsbygoogle push error suppressed
  }
});
</script>
