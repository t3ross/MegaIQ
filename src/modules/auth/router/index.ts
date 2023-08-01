export default {
  name: 'auth',
  component: () =>
    import(
      /* webpackChunkName: "authlayout" */ 'src/modules/auth/layouts/AuthLayout.vue'
    ),
  children: [
    {
      path: '/auth/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login" */ 'src/modules/auth/views/login/AuthLogin.vue'
        ),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () =>
        import(
          /* webpackChunkName: "register" */ 'src/modules/auth/views/register/AuthRegister.vue'
        ),
    },
  ],
};
