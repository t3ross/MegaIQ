<template>
  <q-layout view="hHh lpR fFf">
    <div class="auth-layout">
      <div class="auth-blur full-width flex flex-center">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.auth-layout {
  background: url('assets/red-blue-bg.png') no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.auth-blur {
  backdrop-filter: blur(20px);
  background-color: rgba($primary, 0.3);
  min-height: 100vh;
}
</style>
