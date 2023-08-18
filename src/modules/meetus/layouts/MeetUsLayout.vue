<script lang="ts" src="./MeetUsLayout.ts" />

<template>
  <q-layout view="hHh lpR fFf">
    <div>
      <div>
        <q-page-container>
          <!-- Header -->
          <q-header class="header-container">
            <q-toolbar class="header row justify-between">
              <!-- MegaIQ logo -->
              <q-toolbar-title shrink class="col-1-md-1">
                <div ref="toolbarTitle" class="toolbar-title header-font">
                  <q-img
                    @click="goToHome"
                    src="~assets/MegaIQ.svg"
                    width="150px"
                    height="50px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                    alt="MegaIQ logo" />
                </div>
              </q-toolbar-title>
              <!-- Search bar -->
              <div
                class="searchBar toolbar-searchBar col-6"
                ref="toolbarSearchBar">
                <q-input
                  class="q-px-lg prevent prueba"
                  borderless
                  v-model="searchBar"
                  color="primary"
                  type="text"
                  placeholder="Busca algún tema del que quieras investigar...">
                  <template v-slot:prepend>
                    <q-icon
                      name="fa-solid fa-magnifying-glass"
                      color="primary" /> </template
                ></q-input>
              </div>
              <div class="column justify-end col-1-md-1">
                <div v-if="userLogged">
                  <q-btn dense flat round icon="las la-cog" />
                  <q-btn dense flat round icon="las la-user-circle" />
                </div>
                <!-- Buttons -->
                <div
                  v-else
                  class="row q-gutter-x-sm text-font-medium row flex-center no-wrap q-pr-md">
                  <q-btn
                    class="header-btn account-btn toolbar-login text-uppercase"
                    ref="toolbarButtonLogin"
                    @click="goToLogin"
                    label="Inicia sesión!"
                    unelevated />
                  <q-btn
                    class="header-btn account-btn toolbar-register justify-center"
                    ref="toolbarButtonRegister"
                    @click="goToRegister"
                    color="primary"
                    label="Registrate!" />
                </div>
              </div>
            </q-toolbar>
          </q-header>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<style lang="scss">
@import '../css/meetus.scss';
</style>
