<template>
  <div class="auth-title header-font flex flex-center">
    Mega<span class="iq-background"><span class="iq">IQ</span></span>
  </div>
  <q-form @submit="onSubmit" @reset="onReset" class="auth auth-login">
    <q-input
      class="auth-input"
      filled
      type="email"
      v-model="email"
      label="Tu correo electrónico"
      lazy-rules
      :rules="[
        (val) =>
          (val !== null && val !== '') ||
          'Por favor escribe tu correo electrónico',
        (val) =>
          (val > 0 && val < 1) ||
          'Por favor escribe un correo electrónico válido',
      ]" />

    <q-input
      class="auth-input"
      filled
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      label="Tu contraseña"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        (val) =>
          val.length >= 8 ||
          'Por favor escribe una contraseña con mínimo 8 carácteres.',
        (val) =>
          val.includes('') ||
          'Por favor escribe una contraseña con mínimo 8 carácteres.',
      ]">
      <template v-slot:append v-if="password">
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <router-link :to="{ name: 'register' }"
      >¿No tienes cuenta?
      <span class="text-primary">Regístrate</span></router-link
    >

    <div>
      <q-btn label="Acceder" type="submit" color="primary" />
      <q-btn
        label="Vaciar campos"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'auth-login',
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const email = ref(null);
    const accept = ref(false);

    return {
      isPwd: ref(true),
      name,
      email,
      accept,
      password: ref(),

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        name.value = null;
        email.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style scoped></style>
