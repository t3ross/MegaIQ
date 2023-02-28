export default {
  name: 'auth',
  component: () =>
    import(
      /* webpackChunkName: "Auth layout" */ 'src/modules/auth/layouts/AuthLayout.vue'
    ),
  children: [
    {
      path: '/auth/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "Login" */ 'src/modules/auth/views/login/AuthLogin.vue'
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
