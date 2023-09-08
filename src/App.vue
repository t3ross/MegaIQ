<template>
  <router-view />
</template>

<script lang="ts">
import useAuth from './composables/useAuth';

export default {
  name: 'App',
  setup() {
    const { authStatus, checkAuthStatus } = useAuth();

    checkAuthStatus();
    return {
      authStatus,
    };
  },
};
</script>
