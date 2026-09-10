const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('spaces_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// In-Memory & Session SWR Cache for sub-second UI delivery
const apiMemoryCache = new Map();

function clearCache() {
  apiMemoryCache.clear();
  try {
    const keys = Object.keys(sessionStorage);
    for (const k of keys) {
      if (k.startsWith('snp_swr_')) sessionStorage.removeItem(k);
    }
  } catch (e) {}
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

// Fast SWR Fetch: Returns cached data immediately (0ms) while revalidating in background
async function fetchWithCache(url, options = {}, ttlMs = 10 * 60 * 1000) {
  const method = (options.method || 'GET').toUpperCase();
  if (method !== 'GET') {
    clearCache();
    return fetchJSON(url, options);
  }

  const cacheKey = `snp_swr_${url}`;
  const now = Date.now();

  // 1. Check in-memory cache first (0ms)
  if (apiMemoryCache.has(cacheKey)) {
    const cached = apiMemoryCache.get(cacheKey);
    // Background revalidate if older than 30 seconds
    if (now - cached.timestamp > 30000) {
      fetchJSON(url, options).then(fresh => {
        if (fresh) {
          apiMemoryCache.set(cacheKey, { data: fresh, timestamp: Date.now() });
          try { sessionStorage.setItem(cacheKey, JSON.stringify({ data: fresh, timestamp: Date.now() })); } catch (e) {}
        }
      }).catch(() => {});
    }
    return cached.data;
  }

  // 2. Check SessionStorage (0ms on fresh page navigation)
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.data) {
        apiMemoryCache.set(cacheKey, parsed);
        // Background revalidate
        fetchJSON(url, options).then(fresh => {
          if (fresh) {
            apiMemoryCache.set(cacheKey, { data: fresh, timestamp: Date.now() });
            try { sessionStorage.setItem(cacheKey, JSON.stringify({ data: fresh, timestamp: Date.now() })); } catch (e) {}
          }
        }).catch(() => {});
        return parsed.data;
      }
    }
  } catch (e) {}

  // 3. Fallback: Network fetch, store in cache and return
  const data = await fetchJSON(url, options);
  apiMemoryCache.set(cacheKey, { data, timestamp: now });
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }));
  } catch (e) {}
  return data;
}

// Site Settings
export const getSettings = () => fetchWithCache(`${API_BASE}/settings`);
export const updateSettings = (data) => fetchJSON(`${API_BASE}/settings`, {
  method: 'PUT',
  body: JSON.stringify(data)
}).then(res => { clearCache(); return res; });

// Pages
export const getPages = () => fetchWithCache(`${API_BASE}/pages`);
export const getPage = (slug) => fetchWithCache(`${API_BASE}/pages/${slug}`);
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
