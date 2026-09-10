import { ref } from 'vue';

const toastMessage = ref('');
const toastType = ref('success'); // 'success' | 'error' | 'info'
const isVisible = ref(false);
let timer = null;

export function useToast() {
  function showToast(message, type = 'success', duration = 3500) {
    if (timer) clearTimeout(timer);
    toastMessage.value = message;
    toastType.value = type;
    isVisible.value = true;

    timer = setTimeout(() => {
      isVisible.value = false;
    }, duration);
  }

  function hideToast() {
    isVisible.value = false;
    if (timer) clearTimeout(timer);
  }

  return {
    toastMessage,
    toastType,
    isVisible,
    showToast,
    hideToast
  };
}
