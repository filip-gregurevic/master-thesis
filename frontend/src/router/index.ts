// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        children: [
          {
            path: '',
            name: 'UserList',
            component: () => import('@/views/user/List.vue'),
          },
          {
            path: '/new',
            name: 'UserNew',
            component: () => import('@/views/user/New.vue'),
          },
          {
            path: '/:userId/edit',
            name: 'UserNew',
            component: () => import('@/views/user/Edit.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/auth',
    component: () => import('@/layouts/no-auth/NoAuth.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    return '/login';
  }
});

export default router;
