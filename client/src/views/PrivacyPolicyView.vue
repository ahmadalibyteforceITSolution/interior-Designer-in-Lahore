<template>
  <div class="bg-[#faf9f6] dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <HeroBanner
      :hero-data="pageData?.hero"
      category-name="LEGAL & PRIVACY"
      service-name="Privacy Policy"
    />

    <section class="py-20 bg-white dark:bg-brand-surface border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            1. Overview & General Policy Statement
          </h2>
          <p>
            At <strong>Spaces & Places</strong>, accessible from our online domains, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of personal and technical information that is collected and recorded by Spaces & Places and how we utilize, safeguard, and disclose it in full compliance with international standards and Google AdSense publisher policies.
          </p>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            2. Google DoubleClick DART Cookies & AdSense Compliance
          </h2>
          <p>
            Google is a third-party advertising vendor on our website. It uses cookies, commonly known as <strong>DART cookies</strong>, to serve targeted advertisements to our site visitors based on their visit to our website and other websites across the global internet.
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1.5 text-gray-600 dark:text-gray-400">
            <li>Visitors may opt out of the use of the DART cookie by visiting the official Google Ad and Content Network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" class="text-amber-700 dark:text-brand-gold underline">https://policies.google.com/technologies/ads</a>.</li>
            <li>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Spaces & Places. They automatically receive your IP address when this occurs.</li>
            <li>These technologies are used to measure the effectiveness of advertising campaigns and to personalize the advertising content that you see.</li>
            <li>Please note that Spaces & Places has no access to or control over these cookies that are used by third-party advertisers.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            3. Log Files & Analytics
          </h2>
          <p>
            Spaces & Places follows standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            4. GDPR Data Protection Rights (European & International Users)
          </h2>
          <p>
            We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data held by us.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            5. CCPA Privacy Rights (Do Not Sell My Personal Information)
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers, request the deletion of consumer's personal data, and request that a business not sell the consumer's personal data. Spaces & Places does not sell personal inquiry data to any third party brokers.
          </p>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-black text-gray-900 dark:text-white uppercase mb-3">
            6. Inquiries & Data Controller Contact
          </h2>
          <p>
            If you have any questions, wish to exercise any of your data rights, or request deletion of an inquiry, please contact our administrative desk at:
          </p>
          <div class="mt-3 p-4 bg-[#faf9f6] dark:bg-black border border-gray-200 dark:border-brand-border space-y-1 text-xs">
            <div><strong class="text-amber-700 dark:text-brand-gold">Entity:</strong> Spaces & Places Studio</div>
            <div><strong class="text-amber-700 dark:text-brand-gold">Email:</strong> contact@spacezandplaces.com</div>
            <div><strong class="text-amber-700 dark:text-brand-gold">Phone:</strong> +92 300 1999967</div>
            <div><strong class="text-amber-700 dark:text-brand-gold">Location:</strong> 5CCA, 5th Floor, Block C, DHA Phase 6, Lahore, Pakistan</div>
          </div>
        </div>

      </div>
    </section>

    <CtaBanner :cta-data="pageData?.cta" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPage } from '../api';
import { useSeo } from '../composables/useSeo';
import HeroBanner from '../components/common/HeroBanner.vue';
import CtaBanner from '../components/common/CtaBanner.vue';

const { setMeta } = useSeo();
const pageData = ref(null);

onMounted(async () => {
  try {
    const data = await getPage('privacy-policy');
    pageData.value = data;
    setMeta(data);
  } catch (err) {
    console.error('Error fetching privacy page:', err);
  }
});
</script>
