<template>
  <div class="space-y-6">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Blog Articles CMS
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Create, edit, and publish high-quality articles to boost Google AdSense approval and organic search presence.
        </p>
      </div>

      <button
        @click="openNewBlogModal"
        class="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow"
      >
        + Write New Article
      </button>
    </div>

    <!-- Blogs List -->
    <div class="bg-brand-surface border border-brand-border overflow-x-auto -webkit-overflow-scrolling-touch">
      <div v-if="loading" class="text-center py-16 text-brand-gold text-xs font-mono">
        Loading Articles...
      </div>

      <div v-else-if="blogs.length === 0" class="text-center py-16 text-gray-400 text-xs">
        No articles found. Click "+ Write New Article" to publish your first post.
      </div>

      <table v-else class="w-full text-left text-xs min-w-[650px]">
        <thead class="bg-[#161616] text-gray-400 uppercase tracking-wider border-b border-brand-border">
          <tr>
            <th class="py-3 px-4">Article Title</th>
            <th class="py-3 px-4">Category</th>
            <th class="py-3 px-4">Author</th>
            <th class="py-3 px-4">Published Date</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border/60">
          <tr v-for="blog in blogs" :key="blog._id" class="hover:bg-[#141414] transition-colors">
            <td class="py-3 px-4 font-bold text-white max-w-md truncate">
              {{ blog.title }}
            </td>
            <td class="py-3 px-4 text-brand-gold uppercase text-[10px]">
              {{ blog.category }}
            </td>
            <td class="py-3 px-4 text-gray-300">
              {{ blog.author }}
            </td>
            <td class="py-3 px-4 text-gray-400">
              {{ new Date(blog.createdAt).toLocaleDateString() }}
            </td>
            <td class="py-3 px-4 text-right space-x-2">
              <button
                @click="editBlog(blog)"
                class="px-3 py-1 bg-[#222] hover:bg-brand-gold hover:text-black text-gray-200 text-[10px] font-bold uppercase rounded transition-colors"
              >
                Edit
              </button>
              <button
                @click="removeBlog(blog._id)"
                class="px-3 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white text-[10px] font-bold uppercase rounded transition-colors"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit / Create Article Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4"
    >
      <div class="bg-brand-surface border border-brand-border w-full max-w-3xl p-4 sm:p-6 relative max-h-[92vh] overflow-y-auto space-y-4 text-xs">
        <div class="flex items-center justify-between border-b border-brand-border pb-3">
          <h3 class="text-base font-heading font-bold text-white uppercase">
            {{ isEditing ? 'Edit Article' : 'Write New Article' }}
          </h3>
          <button @click="isModalOpen = false" class="text-gray-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Title *</label>
            <input
              v-model="currentBlog.title"
              type="text"
              required
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-bold"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Slug / URL</label>
              <input
                v-model="currentBlog.slug"
                type="text"
                class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
              />
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Category</label>
              <select
                v-model="currentBlog.category"
                class="w-full bg-black border border-brand-border text-white px-3 py-2 outline-none"
              >
                <option value="Interior Design">Interior Design</option>
                <option value="Architecture">Architecture</option>
                <option value="Construction">Construction</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-300 font-medium mb-1 uppercase">Author</label>
              <input
                v-model="currentBlog.author"
                type="text"
                class="w-full bg-black border border-brand-border text-white px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Featured Image URL</label>
            <input
              v-model="currentBlog.featuredImage"
              type="text"
              class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-3 py-2 outline-none font-mono"
            />
          </div>

          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Excerpt / Summary (AdSense Meta)</label>
            <textarea
              v-model="currentBlog.excerpt"
              rows="2"
              class="w-full bg-black border border-brand-border text-white px-3 py-2 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-300 font-medium mb-1 uppercase">Article Content (HTML allowed)</label>
            <textarea
              v-model="currentBlog.content"
              rows="8"
              class="w-full bg-black border border-brand-border text-white p-3 outline-none font-mono resize-none leading-relaxed"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-brand-border">
            <button
              @click="isModalOpen = false"
              type="button"
              class="px-4 py-2 border border-brand-border text-gray-300 hover:text-white uppercase font-bold"
            >
              Cancel
            </button>
            <button
              @click="saveBlog"
              :disabled="saving"
              class="px-6 py-2 bg-brand-gold hover:bg-brand-gold-light text-black font-bold uppercase tracking-wider rounded disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Article' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../api';
import { useToast } from '../../composables/useToast';

const { showToast } = useToast();

const blogs = ref([]);
const loading = ref(true);
const isModalOpen = ref(false);
const isEditing = ref(false);
const saving = ref(false);

const currentBlog = ref({
  title: '',
  slug: '',
  category: 'Interior Design',
  author: 'Spaces & Places Editorial',
  readTime: '5 min read',
  featuredImage: '/uploads/01-01-8.jpg',
  excerpt: '',
  content: '',
  tags: []
});

async function loadBlogs() {
  loading.value = true;
  try {
    const data = await getBlogs();
    blogs.value = data;
  } catch (err) {
    showToast('Error loading blogs: ' + err.message, 'error');
  } finally {
    loading.value = false;
  }
}

function openNewBlogModal() {
  isEditing.value = false;
  currentBlog.value = {
    title: '',
    slug: '',
    category: 'Interior Design',
    author: 'Spaces & Places Editorial',
    readTime: '5 min read',
    featuredImage: '/uploads/01-01-8.jpg',
    excerpt: '',
    content: '<p>Article content goes here...</p>',
    tags: ['Interior Design', 'Lahore']
  };
  isModalOpen.value = true;
}

function editBlog(blog) {
  isEditing.value = true;
  currentBlog.value = { ...blog };
  isModalOpen.value = true;
}

async function saveBlog() {
  saving.value = true;
  try {
    if (!currentBlog.value.slug) {
      currentBlog.value.slug = currentBlog.value.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    if (isEditing.value) {
      await updateBlog(currentBlog.value._id, currentBlog.value);
      showToast('Article updated successfully!', 'success');
    } else {
      await createBlog(currentBlog.value);
      showToast('New article published successfully!', 'success');
    }

    isModalOpen.value = false;
    loadBlogs();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    saving.value = false;
  }
}

async function removeBlog(id) {
  if (confirm('Are you sure you want to delete this article?')) {
    try {
      await deleteBlog(id);
      showToast('Article deleted', 'info');
      loadBlogs();
    } catch (err) {
      showToast('Error deleting: ' + err.message, 'error');
    }
  }
}

onMounted(loadBlogs);
</script>
