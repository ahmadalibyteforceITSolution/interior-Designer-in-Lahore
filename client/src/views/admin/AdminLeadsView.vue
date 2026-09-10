<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
      <div>
        <h1 class="text-2xl font-heading font-black text-white uppercase tracking-tight">
          Client Consultations & Leads
        </h1>
        <p class="text-xs text-gray-400 mt-1">
          Review inquiries submitted through the website contact form and "Let's Talk" modal.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-brand-gold font-bold uppercase">{{ leads.length }} Total Inquiries</span>
      </div>
    </div>

    <div class="bg-brand-surface border border-brand-border overflow-hidden">
      <div v-if="loading" class="text-center py-16 text-brand-gold font-mono text-xs">
        Loading Inquiries...
      </div>

      <div v-else-if="leads.length === 0" class="text-center py-16 text-gray-400 text-xs">
        No leads received yet.
      </div>

      <table v-else class="w-full text-left text-xs">
        <thead class="bg-[#161616] text-gray-400 uppercase tracking-wider border-b border-brand-border">
          <tr>
            <th class="py-3 px-4">Client Name</th>
            <th class="py-3 px-4">Contact Info</th>
            <th class="py-3 px-4">Service Interest</th>
            <th class="py-3 px-4">Message / Scope</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Date</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border/60">
          <tr v-for="lead in leads" :key="lead._id" class="hover:bg-[#141414] transition-colors">
            <td class="py-3 px-4 font-bold text-white">
              {{ lead.name }}
            </td>
            <td class="py-3 px-4 space-y-0.5">
              <a :href="'tel:' + lead.phone" class="text-brand-gold hover:underline block font-mono">
                {{ lead.phone || 'No phone' }}
              </a>
              <a :href="'mailto:' + lead.email" class="text-gray-400 hover:underline block">
                {{ lead.email }}
              </a>
            </td>
            <td class="py-3 px-4">
              <span class="px-2 py-0.5 bg-black border border-brand-border text-brand-gold text-[10px] rounded uppercase">
                {{ lead.service }}
              </span>
            </td>
            <td class="py-3 px-4 text-gray-300 max-w-xs truncate" :title="lead.message">
              {{ lead.message || 'No details provided' }}
            </td>
            <td class="py-3 px-4">
              <select
                :value="lead.status"
                @change="updateStatus(lead._id, $event.target.value)"
                class="bg-black border border-brand-border text-white text-[10px] py-1 px-2 outline-none uppercase"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </td>
            <td class="py-3 px-4 text-gray-400 text-[11px]">
              {{ new Date(lead.createdAt).toLocaleDateString() }}
            </td>
            <td class="py-3 px-4 text-right">
              <button
                @click="removeLead(lead._id)"
                class="px-2.5 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white text-[10px] font-bold uppercase rounded transition-colors"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLeads, updateLead, deleteLead } from '../../api';
import { useToast } from '../../composables/useToast';

const { showToast } = useToast();

const leads = ref([]);
const loading = ref(true);

async function loadLeads() {
  loading.value = true;
  try {
    const data = await getLeads();
    leads.value = data;
  } catch (err) {
    showToast('Error loading leads: ' + err.message, 'error');
  } finally {
    loading.value = false;
  }
}

async function updateStatus(id, newStatus) {
  try {
    await updateLead(id, { status: newStatus });
    showToast('Status updated', 'success');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function removeLead(id) {
  if (confirm('Delete this inquiry record?')) {
    try {
      await deleteLead(id);
      showToast('Lead deleted', 'info');
      loadLeads();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  }
}

onMounted(loadLeads);
</script>
