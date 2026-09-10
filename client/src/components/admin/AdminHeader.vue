<template>
  <header class="h-16 bg-[#121212] border-b border-brand-border flex items-center justify-between px-6 z-20">
    <div class="flex items-center gap-4">
      <router-link to="/admin" class="flex items-center gap-2">
        <span class="text-white font-heading font-black tracking-widest text-base">SPACES & PLACES</span>
        <span class="px-2 py-0.5 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-wider rounded-sm">
          cPanel CMS
        </span>
      </router-link>
    </div>

    <div class="flex items-center gap-4 text-xs">
      <a
        href="/"
        target="_blank"
        class="flex items-center gap-1.5 text-gray-300 hover:text-brand-gold transition-colors py-1 px-3 border border-brand-border rounded"
      >
        <span>View Live Website</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>

      <button
        @click="handleLogout"
        class="text-red-400 hover:text-red-300 transition-colors py-1 px-3 border border-red-500/30 rounded"
      >
        Sign Out
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from '../../composables/useToast';

const router = useRouter();
const { showToast } = useToast();

function handleLogout() {
  localStorage.removeItem('spaces_admin_token');
  showToast('Logged out successfully', 'info');
  router.push('/admin/login');
}
</script>
