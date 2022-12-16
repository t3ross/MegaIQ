<template>
  <q-layout view="hHh lpr bbb">
    <!-- <q-header reveal elevated bordered>
      <q-toolbar class="bg-purple text-white">
        <q-toolbar-title> Toolbar </q-toolbar-title>
        <q-btn dense flat round icon="las la-cog" />
        <q-btn dense flat round icon="las la-user-circle" />
      </q-toolbar>
    </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
