const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('spaces_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// In-Memory & Session SWR Cache with Cross-Tab Invalidation & Versioning
const SNP_CACHE_VERSION = 'v5_distinct_designs';
const apiMemoryCache = new Map();

if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem('snp_app_cache_version') !== SNP_CACHE_VERSION) {
      localStorage.setItem('snp_app_cache_version', SNP_CACHE_VERSION);
      const sessionKeys = Object.keys(sessionStorage);
      for (const k of sessionKeys) {
        if (k.startsWith('snp_swr_')) sessionStorage.removeItem(k);
      }
      apiMemoryCache.clear();
    }
  } catch (e) {}
}

export function clearCache() {
  apiMemoryCache.clear();
  try {
    const sessionKeys = Object.keys(sessionStorage);
    for (const k of sessionKeys) {
      if (k.startsWith('snp_swr_')) sessionStorage.removeItem(k);
    }
  } catch (e) {}
  try {
    // Notify all open tabs via localStorage event
    localStorage.setItem('snp_cache_bust', Date.now().toString());
  } catch (e) {}
}

// Cross-tab storage listener to clear local memory cache
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'snp_cache_bust') {
      apiMemoryCache.clear();
      try {
        const sessionKeys = Object.keys(sessionStorage);
        for (const k of sessionKeys) {
          if (k.startsWith('snp_swr_')) sessionStorage.removeItem(k);
        }
      } catch (err) {}
    }
  });
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(options.headers || {})
    }
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

// Fast SWR Fetch: Returns cached data immediately (0ms) while fetching fresh in background
async function fetchWithCache(url, options = {}, onRevalidate = null, force = false) {
  const method = (options.method || 'GET').toUpperCase();
  if (method !== 'GET' || force) {
    if (method !== 'GET') clearCache();
    const fresh = await fetchJSON(url, options);
    if (method === 'GET') {
      const cacheKey = `snp_swr_${url}`;
      apiMemoryCache.set(cacheKey, { data: fresh, timestamp: Date.now() });
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ data: fresh, timestamp: Date.now() })); } catch (e) {}
    }
    return fresh;
  }

  const cacheKey = `snp_swr_${url}`;
  const now = Date.now();

  let cachedData = null;

  // 1. In-memory check (0ms)
  if (apiMemoryCache.has(cacheKey)) {
    cachedData = apiMemoryCache.get(cacheKey)?.data;
  } else {
    // 2. SessionStorage check (0ms)
    try {
      const raw = sessionStorage.getItem(cacheKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.data) {
          cachedData = parsed.data;
          apiMemoryCache.set(cacheKey, parsed);
        }
      }
    } catch (e) {}
  }

  // Always fetch fresh in background to sync live cPanel updates
  const networkPromise = fetchJSON(url, options)
    .then(fresh => {
      if (fresh) {
        apiMemoryCache.set(cacheKey, { data: fresh, timestamp: Date.now() });
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ data: fresh, timestamp: Date.now() })); } catch (e) {}
        if (typeof onRevalidate === 'function') {
          onRevalidate(fresh);
        }
      }
      return fresh;
    })
    .catch(err => {
      console.warn('Network sync error:', err.message);
      return cachedData;
    });

  // If we have cached/default data, return it immediately for 0ms paint
  if (cachedData) {
    return cachedData;
  }

  // Otherwise wait for network
  return networkPromise;
}

// Site Settings
export const getSettings = (onRevalidate, force = false) => fetchWithCache(`${API_BASE}/settings`, {}, onRevalidate, force);
export const updateSettings = (data) => fetchJSON(`${API_BASE}/settings`, {
  method: 'PUT',
  body: JSON.stringify(data)
}).then(res => { clearCache(); return res; });

// Pages
export const getPages = (onRevalidate, force = false) => fetchWithCache(`${API_BASE}/pages`, {}, onRevalidate, force);
export const getPage = (slug, onRevalidate, force = false) => fetchWithCache(`${API_BASE}/pages/${slug}`, {}, onRevalidate, force);
export const updatePage = (slug, data) => fetchJSON(`${API_BASE}/pages/${slug}`, {
  method: 'PUT',
  body: JSON.stringify(data)
}).then(res => { clearCache(); return res; });
export const createPage = (data) => fetchJSON(`${API_BASE}/pages`, {
  method: 'POST',
  body: JSON.stringify(data)
}).then(res => { clearCache(); return res; });
export const deletePage = (slug) => fetchJSON(`${API_BASE}/pages/${slug}`, {
  method: 'DELETE'
}).then(res => { clearCache(); return res; });

// SEO & cPanel
export const getSeoList = () => fetchWithCache(`${API_BASE}/seo`);
export const updateSeo = (slug, data) => fetchJSON(`${API_BASE}/seo/${slug}`, {
  method: 'PUT',
  body: JSON.stringify(data)
}).then(res => { clearCache(); return res; });
export const getRobotsTxt = () => fetchWithCache(`${API_BASE}/seo/robots`);
export const updateRobotsTxt = (robotsTxt) => fetchJSON(`${API_BASE}/seo/robots`, {
  method: 'PUT',
  body: JSON.stringify({ robotsTxt })
}).then(res => { clearCache(); return res; });

// Blogs
export const getBlogs = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchWithCache(`${API_BASE}/blogs${query ? '?' + query : ''}`);
};
export const getBlog = (slug) => fetchWithCache(`${API_BASE}/blogs/${slug}`);
export const createBlog = (data) => fetchJSON(`${API_BASE}/blogs`, {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateBlog = (id, data) => fetchJSON(`${API_BASE}/blogs/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteBlog = (id) => fetchJSON(`${API_BASE}/blogs/${id}`, {
  method: 'DELETE'
});

// Leads & Inquiries
export const submitLead = (data) => fetchJSON(`${API_BASE}/leads`, {
  method: 'POST',
  body: JSON.stringify(data)
});
export const getLeads = () => fetchJSON(`${API_BASE}/leads`);
export const updateLead = (id, data) => fetchJSON(`${API_BASE}/leads/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteLead = (id) => fetchJSON(`${API_BASE}/leads/${id}`, {
  method: 'DELETE'
});

// Media Library
export const getMedia = () => fetchJSON(`${API_BASE}/media`);
export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/media/upload`, {
    method: 'POST',
    headers: { ...getAuthHeader() },
    body: formData
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'File upload failed');
  return data;
};
export const deleteMedia = (filename) => fetchJSON(`${API_BASE}/media/${filename}`, {
  method: 'DELETE'
});

// Auth
export const login = (credentials) => fetchJSON(`${API_BASE}/auth/login`, {
  method: 'POST',
  body: JSON.stringify(credentials)
});
export const getMe = () => fetchJSON(`${API_BASE}/auth/me`);
export const changePassword = (data) => fetchJSON(`${API_BASE}/auth/change-password`, {
  method: 'POST',
  body: JSON.stringify(data)
});
