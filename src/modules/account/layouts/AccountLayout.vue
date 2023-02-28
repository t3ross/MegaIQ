<template>
  <q-layout view="hHh lpR fFf">
    <div class="auth-layout">
      <div class="auth-blur flex flex-center">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'accountLayout',
  components: {
    // Entry: defineAsyncComponent(() => import('./Entry.vue')),
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
