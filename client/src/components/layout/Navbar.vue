<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in-down',
      isScrolled || isMobileMenuOpen
        ? (isDark ? 'bg-black py-3 shadow-2xl border-b border-brand-border' : 'bg-white py-3 shadow-md border-b border-gray-200')
        : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
    ]"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Left: Logo with ample right margin -->
        <router-link
          to="/"
          class="flex items-center gap-3 shrink-0 mr-4 sm:mr-6 xl:mr-8 group focus:outline-none"
        >
          <img
            :src="currentLogo"
            alt="Spaces & Places"
            class="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            @error="onLogoError"
          />
          <!-- Fallback Brand Text -->
          <div v-if="showFallbackLogo" class="flex flex-col">
            <span class="font-heading font-black tracking-widest text-lg leading-tight" :class="isDark ? 'text-white' : 'text-gray-900'">
              SPACES
            </span>
            <span class="text-brand-gold font-heading font-black tracking-widest text-lg leading-tight">
              & PLACES
            </span>
          </div>
        </router-link>

        <!-- Center: Desktop Navigation Menu -->
        <nav class="hidden xl:flex items-center space-x-4 2xl:space-x-6 text-[12px] 2xl:text-[13px] font-medium tracking-wider uppercase whitespace-nowrap">
          
          <!-- HOME -->
          <router-link
            to="/"
            class="relative py-2 transition-colors duration-200 group"
            :class="getLinkClass($route.path === '/')"
          >
            <span>HOME</span>
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
                $route.path === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </router-link>

          <!-- ABOUT US -->
          <router-link
            to="/about-us"
            class="relative py-2 transition-colors duration-200 group"
            :class="getLinkClass($route.path === '/about-us')"
          >
            <span>ABOUT US</span>
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
                $route.path === '/about-us' ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </router-link>

          <!-- INTERIOR DESIGN Dropdown -->
          <div class="relative group" @mouseenter="openDropdown('interior')" @mouseleave="closeDropdown">
            <button
              class="flex items-center gap-1.5 py-2 transition-colors duration-200"
              :class="getLinkClass(isInteriorActive)"
            >
              <span>INTERIOR DESIGN</span>
              <svg class="w-3 h-3 text-brand-gold transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu with Fade & Scale Animation -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-show="activeDropdown === 'interior'"
                :class="[
                  'absolute left-0 top-full mt-1 min-w-[360px] w-max max-w-[440px] shadow-2xl py-2 rounded-none border-t-2 border-brand-gold z-50 animate-fade-in-up',
                  isDark ? 'bg-[#0f0f0f] border-x border-b border-brand-gold/40' : 'bg-white border-x border-b border-gray-200 shadow-2xl'
                ]"
              >
                <router-link
                  v-for="sub in interiorLinks"
                  :key="sub.path"
                  :to="sub.path"
                  :class="[
                    'block px-6 py-2.5 text-[12px] font-medium tracking-wider whitespace-nowrap transition-all duration-150',
                    $route.path === sub.path
                      ? (isDark ? 'text-brand-gold font-bold pl-7 bg-white/5' : 'text-amber-800 font-bold pl-7 bg-amber-500/10')
                      : (isDark
                          ? 'text-gray-200 hover:bg-white/5 hover:text-brand-gold hover:pl-7'
                          : 'text-gray-800 hover:bg-amber-500/10 hover:text-amber-800 hover:pl-7')
                  ]"
                  @click="closeDropdown"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- ARCHITECTURAL DESIGNS Dropdown -->
          <div class="relative group" @mouseenter="openDropdown('arch')" @mouseleave="closeDropdown">
            <button
              class="flex items-center gap-1.5 py-2 transition-colors duration-200"
              :class="getLinkClass(isArchActive)"
            >
              <span>ARCHITECTURAL DESIGNS</span>
              <svg class="w-3 h-3 text-brand-gold transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-show="activeDropdown === 'arch'"
                :class="[
                  'absolute left-0 top-full mt-1 min-w-[390px] w-max max-w-[460px] shadow-2xl py-2 rounded-none border-t-2 border-brand-gold z-50 animate-fade-in-up',
                  isDark ? 'bg-[#0f0f0f] border-x border-b border-brand-gold/40' : 'bg-white border-x border-b border-gray-200 shadow-2xl'
                ]"
              >
                <router-link
                  v-for="sub in archLinks"
                  :key="sub.path"
                  :to="sub.path"
                  :class="[
                    'block px-6 py-2.5 text-[12px] font-medium tracking-wider whitespace-nowrap transition-all duration-150',
                    $route.path === sub.path
                      ? (isDark ? 'text-brand-gold font-bold pl-7 bg-white/5' : 'text-amber-800 font-bold pl-7 bg-amber-500/10')
                      : (isDark
                          ? 'text-gray-200 hover:bg-white/5 hover:text-brand-gold hover:pl-7'
                          : 'text-gray-800 hover:bg-amber-500/10 hover:text-amber-800 hover:pl-7')
                  ]"
                  @click="closeDropdown"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- CONSTRUCTION SERVICES Dropdown -->
          <div class="relative group" @mouseenter="openDropdown('const')" @mouseleave="closeDropdown">
            <button
              class="flex items-center gap-1.5 py-2 transition-colors duration-200"
              :class="getLinkClass(isConstActive)"
            >
              <span>CONSTRUCTION SERVICES</span>
              <svg class="w-3 h-3 text-brand-gold transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-show="activeDropdown === 'const'"
                :class="[
                  'absolute left-0 top-full mt-1 min-w-[390px] w-max max-w-[460px] shadow-2xl py-2 rounded-none border-t-2 border-brand-gold z-50 animate-fade-in-up',
                  isDark ? 'bg-[#0f0f0f] border-x border-b border-brand-gold/40' : 'bg-white border-x border-b border-gray-200 shadow-2xl'
                ]"
              >
                <router-link
                  v-for="sub in constLinks"
                  :key="sub.path"
                  :to="sub.path"
                  :class="[
                    'block px-6 py-2.5 text-[12px] font-medium tracking-wider whitespace-nowrap transition-all duration-150',
                    $route.path === sub.path
                      ? (isDark ? 'text-brand-gold font-bold pl-7 bg-white/5' : 'text-amber-800 font-bold pl-7 bg-amber-500/10')
                      : (isDark
                          ? 'text-gray-200 hover:bg-white/5 hover:text-brand-gold hover:pl-7'
                          : 'text-gray-800 hover:bg-amber-500/10 hover:text-amber-800 hover:pl-7')
                  ]"
                  @click="closeDropdown"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- FURNITURE Dropdown -->
          <div class="relative group" @mouseenter="openDropdown('furniture')" @mouseleave="closeDropdown">
            <button
              class="flex items-center gap-1.5 py-2 transition-colors duration-200"
              :class="getLinkClass(isFurnitureActive)"
            >
              <span>FURNITURE</span>
              <svg class="w-3 h-3 text-brand-gold transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-show="activeDropdown === 'furniture'"
                :class="[
                  'absolute left-0 top-full mt-1 min-w-[340px] w-max max-w-[420px] shadow-2xl py-2 rounded-none border-t-2 border-brand-gold z-50 animate-fade-in-up',
                  isDark ? 'bg-[#0f0f0f] border-x border-b border-brand-gold/40' : 'bg-white border-x border-b border-gray-200 shadow-xl'
                ]"
              >
                <router-link
                  v-for="sub in furnitureLinks"
                  :key="sub.path"
                  :to="sub.path"
                  :class="[
                    'block px-6 py-2.5 text-[12px] font-medium tracking-wider whitespace-nowrap transition-all duration-150',
                    $route.path === sub.path
                      ? (isDark ? 'text-brand-gold font-bold pl-7 bg-white/5' : 'text-amber-800 font-bold pl-7 bg-amber-500/10')
                      : (isDark
                          ? 'text-gray-200 hover:bg-white/5 hover:text-brand-gold hover:pl-7'
                          : 'text-gray-800 hover:bg-amber-500/10 hover:text-amber-800 hover:pl-7')
                  ]"
                  @click="closeDropdown"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </transition>
          </div>

          <!-- BLOGS -->
          <router-link
            to="/blogs"
            class="relative py-2 transition-colors duration-200 group"
            :class="getLinkClass($route.path.startsWith('/blog'))"
          >
            <span>BLOGS</span>
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
                $route.path.startsWith('/blog') ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </router-link>

          <!-- CONTACT -->
          <router-link
            to="/contact"
            class="relative py-2 transition-colors duration-200 group"
            :class="getLinkClass($route.path === '/contact')"
          >
            <span>CONTACT</span>
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
                $route.path === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </router-link>

          <!-- OUR CLIENTS -->
          <router-link
            to="/our-clients"
            class="relative py-2 transition-colors duration-200 group"
            :class="getLinkClass($route.path === '/our-clients')"
          >
            <span>OUR CLIENTS</span>
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
                $route.path === '/our-clients' ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </router-link>

        </nav>

        <!-- Right Side: Theme Toggle + Let's Talk CTA + Phone -->
        <div class="hidden xl:flex items-center gap-3 2xl:gap-4 shrink-0 ml-4">
          
          <!-- Theme Toggle Button (Dark / Light) -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center"
            :class="themeBtnClass"
            :title="isDark ? 'Switch to Luxury Light Mode' : 'Switch to Luxury Dark Mode'"
            aria-label="Toggle theme mode"
          >
            <!-- Sun Icon (when in dark mode, click to make light) -->
            <svg v-if="isDark" class="w-4 h-4 transition-transform duration-500 hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <!-- Moon Icon (when in light mode, click to make dark) -->
            <svg v-else class="w-4 h-4 transition-transform duration-500 hover:-rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- LET'S TALK CTA Button -->
          <button
            @click="openLetsTalk('Direct Consultation')"
            class="px-4 xl:px-5 py-2 text-[12px] font-heading font-bold tracking-widest uppercase transition-all duration-300 border"
            :class="ctaBtnClass"
          >
            LET'S TALK
          </button>

          <!-- Direct Phone Call -->
          <a
            :href="'tel:' + (settings.phone || '+923001999967')"
            class="flex items-center gap-2 transition-colors text-[12px] xl:text-[13px] font-bold tracking-wide"
            :class="phoneClass"
          >
            <svg class="w-4 h-4 text-brand-gold shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
            </svg>
            <span class="whitespace-nowrap">{{ settings.phone || '+92 300 1999967' }}</span>
          </a>

        </div>

        <!-- Mobile Buttons (Phone + Theme Switcher + TALK + Hamburger) -->
        <div class="flex xl:hidden items-center gap-1.5 sm:gap-2.5">
          <!-- Mobile Direct Call Button -->
          <a
            :href="'tel:' + (settings.phone || '+923001999967')"
            class="p-2 rounded-full border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-black transition-colors flex items-center justify-center shrink-0"
            aria-label="Direct Phone Hotline"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
            </svg>
          </a>

          <!-- Mobile Theme Switcher -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full border text-brand-gold transition-colors flex items-center justify-center shrink-0"
            :class="isDark ? 'border-brand-border bg-black/80' : 'border-gray-300 bg-white'"
            aria-label="Toggle Theme"
          >
            <svg v-if="isDark" class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- TALK CTA Button -->
          <button
            @click="openLetsTalk('Mobile Quick Consultation')"
            class="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-brand-gold border border-brand-gold hover:bg-brand-gold hover:text-black uppercase rounded-sm transition-colors shrink-0"
          >
            TALK
          </button>

          <!-- Hamburger Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 transition-colors focus:outline-none shrink-0"
            :class="[
              isMobileMenuOpen || isScrolled
                ? (isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700')
                : 'text-white hover:text-brand-gold'
            ]"
            aria-label="Toggle navigation menu"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Solid Dim Backdrop Overlay on Mobile Menu Open -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 top-[54px] sm:top-[64px] bg-black/80 backdrop-blur-sm z-40 xl:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Mobile Drawer Menu (Solid 100% Opaque, Light and Dark) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        :class="[
          'xl:hidden fixed top-[54px] sm:top-[64px] inset-x-0 bottom-0 z-50 px-5 sm:px-8 py-6 overflow-y-auto border-b-2 border-brand-gold shadow-2xl animate-fade-in-down',
          isDark ? 'bg-[#0e0e0e] text-white divide-y divide-[#222]' : 'bg-white text-gray-900 divide-y divide-gray-100'
        ]"
      >
        <div class="space-y-3 text-[13px] font-bold uppercase tracking-wider">
          
          <div class="pt-1">
            <router-link
              to="/"
              class="block py-2 transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
              @click="isMobileMenuOpen = false"
            >
              HOME
            </router-link>
          </div>

          <div class="pt-2">
            <router-link
              to="/about-us"
              class="block py-2 transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
              @click="isMobileMenuOpen = false"
            >
              ABOUT US
            </router-link>
          </div>

          <!-- Mobile Interior Design Accordion -->
          <div class="pt-2">
            <button
              @click="toggleMobileSection('interior')"
              class="w-full flex items-center justify-between py-2 text-left transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
            >
              <span>INTERIOR DESIGN</span>
              <svg :class="['w-4 h-4 text-brand-gold transition-transform duration-200', mobileSection === 'interior' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileSection === 'interior'" class="pl-4 py-2 space-y-2 border-l-2 border-brand-gold/50 my-1">
              <router-link
                v-for="sub in interiorLinks"
                :key="sub.path"
                :to="sub.path"
                class="block py-1 text-[12px] font-medium transition-colors"
                :class="isDark ? 'text-gray-300 hover:text-brand-gold' : 'text-gray-700 hover:text-amber-700'"
                @click="isMobileMenuOpen = false"
              >
                {{ sub.name }}
              </router-link>
            </div>
          </div>

          <!-- Mobile Architectural Designs Accordion -->
          <div class="pt-2">
            <button
              @click="toggleMobileSection('arch')"
              class="w-full flex items-center justify-between py-2 text-left transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
            >
              <span>ARCHITECTURAL DESIGNS</span>
              <svg :class="['w-4 h-4 text-brand-gold transition-transform duration-200', mobileSection === 'arch' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileSection === 'arch'" class="pl-4 py-2 space-y-2 border-l-2 border-brand-gold/50 my-1">
              <router-link
                v-for="sub in archLinks"
                :key="sub.path"
                :to="sub.path"
                class="block py-1 text-[12px] font-medium transition-colors"
                :class="isDark ? 'text-gray-300 hover:text-brand-gold' : 'text-gray-700 hover:text-amber-700'"
                @click="isMobileMenuOpen = false"
              >
                {{ sub.name }}
              </router-link>
            </div>
          </div>

          <!-- Mobile Construction Services Accordion -->
          <div class="pt-2">
            <button
              @click="toggleMobileSection('const')"
              class="w-full flex items-center justify-between py-2 text-left transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
            >
              <span>CONSTRUCTION SERVICES</span>
              <svg :class="['w-4 h-4 text-brand-gold transition-transform duration-200', mobileSection === 'const' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileSection === 'const'" class="pl-4 py-2 space-y-2 border-l-2 border-brand-gold/50 my-1">
              <router-link
                v-for="sub in constLinks"
                :key="sub.path"
                :to="sub.path"
                class="block py-1 text-[12px] font-medium transition-colors"
                :class="isDark ? 'text-gray-300 hover:text-brand-gold' : 'text-gray-700 hover:text-amber-700'"
                @click="isMobileMenuOpen = false"
              >
                {{ sub.name }}
              </router-link>
            </div>
          </div>

          <!-- Mobile Furniture Accordion -->
          <div class="pt-2">
            <button
              @click="toggleMobileSection('furniture')"
              class="w-full flex items-center justify-between py-2 text-left transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
            >
              <span>FURNITURE</span>
              <svg :class="['w-4 h-4 text-brand-gold transition-transform duration-200', mobileSection === 'furniture' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileSection === 'furniture'" class="pl-4 py-2 space-y-2 border-l-2 border-brand-gold/50 my-1">
              <router-link
                v-for="sub in furnitureLinks"
                :key="sub.path"
                :to="sub.path"
                class="block py-1 text-[12px] font-medium transition-colors"
                :class="isDark ? 'text-gray-300 hover:text-brand-gold' : 'text-gray-700 hover:text-amber-700'"
                @click="isMobileMenuOpen = false"
              >
                {{ sub.name }}
              </router-link>
            </div>
          </div>

          <div class="pt-2">
            <router-link
              to="/blogs"
              class="block py-2 transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
              @click="isMobileMenuOpen = false"
            >
              BLOGS
            </router-link>
          </div>

          <div class="pt-2">
            <router-link
              to="/contact"
              class="block py-2 transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
              @click="isMobileMenuOpen = false"
            >
              CONTACT
            </router-link>
          </div>

          <div class="pt-2">
            <router-link
              to="/our-clients"
              class="block py-2 transition-colors"
              :class="isDark ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700'"
              @click="isMobileMenuOpen = false"
            >
              OUR CLIENTS
            </router-link>
          </div>

          <!-- Direct Actions in Mobile Drawer -->
          <div class="pt-4 mt-2 space-y-3">
            <a
              :href="'tel:' + (settings.phone || '+923001999967')"
              class="flex items-center justify-center gap-3 py-3 px-4 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold font-bold text-sm tracking-wide hover:bg-brand-gold hover:text-black transition-all rounded-sm"
            >
              <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
              </svg>
              <span>Call Us: {{ settings.phone || '+92 300 1999967' }}</span>
            </a>

            <!-- Social Links in Drawer -->
            <div class="pt-3 border-t border-neutral-800/80">
              <p class="text-[11px] text-gray-400 text-center mb-3 uppercase tracking-wider font-semibold">Connect With Us</p>
              <div class="flex items-center justify-center gap-3">
                <a
                  :href="socialLinks.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  class="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  :href="socialLinks.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  class="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  :href="socialLinks.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  :href="socialLinks.tiktok"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  class="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#e5c158] text-white hover:text-black flex items-center justify-center transition-all shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.75 1.19-.04 2.31-.66 2.92-1.68.32-.51.48-1.11.48-1.71.04-3.53.01-7.06.02-10.59.01-3.26.01-6.52.01-9.78z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSettings } from '../../composables/useSettings';
