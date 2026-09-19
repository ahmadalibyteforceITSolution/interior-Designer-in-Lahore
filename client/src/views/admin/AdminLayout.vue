<template>
  <div class="h-screen h-[100dvh] bg-black text-gray-200 flex flex-col font-sans overflow-hidden">
    <AdminHeader
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
    />
    <div class="flex-1 flex overflow-hidden relative min-h-0">
      <AdminSidebar
        :is-open="isSidebarOpen"
        @close="isSidebarOpen = false"
      />
      <main class="flex-1 overflow-y-auto min-h-0 p-3 sm:p-6 lg:p-8 bg-[#0a0a0a]">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AdminHeader from '../../components/admin/AdminHeader.vue';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';

const isSidebarOpen = ref(false);
const route = useRoute();

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false;
});
</script>
