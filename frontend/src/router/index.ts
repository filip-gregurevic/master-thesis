// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// TODO: Add auth and role guard

export default router;
