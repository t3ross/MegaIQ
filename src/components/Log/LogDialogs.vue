<template>
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
import LogIn from 'src/components/LogIn.vue';
import Register from 'src/components/Register.vue';
export default defineComponent({
  name: 'PageIndex',
  components: {
    LogIn,
    Register,
  },
  setup() {
    return {
      logIn: ref(false),
      register: ref(false),
    };
  },
});
</script>
