export default {
  name: 'account',
  component: () =>
    import(
      /* webpackChunkName: "Auth_layout" */ 'src/modules/account/layouts/AccountLayout.vue'
    ),
  children: [
    {
      path: '/account/profile',
      name: 'profile',
      component: () =>
        import(
          /* webpackChunkName: "Profile" */ 'src/modules/account/views/profile/ProfileView.vue'
        ),
    },
    {
      path: '/account/privacy',
      name: 'privacy',
      component: () =>
        import(
          /* webpackChunkName: "Privacy" */ 'src/modules/account/views/privacy/PrivacyView.vue'
        ),
    },
    {
      path: '/account/help',
      name: 'help',
      component: () =>
        import(
          /* webpackChunkName: "Help" */ 'src/modules/account/views/help/HelpView.vue'
        ),
    },
    {
      path: '/account/password',
      name: 'password',
      component: () =>
        import(
          /* webpackChunkName: "Password" */ 'src/modules/account/views/password/PasswordView.vue'
        ),
    },
  ],
};
