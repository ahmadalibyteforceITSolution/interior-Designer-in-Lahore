<template>
  <header class="h-16 bg-[#121212] border-b border-brand-border flex items-center justify-between px-3 sm:px-6 z-30 shrink-0">
    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Mobile Sidebar Toggle Hamburger Button -->
      <button
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 -ml-1 text-gray-400 hover:text-brand-gold lg:hidden focus:outline-none rounded transition-colors"
        aria-label="Toggle Sidebar Menu"
      >
        <svg v-if="!isSidebarOpen" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <router-link to="/admin" class="flex items-center gap-1.5 sm:gap-2">
        <span class="text-white font-heading font-black tracking-wider text-sm sm:text-base whitespace-nowrap">
          SPACES & PLACES
        </span>
        <span class="hidden xs:inline-block px-1.5 sm:px-2 py-0.5 bg-brand-gold text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-sm">
          cPanel
        </span>
      </router-link>
    </div>

    <div class="flex items-center gap-2 sm:gap-4 text-xs">
      <a
        href="/"
        target="_blank"
        class="flex items-center gap-1 sm:gap-1.5 text-gray-300 hover:text-brand-gold transition-colors py-1 px-2 sm:px-3 border border-brand-border rounded text-[11px] sm:text-xs whitespace-nowrap"
      >
        <span class="hidden sm:inline">View Live Website</span>
        <span class="sm:hidden">Live Site</span>
        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>

      <button
        @click="handleLogout"
        class="text-red-400 hover:text-red-300 transition-colors py-1 px-2 sm:px-3 border border-red-500/30 rounded text-[11px] sm:text-xs whitespace-nowrap"
      >
        Sign Out
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from '../../composables/useToast';

defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle-sidebar']);

const router = useRouter();
const { showToast } = useToast();

function handleLogout() {
  localStorage.removeItem('spaces_admin_token');
  showToast('Logged out successfully', 'info');
  router.push('/admin/login');
}
</script>
