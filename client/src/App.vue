<template>
  <div
    :class="[
      'min-h-screen flex flex-col transition-colors duration-300 selection:bg-brand-gold selection:text-black',
      isDark ? 'bg-black text-gray-100' : 'bg-brand-light-bg text-gray-900'
    ]"
  >
    
    <!-- Public Header (hidden on admin pages) -->
    <Navbar v-if="!isAdminRoute" />

    <!-- Main View Viewport with Smooth Page Transition (Fade In / Fade Out) -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>

    <!-- Public Footer (hidden on admin pages) -->
    <Footer v-if="!isAdminRoute" />

    <!-- Global "Let's Talk" Consultation Modal -->
    <LetsTalkModal />

    <!-- Global Notification Toast -->
    <Toast />

  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSettings } from './composables/useSettings';
import { useTheme } from './composables/useTheme';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import LetsTalkModal from './components/layout/LetsTalkModal.vue';
import Toast from './components/layout/Toast.vue';

const route = useRoute();
const { settings, loadSettings } = useSettings();
const { isDark, initTheme } = useTheme();

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin');
});

// Dynamically inject Google AdSense Script once publisher ID is known
function injectAdsenseScript(pubId) {
  if (!pubId || !pubId.startsWith('ca-pub-')) return;
  if (document.getElementById('google-adsense-script')) return;

  const script = document.createElement('script');
  script.id = 'google-adsense-script';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
  document.head.appendChild(script);
}

onMounted(async () => {
  initTheme();
  await loadSettings();
  if (settings.value?.adsensePublisherId) {
    injectAdsenseScript(settings.value.adsensePublisherId);
  }
});

watch(
  () => settings.value?.adsensePublisherId,
  (newId) => {
    if (newId) injectAdsenseScript(newId);
  }
);
</script>
