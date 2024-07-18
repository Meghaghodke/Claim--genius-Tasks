import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import login from   '../components/login.vue';
import register from '../components/register.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Example: Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
