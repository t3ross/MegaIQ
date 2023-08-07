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

<style lang="scss">
@import '../css/auth.scss';
</style>
