import { createRouter, createWebHistory } from 'vue-router';

// Public Views
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ServiceDetailView from '../views/ServiceDetailView.vue';
import ClientsView from '../views/ClientsView.vue';
import ContactView from '../views/ContactView.vue';
import BlogsView from '../views/BlogsView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue';
import TermsView from '../views/TermsView.vue';
import DisclaimerView from '../views/DisclaimerView.vue';

// Admin Views
import AdminLoginView from '../views/admin/AdminLoginView.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import AdminPagesView from '../views/admin/AdminPagesView.vue';
import AdminPageEditView from '../views/admin/AdminPageEditView.vue';
import AdminSeoView from '../views/admin/AdminSeoView.vue';
import AdminBlogsView from '../views/admin/AdminBlogsView.vue';
import AdminMediaView from '../views/admin/AdminMediaView.vue';
import AdminLeadsView from '../views/admin/AdminLeadsView.vue';
import AdminSettingsView from '../views/admin/AdminSettingsView.vue';

const routes = [
  // 1. Core Public Pages
  { path: '/', name: 'home', component: HomeView },
  { path: '/about-us', name: 'about-us', component: AboutView },
  { path: '/our-clients', name: 'our-clients', component: ClientsView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/blogs', name: 'blogs', component: BlogsView },
  { path: '/blog/:slug', name: 'blog-post', component: BlogPostView },

  // 2. Legal Pages (AdSense Mandatory)
  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
  { path: '/terms-conditions', name: 'terms-conditions', component: TermsView },
  { path: '/disclaimer', name: 'disclaimer', component: DisclaimerView },

  // 3. Explicit Header Dropdown Routes (Interior Design)
  { path: '/residential-interior', component: ServiceDetailView },
  { path: '/corporate-interior', component: ServiceDetailView },
  { path: '/commercial-interior', component: ServiceDetailView },
  { path: '/hospitality-interior', component: ServiceDetailView },
  { path: '/restaurant-design', component: ServiceDetailView },
  { path: '/industrial-design', component: ServiceDetailView },
  { path: '/corporate-design', component: ServiceDetailView },
  { path: '/interior-furnishings', component: ServiceDetailView },

  // 4. Explicit Header Dropdown Routes (Architectural Designs)
  { path: '/architectural-residential-planning', component: ServiceDetailView },
  { path: '/3d-architectural-design-lahore', component: ServiceDetailView },
  { path: '/space-planning-services-lahore', component: ServiceDetailView },
  { path: '/architectural-animation-services-lahore', component: ServiceDetailView },
  { path: '/landscape-design', component: ServiceDetailView },
  { path: '/facade-elevation-design', component: ServiceDetailView },
  { path: '/midrise-highrise-planning', component: ServiceDetailView },

  // 5. Explicit Header Dropdown Routes (Construction Services)
  { path: '/refurbishment-services-in-lahore', component: ServiceDetailView },
  { path: '/project-management-in-lahore', component: ServiceDetailView },
  { path: '/contract-administration-services-lahore', component: ServiceDetailView },
  { path: '/full-scale-construction-company-in-lahore', component: ServiceDetailView },

  // 6. Explicit Header Dropdown Routes (Furniture)
  { path: '/residential-furniture', component: ServiceDetailView },
  { path: '/customized-furniture', component: ServiceDetailView },
  { path: '/commercial-furniture', component: ServiceDetailView },
  { path: '/decor', component: ServiceDetailView },

  // 7. Admin Portal Routes (cPanel CMS)
  { path: '/admin/login', name: 'admin-login', component: AdminLoginView },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: AdminDashboardView },
      { path: 'pages', name: 'admin-pages', component: AdminPagesView },
      { path: 'pages/:slug', name: 'admin-page-edit', component: AdminPageEditView },
      { path: 'seo', name: 'admin-seo', component: AdminSeoView },
      { path: 'blogs', name: 'admin-blogs', component: AdminBlogsView },
      { path: 'media', name: 'admin-media', component: AdminMediaView },
      { path: 'leads', name: 'admin-leads', component: AdminLeadsView },
      { path: 'settings', name: 'admin-settings', component: AdminSettingsView },
    ]
  },

  // 8. Dynamic fallback for any custom created page slug
  { path: '/:slug', name: 'dynamic-page', component: ServiceDetailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Auth Guard for Admin routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('spaces_admin_token');
    if (!token) {
      return next({ path: '/admin/login' });
    }
  }
  next();
});

export default router;
