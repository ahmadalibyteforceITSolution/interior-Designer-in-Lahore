import { ref, onMounted, watch } from 'vue';
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

  async function loadData() {
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
      const data = await getPage(slug);
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

  onMounted(loadData);

  return {
    pageData,
    loading,
    loadData
  };
}