import { useModal } from '../../composables/useModal';
import { useTheme } from '../../composables/useTheme';

const route = useRoute();
const { settings } = useSettings();
const { openLetsTalk } = useModal();
const { isDark, initTheme, toggleTheme } = useTheme();

const socialLinks = computed(() => ({
  facebook: settings.value?.socialLinks?.facebook || 'https://www.facebook.com/spacesnplacesofficial',
  instagram: settings.value?.socialLinks?.instagram || 'https://www.instagram.com/spacesnplacesofficial/',
  linkedin: settings.value?.socialLinks?.linkedin || 'https://www.linkedin.com/company/spacesnplaces/',
  tiktok: settings.value?.socialLinks?.tiktok || 'https://www.tiktok.com/@spacesnplacesofficial'
}));

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeDropdown = ref(null);
const mobileSection = ref(null);
const showFallbackLogo = ref(false);

const currentLogo = computed(() => {
  if (!isDark.value && isScrolled.value) {
    return settings.value?.logoDarkUrl || '/logo-dark.png';
  }
  return settings.value?.logoUrl || '/logo.png';
});

function getLinkClass(isActive) {
  if (isActive) {
    return 'text-brand-gold font-bold';
  }
  if (!isScrolled.value) {
    return 'text-white hover:text-brand-gold drop-shadow-sm font-medium';
  }
  return isDark.value
    ? 'text-gray-200 hover:text-brand-gold font-medium'
    : 'text-gray-900 hover:text-amber-700 font-medium';
}

