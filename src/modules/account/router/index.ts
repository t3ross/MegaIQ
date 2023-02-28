export default {
  name: 'account',
  component: () =>
    import(
      /* webpackChunkName: "Auth layout" */ 'src/modules/account/layouts/AccountLayout.vue'
    ),
  children: [
    {
      path: '/account/profile',
      name: 'profile',
      component: () =>
        import(
          /* webpackChunkName: "Profile" */ 'src/modules/account/views/account/AccountView.vue'
        ),
    },
  ],
};
