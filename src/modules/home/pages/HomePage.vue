<template>
  <q-page>
    <q-header class="flex justify-center items-end header">
      <div class="text-h2 main-font">MegaIQ</div>
      <!-- <q-tabs align="left">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs> -->
      <q-toolbar class="bg-blur" elevated>
        <q-toolbar-title> Toolbar </q-toolbar-title>
        <q-btn dense flat round icon="las la-cog" />
        <q-btn dense flat round icon="las la-user-circle" />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-item-label header> Essential Links </q-item-label>
      </q-drawer> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.header {
  height: 70vh;
  background-image: linear-gradient(
      180deg,
      rgba(31, 50, 219, 0.747) 10%,
      rgba(0, 212, 255, 0) 100%
    ),
    url('https://4.bp.blogspot.com/-u7xOINjjawk/XHKV0l9lc8I/AAAAAAAAC0Y/RR3HQuyUIjsPqkPhwPTnGfA1f582YPvlgCKgBGAs/w0/blue-red-smoke-abstract-4k-53.jpg');
  background-size: cover;
}
.bg-blur {
  background-color: rgba(0, 0, 255, 0.295);
  backdrop-filter: blur(15px);
  box-shadow: 0 -5px 10px rgba(0, 0, 255, 0.301);
}
</style>
