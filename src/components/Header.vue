<template>
  <div>
    <!-- Header -->
    <q-header class="header-container">
      <q-toolbar class="header row justify-between">
        <!-- MegaIQ logo -->
        <q-toolbar-title shrink class="col-1-md-1">
          <div ref="toolbarTitle" class="toolbar-title header-font c-pointer">
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
        <div class="searchBar toolbar-searchBar col-6" ref="toolbarSearchBar">
          <q-input
            class="q-px-lg prevent prueba"
            borderless
            color="primary"
            type="text"
            placeholder="Busca algún tema del que quieras investigar...">
            <template v-slot:prepend>
              <q-icon
                name="fa-solid fa-magnifying-glass"
                color="primary" /> </template
          ></q-input>
        </div>
        <!-- Account -->
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
              class="header-btn account-btn toolbar-login"
              @click="logIn = true"
              label="Inicia sesión!"
              unelevated />
            <q-btn
              class="header-btn account-btn toolbar-register"
              @click="register = true"
              color="primary"
              label="Registrate!" />
          </div>
        </div>
      </q-toolbar>
    </q-header>
  </div>

  <!-- Dialogs Login, Register -->
  <div>
    <q-dialog v-model="logIn" persistent>
      <div class="no-shadow">
        <LogIn />
        <!-- Switch -->
        <div
          class="text-white q-pa-md flex justify-center items-center q-gutter-md">
          <div class="text-h5">No tienes cuenta?</div>
          <q-btn
            v-close-popup
            no-caps
            class="header-btn"
            id="switch-btn"
            @click="register = true"
            label="Registrate!"
            color="primary" />
        </div>
      </div>
    </q-dialog>
    <q-dialog v-model="register" persistent>
      <div class="no-shadow">
        <Register />
        <div
          class="text-white q-pa-md flex justify-center items-center q-gutter-md">
          <div class="text-h5">Ya tienes cuenta?</div>
          <q-btn
            v-close-popup
            no-caps
            class="header-btn"
            id="switch-btn"
            @click="logIn = true"
            label="Inicia sesión!"
            color="primary" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import LogIn from 'src/components/Log/LogIn.vue';
import Register from 'src/components/Log/Register.vue';

export default defineComponent({
  name: 'HeaderIQ',
  components: {
    LogIn,
    Register,
  },
  setup() {
    const router = useRouter();
    return {
      goToHome: () => {
        router.push({ name: 'home' });
      },
      logIn: ref(false),
      register: ref(false),
      userLogged: ref(false),
    };
  },
});
</script>
