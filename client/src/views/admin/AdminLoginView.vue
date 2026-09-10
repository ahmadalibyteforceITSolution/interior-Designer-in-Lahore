<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-brand-surface border border-brand-border p-8 relative shadow-2xl">
      <!-- Gold Bar -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-brand-gold"></div>

      <div class="text-center mb-8 space-y-2">
        <h1 class="text-2xl font-heading font-black text-white tracking-wider">
          SPACES & PLACES
        </h1>
        <p class="text-xs text-brand-gold uppercase font-bold tracking-widest">
          cPanel Admin Authentication
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5 text-xs">
        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-4 py-3 outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-gray-300 font-medium mb-1 uppercase tracking-wider">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-black border border-brand-border focus:border-brand-gold text-white px-4 py-3 outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-light text-black font-heading font-bold text-xs uppercase tracking-widest transition-colors shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span v-if="loading">AUTHENTICATING...</span>
          <span v-else>SIGN IN TO CPANEL</span>
        </button>

        <div class="pt-4 border-t border-brand-border/60 text-center text-gray-500 text-[11px]">
          Default Credentials: <code class="text-brand-gold">admin</code> / <code class="text-brand-gold">admin@spacesplaces123</code>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../api';
import { useToast } from '../../composables/useToast';

const router = useRouter();
const { showToast } = useToast();

const username = ref('admin');
const password = ref('admin@spacesplaces123');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  try {
    const res = await login({ username: username.value, password: password.value });
    localStorage.setItem('spaces_admin_token', res.token);
    showToast('Welcome to Spaces & Places cPanel!', 'success');
    router.push('/admin');
  } catch (err) {
    showToast(err.message || 'Invalid username or password', 'error');
  } finally {
    loading.value = false;
  }
}
</script>
