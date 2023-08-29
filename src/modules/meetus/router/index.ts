export default {
  name: 'meetuss',
  component: () =>
    import(
      /* webpackChunkName: "Meetus" */ 'src/modules/meetus/layouts/MeetUsLayout.vue'
    ),
  children: [
    {
      path: '/meetus',
      name: 'meetus',
      component: () =>
        import(
          /* webpackChunkName: "Meet Us" */ 'src/modules/meetus/views/MeetUs.vue'
        ),
    },
  ],
};
