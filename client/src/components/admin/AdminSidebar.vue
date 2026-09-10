<template>
  <aside class="w-64 bg-black border-r border-brand-border flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-4rem)]">
    
    <div class="space-y-1">
      <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 py-2">
        Core Management
      </div>

      <router-link
        to="/admin"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Overview Dashboard</span>
      </router-link>

      <router-link
        to="/admin/pages"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path.startsWith('/admin/pages') ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <span>Page Content CMS</span>
      </router-link>

      <router-link
        to="/admin/seo"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin/seo' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span>SEO & cPanel Suite</span>
      </router-link>

      <router-link
        to="/admin/blogs"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin/blogs' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
        </svg>
        <span>Blog Articles Manager</span>
      </router-link>

      <router-link
        to="/admin/media"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin/media' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Media Library</span>
      </router-link>

      <router-link
        to="/admin/leads"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin/leads' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <span>Inquiries & Leads</span>
      </router-link>

      <router-link
        to="/admin/settings"
        class="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors"
        :class="$route.path === '/admin/settings' ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-[#181818] hover:text-white'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Site & AdSense Settings</span>
      </router-link>
    </div>

    <!-- MongoDB Status Footer -->
    <div class="p-3 bg-[#121212] border border-brand-border rounded text-[11px] text-gray-400 space-y-1">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-white font-medium">MongoDB Connected</span>
      </div>
      <p class="text-[10px] text-gray-500">Port 5000 • Live Sync</p>
    </div>

  </aside>
</template>
