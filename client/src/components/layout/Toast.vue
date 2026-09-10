<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-6 right-6 z-50 max-w-md bg-brand-surface border border-brand-border shadow-2xl p-4 flex items-center gap-3"
      :class="toastType === 'success' ? 'border-l-4 border-l-brand-gold' : 'border-l-4 border-l-red-500'"
    >
      <div v-if="toastType === 'success'" class="text-brand-gold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div v-else class="text-red-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <p class="text-xs text-gray-200 font-medium leading-relaxed">{{ toastMessage }}</p>
      <button @click="hideToast" class="text-gray-400 hover:text-white ml-auto p-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { useToast } from '../../composables/useToast';
const { toastMessage, toastType, isVisible, hideToast } = useToast();
</script>
