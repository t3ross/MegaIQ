<template>
  <q-layout view="hHh lpR fFf">
    <div>
      <q-page-container>
        <HeaderIQ />
        <!-- Header -->
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HeaderIQ from 'src/components/Header.vue';
export default defineComponent({
  name: 'ResultsLayout',
  components: {
    HeaderIQ,
  },
  setup() {
    return {
      logIn: ref(false),
      register: ref(false),
    };
  },
});
</script>

<style lang="scss">
@import '../css/results.scss';
</style>
