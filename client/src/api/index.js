const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('spaces_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
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

// Site Settings
export const getSettings = () => fetchJSON(`${API_BASE}/settings`);
export const updateSettings = (data) => fetchJSON(`${API_BASE}/settings`, {
  method: 'PUT',
  body: JSON.stringify(data)
});

// Pages
export const getPages = () => fetchJSON(`${API_BASE}/pages`);
export const getPage = (slug) => fetchJSON(`${API_BASE}/pages/${slug}`);
export const updatePage = (slug, data) => fetchJSON(`${API_BASE}/pages/${slug}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const createPage = (data) => fetchJSON(`${API_BASE}/pages`, {
  method: 'POST',
  body: JSON.stringify(data)
});
export const deletePage = (slug) => fetchJSON(`${API_BASE}/pages/${slug}`, {
  method: 'DELETE'
});

// SEO & cPanel
export const getSeoList = () => fetchJSON(`${API_BASE}/seo`);
export const updateSeo = (slug, data) => fetchJSON(`${API_BASE}/seo/${slug}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const getRobotsTxt = () => fetchJSON(`${API_BASE}/seo/robots`);
export const updateRobotsTxt = (robotsTxt) => fetchJSON(`${API_BASE}/seo/robots`, {
  method: 'PUT',
  body: JSON.stringify({ robotsTxt })
});

// Blogs
export const getBlogs = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchJSON(`${API_BASE}/blogs${query ? '?' + query : ''}`);
};
export const getBlog = (slug) => fetchJSON(`${API_BASE}/blogs/${slug}`);
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
