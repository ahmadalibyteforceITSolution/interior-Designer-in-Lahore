<template>
  <div class="min-h-screen bg-black text-gray-200 flex flex-col font-sans">
    <AdminHeader />
    <div class="flex-1 flex overflow-hidden">
      <AdminSidebar />
      <main class="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0a0a0a]">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '../../components/admin/AdminHeader.vue';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
</script>
