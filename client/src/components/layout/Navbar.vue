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
        <div class="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0 ml-4">
          
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

        <!-- Mobile Buttons (Theme Toggle + Let's Talk + Hamburger) -->
        <div class="flex xl:hidden items-center gap-2 sm:gap-3">
          
          <!-- Mobile Theme Switcher -->
          <button
            @click="toggleTheme"
            class="p-1.5 rounded-full border text-brand-gold transition-colors"
            :class="isDark ? 'border-brand-border bg-black' : 'border-gray-300 bg-white'"
            aria-label="Toggle Theme"
          >
            <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <button
            @click="openLetsTalk('Mobile Quick Consultation')"
            class="px-2.5 py-1 text-[11px] font-bold text-brand-gold border border-brand-gold uppercase"
          >
            TALK
          </button>

          <!-- Hamburger Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="focus:outline-none p-1.5 transition-colors"
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
      class="fixed inset-0 top-[60px] bg-black/85 backdrop-blur-sm z-40 xl:hidden"
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
          'xl:hidden relative z-50 px-6 py-6 max-h-[85vh] overflow-y-auto border-b-2 border-brand-gold shadow-2xl animate-fade-in-down',
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

          <!-- Direct Call in Drawer -->
          <div class="pt-4 mt-2">
            <a
              :href="'tel:' + (settings.phone || '+923001999967')"
              class="flex items-center gap-3 py-3 px-4 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold font-bold text-[14px]"
            >
              <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/>
              </svg>
              <span>{{ settings.phone || '+92 300 1999967' }}</span>
            </a>
          </div>

        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSettings } from '../../composables/useSettings';
import { useModal } from '../../composables/useModal';
import { useTheme } from '../../composables/useTheme';

const route = useRoute();
const { settings } = useSettings();
const { openLetsTalk } = useModal();
const { isDark, initTheme, toggleTheme } = useTheme();

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

onMounted(() => {
  initTheme();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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