const phoneClass = computed(() => {
  if (!isScrolled.value) {
    return 'text-white hover:text-brand-gold drop-shadow-sm';
  }
  return isDark.value ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-amber-700';
});

const ctaBtnClass = computed(() => {
  if (!isScrolled.value) {
    return 'text-brand-gold border-brand-gold hover:bg-brand-gold hover:text-black shadow-gold-glow';
  }
  return isDark.value
    ? 'text-brand-gold border-brand-gold hover:bg-brand-gold hover:text-black shadow-gold-glow'
    : 'text-amber-700 border-amber-700 hover:bg-amber-700 hover:text-white shadow-sm';
});

const themeBtnClass = computed(() => {
  if (!isScrolled.value) {
    return 'bg-black/50 border border-white/40 text-brand-gold hover:bg-black/70 hover:border-brand-gold shadow-md';
  }
  return isDark.value
    ? 'bg-[#1a1a1a] border-brand-border text-brand-gold hover:bg-[#252525] hover:border-brand-gold/60'
    : 'bg-gray-100 border-gray-300 text-amber-700 hover:bg-gray-200 hover:border-amber-500';
});

function onLogoError(e) {
  if (e && e.target) {
    const fallback = (!isDark.value && isScrolled.value) ? '/logo-dark.png' : '/logo.png';
    if (e.target.src !== window.location.origin + fallback) {
      e.target.src = fallback;
      return;
    }
  }
  showFallbackLogo.value = true;
}

