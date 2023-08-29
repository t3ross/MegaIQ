export default {
  name: 'results',
  component: () =>
    import(
      /* webpackChunkName: "resultsLayout" */ 'src/modules/results/layouts/ResultsLayout.vue'
    ),
  children: [
    {
      path: '/results/services',
      name: 'services',
      component: () =>
        import(
          /* webpackChunkName: "Services" */ 'src/modules/results/views/services/ServicesSearch.vue'
        ),
    },
  ],
};
