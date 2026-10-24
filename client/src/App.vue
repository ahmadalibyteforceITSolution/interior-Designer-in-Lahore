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

// Dynamically inject Google AdSense Script and Meta tags once publisher ID is known
function injectAdsenseScript(pubId, enabled = true) {
  if (typeof document === 'undefined') return;

  if (!enabled || !pubId) {
    const existingScript = document.getElementById('google-adsense-script');
    if (existingScript) existingScript.remove();
    const existingMeta = document.getElementById('google-adsense-meta');
    if (existingMeta) existingMeta.remove();
    return;
  }

  const match = pubId.match(/ca-pub-\d+/i) || pubId.match(/pub-\d+/i);
  let cleanId = pubId.trim();
  if (match) {
    cleanId = match[0].toLowerCase().startsWith('ca-') 
      ? match[0].toLowerCase() 
      : `ca-${match[0].toLowerCase()}`;
  }

  if (!cleanId.startsWith('ca-pub-')) return;

  // 1. Injected Meta Tag for Google AdSense account crawler verification
  let meta = document.getElementById('google-adsense-meta');
  if (!meta) {
    meta = document.createElement('meta');
    meta.id = 'google-adsense-meta';
    meta.name = 'google-adsense-account';
    document.head.appendChild(meta);
  }
  meta.content = cleanId;

  // 2. Injected Script Tag for AdSense library
  let script = document.getElementById('google-adsense-script');
  if (script && !script.src.includes(cleanId)) {
    script.remove();
    script = null;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = 'google-adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cleanId}`;
    document.head.appendChild(script);
  }
}

// Ensure favicon is active
function ensureFavicon(logoUrl) {
  if (typeof document === 'undefined') return;
  const favicons = [
    { rel: 'icon', type: 'image/png', href: logoUrl || '/logo.png' },
    { rel: 'shortcut icon', href: logoUrl || '/logo.png' },
    { rel: 'apple-touch-icon', href: logoUrl || '/logo.png' }
  ];
  favicons.forEach(fav => {
    let el = document.querySelector(`link[rel="${fav.rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = fav.rel;
      if (fav.type) el.type = fav.type;
      document.head.appendChild(el);
    }
    el.href = fav.href;
  });
}

onMounted(async () => {
  initTheme();
  await loadSettings();
  ensureFavicon(settings.value?.logoUrl);
  if (settings.value?.adsensePublisherId) {
    injectAdsenseScript(settings.value.adsensePublisherId, settings.value.adsenseEnabled !== false);
  }
});

watch(
  () => [settings.value?.adsensePublisherId, settings.value?.adsenseEnabled],
  ([newId, newEnabled]) => {
    if (newId) {
      injectAdsenseScript(newId, newEnabled !== false);
    }
  }
);

watch(
  () => settings.value?.logoUrl,
  (newLogo) => {
    ensureFavicon(newLogo);
  }
);
</script>
