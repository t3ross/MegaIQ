// import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '',
        name: 'home',
        component: () => import('../modules/home/pages/HomePage.vue'),
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
