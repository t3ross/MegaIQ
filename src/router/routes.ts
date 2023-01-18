// import { RouteRecordRaw } from 'vue-router';
import authRouter from 'src/modules/auth/router';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '',
        name: 'home',
        component: () => import('src/modules/home/pages/HomePage/HomePage.vue'),
      },
      {
        path: '/auth',
        ...authRouter,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('pages/ErrorNotFound.vue'),
  // },
];

export default routes;
