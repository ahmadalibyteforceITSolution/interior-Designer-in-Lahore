import { ref, onMounted } from 'vue';

const isDark = ref(true);

export function useTheme() {
  function initTheme() {
    const saved = localStorage.getItem('spaces_theme');
    if (saved) {
      isDark.value = saved === 'dark';
    } else {
      isDark.value = true; // Default luxury dark
    }
    applyTheme();
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem('spaces_theme', isDark.value ? 'dark' : 'light');
    applyTheme();
  }

  function applyTheme() {
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }

  return {
    isDark,
    initTheme,
    toggleTheme
  };
}
