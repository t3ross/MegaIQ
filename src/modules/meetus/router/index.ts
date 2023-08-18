export default {
  name: 'meetus',
  component: () =>
    import(
      /* webpackChunkName: "home" */ 'src/modules/meetus/layouts/MeetUsLayout.vue'
    ),
  children: [
    {
      path: '/meetus',
      name: 'meetus',
      component: () =>
        import(
          /* webpackChunkName: "Meet Us" */ 'src/modules/meetus/pages/MeetUs/MeetUs.vue'
        ),
    },
  ],
};
