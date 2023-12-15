import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/sign-up', name: 'sign-up', component: () => import('./pages/SignUp.vue'), meta: { requiresGuest: true } },
  { path: '/sign-in', name: 'sign-in', component: () => import('./pages/SignIn.vue'), meta: { requiresGuest: true } },
  { path: '/reset-password', name: 'reset-password', component: () => import('./pages/ResetPassword.vue'), meta: { requiresGuest: true } },
  { path: '/remove-transaction', name: 'remove-transaction', component: () => import('./pages/RemoveTransaction.vue'), meta: { requiresAuth: true } },
  {
    path: '/:pathMatch(.*)*',
    name: 'routeChecker',
    component: () => import('./pages/NotFound.vue'),
  }
  ],
});
