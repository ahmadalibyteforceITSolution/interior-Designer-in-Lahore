import { ref, onMounted, onUnmounted, watch } from 'vue';
import defaultPages from '../data/defaultPages.json';
import { getPage } from '../api';
import { useSeo } from './useSeo';

export function usePageData(slugRef) {
  const { setMeta } = useSeo();

  function getSlug() {
    return typeof slugRef === 'function' ? slugRef() : (slugRef?.value !== undefined ? slugRef.value : slugRef);
  }

  const currentSlug = getSlug();
  const initial = defaultPages.find(p => p.slug === currentSlug) || null;
  const pageData = ref(initial);
  const loading = ref(!initial);

  if (initial) {
    setMeta(initial);
  }

  async function loadData(force = false) {
    const slug = getSlug();
    if (!slug) return;
    
    // If not loaded from defaults, set fallback
    if (!pageData.value) {
      const fallback = defaultPages.find(p => p.slug === slug);
      if (fallback) {
        pageData.value = fallback;
        setMeta(fallback);
      }
    }

    try {
      const data = await getPage(slug, (fresh) => {
        if (fresh && fresh.title) {
          pageData.value = fresh;
          setMeta(fresh);
        }
      }, force);

      if (data && data.title) {
        pageData.value = data;
        setMeta(data);
      }
    } catch (err) {
      console.warn(`[FastData] Offline/cached fallback active for: ${slug}`);
    } finally {
      loading.value = false;
    }
  }

  function handleStorageBust(e) {
    if (e.key === 'snp_cache_bust') {
      loadData(true);
    }
  }

  onMounted(() => {
    loadData();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageBust);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageBust);
    }
  });

  return {
    pageData,
    loading,
    loadData
  };
}
