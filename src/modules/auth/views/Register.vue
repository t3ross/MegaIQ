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
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
        (val) =>
          val.length >= 3 ||
          'Por favor escribe un nombre con mínimo 3 carácteres.',
      ]" />
    <q-input
      class="auth-input"
      filled
      type="email"
      v-model="state.email"
      label="Tu correo electrónico"
      :rules="[
        (val) =>
          (val !== null && val !== '') ||
          'Por favor escribe tu correo electrónico',
        (val, rules) =>
          rules.email(val) || 'Por favor escribe un correo electrónico válido',
      ]" />
    <q-input
      class="auth-input"
      filled
      :type="isPwd1 ? 'password' : 'text'"
      v-model="state.password.password"
      label="Escribe una  contraseña"
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        (val) =>
          val.length >= 8 ||
          'Por favor escribe una contraseña con mínimo 8 carácteres.',
        (val) =>
          val.match(letterNumber) ||
          'Por favor escribe por lo menos un número y una letra',
      ]">
      <template v-slot:append v-if="state.password.password">
        <q-icon
          :name="isPwd1 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @mousedown="isPwd1 = !isPwd1"
          @mouseup="isPwd1 = !isPwd1" />
      </template>
    </q-input>

    <q-input
      class="auth-input"
      filled
      :type="isPwd2 ? 'password' : 'text'"
      v-model="state.password.confirm"
      label="Repite la contraseña"
      :rules="[
        (val) =>
          (val && val.length !== 0) ||
          'Por favor escribe la contraseña nuevamente',
        (val) =>
          val.match(state.password.password) ||
          'Las contraseñas no coinciden. Por favor escribe la contraseña nuevamente',
      ]"
      ><template v-slot:append v-if="state.password.confirm">
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @mousedown="isPwd2 = !isPwd2"
          @mouseup="isPwd2 = !isPwd2" /> </template
    ></q-input>

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
import { ref } from 'vue';

export default {
  name: 'auth-register',
  setup() {
    const $q = useQuasar();

    const state = ref({
      username: '',
      email: '',
      password: {
        password: '',
        confirm: '',
      },
      accept: false,
    });

    return {
      isPwd1: ref(true),
      isPwd2: ref(true),
      state,
      letterNumber: ref('(?=[A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]'),
      // letterNumber: ref('/^[0-9a-zA-Z]+$/'),

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
