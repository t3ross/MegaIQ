<template>
  <div class="auth-title header-font flex flex-center">
    Mega<span class="iq-background"><span class="iq">IQ</span></span>
  </div>
  <q-form @submit="onSubmit" @reset="onReset" class="auth auth-regsiter">
    <q-input
      class="auth-input"
      filled
      v-model="state.name"
      label="Tu nombre de usuario"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
      ]" />
    <q-input
      class="auth-input"
      filled
      type="email"
      v-model="state.email"
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
      v-model="state.password"
      label="Escribe una  contraseña"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        (val) =>
          val.length >= 8 ||
          'Por favor escribe una contraseña con mínimo 8 carácteres.',
        (val) =>
          val.includes('') ||
          'Por favor escribe por lo menos un número y una letra',
      ]">
      <template v-slot:append v-if="password">
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-input
      class="auth-input"
      filled
      type="password"
      v-model="passwordCheck"
      label="Repite la contraseña"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
      ]" />

    <q-toggle
      v-model="state.accept"
      label="Acepto los términos y condiciones" />

    <router-link :to="{ name: 'login' }"
      >¿Ya tienes cuenta?
      <span class="text-primary">Inicia sesión</span></router-link
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
import { useVuelidate } from '@vuelidate/core';
import { required, email, alphaNum } from '@vuelidate/validators';
import { ref } from 'vue';

export default {
  name: 'auth-register',
  setup() {
    const $q = useQuasar();

    const state = ref({
      username: '',
      email: '',
      password: '',
      accept: false,
    });

    const rules = {
      username: { required },
      email: { required, email },
      password: { required, alphaNum },
    };

    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$,

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
