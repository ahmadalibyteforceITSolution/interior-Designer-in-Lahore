import { ref } from 'vue';

const isLetsTalkOpen = ref(false);
const selectedService = ref('General Consultation');

export function useModal() {
  function openLetsTalk(service = 'General Consultation') {
    selectedService.value = service;
    isLetsTalkOpen.value = true;
  }

  function closeLetsTalk() {
    isLetsTalkOpen.value = false;
  }

  return {
    isLetsTalkOpen,
    selectedService,
    openLetsTalk,
    closeLetsTalk
  };
}
