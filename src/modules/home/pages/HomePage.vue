<template>
  <q-header class="bg-blur">
    <q-toolbar class="bg-blur">
      <q-toolbar-title> MegaIQ </q-toolbar-title>
      <q-btn dense flat round icon="las la-cog" />
      <q-btn dense flat round icon="las la-user-circle" />
    </q-toolbar>
  </q-header>

  <div class="text-h2 main-font header-banner flex flex-center text-white">
    MegaIQ
  </div>

  <div class="layout-container flex justify-center q-pa-lg">
    <q-layout view="hHh lpr fFf" class="content-layout flex align-center">
      <q-drawer
        side="left"
        :width="250"
        :breakpoint="500"
        content-class="bg-grey-3"
        class="bg-indigo-4"
        show-if-above
      >
        <p>Friends</p>
      </q-drawer>

      <q-page-container
        ><p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
          inventore nemo fugit dolorum asperiores neque odit facere laboriosam,
          aliquid tenetur sint quisquam, temporibus nobis! Ex cumque quae maxime
          dignissimos nam!
        </p></q-page-container
      >

      <q-drawer
        side="right"
        :width="250"
        :breakpoint="500"
        content-class="bg-grey-3"
        class="bg-indigo-4"
        show-if-above
      >
        <p>Filter results</p>
      </q-drawer>
    </q-layout>
  </div>
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
.bg-blur {
  background-color: rgba(29, 31, 158, 0.267);
  backdrop-filter: blur(15px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.164);
}
.header-banner {
  margin-top: -50px;
  height: 70vh;
  background-image: linear-gradient(
      180deg,
      rgba(31, 50, 219, 0.747) 10%,
      rgba(0, 212, 255, 0) 100%
    ),
    url('https://4.bp.blogspot.com/-u7xOINjjawk/XHKV0l9lc8I/AAAAAAAAC0Y/RR3HQuyUIjsPqkPhwPTnGfA1f582YPvlgCKgBGAs/w0/blue-red-smoke-abstract-4k-53.jpg');
  background-size: cover;
}
.content-layout {
  max-width: 1600px;
  padding: 20px;
}
</style>