function handleScroll() {
  isScrolled.value = window.scrollY > 30;
}

// Auto-close drawer on navigation
watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});

// Prevent background body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
});

onMounted(() => {
  initTheme();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

function openDropdown(name) {
  activeDropdown.value = name;
}

function closeDropdown() {
  activeDropdown.value = null;
}

function toggleMobileSection(sec) {
  mobileSection.value = mobileSection.value === sec ? null : sec;
}

// 1. Interior Design Sub-pages (Exact from screenshot)
const interiorLinks = [
  { name: 'RESIDENTIAL INTERIOR', path: '/residential-interior' },
  { name: 'CORPORATE INTERIOR', path: '/corporate-interior' },
  { name: 'COMMERCIAL INTERIOR', path: '/commercial-interior' },
  { name: 'HOSPITALITY INTERIOR', path: '/hospitality-interior' },
  { name: 'RESTAURANT DESIGN', path: '/restaurant-design' },
  { name: 'INDUSTRIAL DESIGN', path: '/industrial-design' },
  { name: 'CORPORATE DESIGN', path: '/corporate-design' },
  { name: 'INTERIOR FURNISHINGS', path: '/interior-furnishings' },
];

// 2. Architectural Designs Sub-pages (Exact from screenshot)
const archLinks = [
  { name: 'ARCHITECTURAL RESIDENTIAL PLANNING', path: '/architectural-residential-planning' },
  { name: '3D ARCHITECTURAL DESIGN LAHORE', path: '/3d-architectural-design-lahore' },
  { name: 'SPACE PLANNING SERVICES LAHORE', path: '/space-planning-services-lahore' },
  { name: 'ARCHITECTURAL ANIMATION SERVICES LAHORE', path: '/architectural-animation-services-lahore' },
  { name: 'LANDSCAPE DESIGN', path: '/landscape-design' },
  { name: 'FACADE/ ELEVATION DESIGN', path: '/facade-elevation-design' },
  { name: 'MIDRISE/ HIGHRISE PLANNING', path: '/midrise-highrise-planning' },
];

// 3. Construction Services Sub-pages (Exact from screenshot)
const constLinks = [
  { name: 'REFURBISHMENT SERVICES IN LAHORE', path: '/refurbishment-services-in-lahore' },
  { name: 'PROJECT MANAGEMENT IN LAHORE', path: '/project-management-in-lahore' },
  { name: 'CONTRACT ADMINISTRATION SERVICES LAHORE', path: '/contract-administration-services-lahore' },
  { name: 'FULL SCALE CONSTRUCTION COMPANY IN LAHORE', path: '/full-scale-construction-company-in-lahore' },
];

// 4. Furniture Sub-pages (Exact from screenshot)
const furnitureLinks = [
  { name: 'RESIDENTIAL FURNITURE', path: '/residential-furniture' },
  { name: 'CUSTOMIZED FURNITURE', path: '/customized-furniture' },
  { name: 'COMMERCIAL FURNITURE', path: '/commercial-furniture' },
  { name: 'DECOR', path: '/decor' },
];

const isInteriorActive = computed(() => interiorLinks.some(l => l.path === route.path));
const isArchActive = computed(() => archLinks.some(l => l.path === route.path));
const isConstActive = computed(() => constLinks.some(l => l.path === route.path));
const isFurnitureActive = computed(() => furnitureLinks.some(l => l.path === route.path));
</script>
