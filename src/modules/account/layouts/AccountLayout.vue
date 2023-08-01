<template>
  <q-layout view="hHh LpR fFf">
    <div class="auth-layout">
      <div class="auth-blur flex flex-center">
        <q-layout-drawer
          side="left"
          v-model="drawerLeft"
          bordered
          :width="200"
          :breakpoint="500"
          content-class="bg-grey-3">
          <h1>d</h1>
        </q-layout-drawer>
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
