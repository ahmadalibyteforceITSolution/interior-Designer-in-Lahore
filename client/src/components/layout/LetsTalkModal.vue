<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLetsTalkOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      @click.self="closeLetsTalk"
    >
      <div
        class="bg-white dark:bg-brand-surface border border-brand-light-border dark:border-brand-border w-full max-w-lg rounded-none shadow-2xl p-6 sm:p-8 relative overflow-hidden transition-colors duration-300"
      >
        <!-- Gold Top Accent Bar -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark"></div>

        <!-- Close Button -->
        <button
          @click="closeLetsTalk"
          class="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Header -->
        <div class="mb-6">
          <span class="text-xs font-bold text-amber-700 dark:text-brand-gold tracking-widest uppercase">Direct Consultation</span>
          <h2 class="text-2xl font-heading font-black text-gray-900 dark:text-white mt-1">LET'S TALK ABOUT YOUR SPACE</h2>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Fill out the form below. A senior architect or interior consultant from our Lahore studio will get in touch within 24 hours.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
          
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Full Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Tariq Khan"
              class="w-full bg-brand-light-card dark:bg-[#1c1c1c] border border-brand-light-border dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="name@example.com"
                class="w-full bg-brand-light-card dark:bg-[#1c1c1c] border border-brand-light-border dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                placeholder="+92 300 0000000"
                class="w-full bg-brand-light-card dark:bg-[#1c1c1c] border border-brand-light-border dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Interested Service</label>
            <select
              v-model="form.service"
              class="w-full bg-brand-light-card dark:bg-[#1c1c1c] border border-brand-light-border dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-3.5 py-2.5 outline-none transition-colors"
            >
              <option value="Residential Interior">Residential Interior</option>
              <option value="Corporate & Office Interior">Corporate & Office Interior</option>
              <option value="Commercial & Retail Design">Commercial & Retail Design</option>
              <option value="Hospitality & Restaurant">Hospitality & Restaurant</option>
              <option value="Architectural Residential Planning">Architectural Residential Planning</option>
              <option value="3D Architectural Rendering">3D Architectural Rendering</option>
              <option value="Full Scale Turnkey Construction">Full Scale Turnkey Construction</option>
              <option value="Refurbishment & Renovation">Refurbishment & Renovation</option>
              <option value="Customized Luxury Furniture">Customized Luxury Furniture</option>
              <option value="General Consultation">General Consultation</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1 uppercase tracking-wider">Project Details / Plot Size</label>
            <textarea
              v-model="form.message"
              rows="3"
              placeholder="Tell us about your plot size (e.g. 1 Kanal DHA Phase 6), timeline, or design preferences..."
              class="w-full bg-brand-light-card dark:bg-[#1c1c1c] border border-brand-light-border dark:border-brand-border focus:border-brand-gold text-gray-900 dark:text-white px-3.5 py-2.5 outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-brand-gold hover:bg-brand-gold-light text-black font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <span v-if="loading">Submitting...</span>
              <span v-else>SUBMIT CONSULTATION REQUEST</span>
              <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>

          <!-- Direct Phone Call Note -->
          <div class="text-center pt-2">
            <span class="text-gray-600 dark:text-gray-400 text-[11px]">Or call directly for urgent projects: </span>
            <a href="tel:+923001999967" class="text-amber-700 dark:text-brand-gold font-bold hover:underline">+92 300 1999967</a>
          </div>

        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useModal } from '../../composables/useModal';
import { useToast } from '../../composables/useToast';
import { submitLead } from '../../api';

const { isLetsTalkOpen, selectedService, closeLetsTalk } = useModal();
const { showToast } = useToast();

const loading = ref(false);
const form = ref({
  name: '',
  email: '',
  phone: '',
  service: 'General Consultation',
  message: '',
  source: 'lets_talk_modal'
});

watch(selectedService, (newVal) => {
  if (newVal) form.value.service = newVal;
});

async function handleSubmit() {
  loading.value = true;
  try {
    await submitLead(form.value);
    showToast('Inquiry submitted successfully! Our team will contact you shortly.', 'success');
    form.value = {
      name: '',
      email: '',
      phone: '',
      service: 'General Consultation',
      message: '',
      source: 'lets_talk_modal'
    };
    closeLetsTalk();
  } catch (err) {
    showToast(err.message || 'Error submitting form. Please call us directly.', 'error');
  } finally {
    loading.value = false;
  }
}
</script>
