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
      :error-message="validations('email')"
      :error="v$.email.$invalid" />
    <!-- <q-input
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
        (val) => val > 0 || 'Por favor escribe un correo electrónico válido',
      ]" /> -->

    <q-input
      class="auth-input"
      filled
      :type="isPwd1 ? 'password' : 'text'"
      v-model="state.password.password"
      label="Escribe una  contraseña"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        (val) =>
          val.length >= 8 ||
          'Por favor escribe una contraseña con mínimo 8 carácteres.',
        //   val.value.match(letterNumber) ||
        //   'Por favor escribe por lo menos un número y una letra',
        (val) =>
          v$.password.minLength ||
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
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
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
import { useVuelidate } from '@vuelidate/core';
import {
  alphaNum,
  email,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators';
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

    const rules = {
      username: { required, minLength: minLength(3) },
      email: { required, email },
      password: {
        password: { required, minLength: minLength(8), alphaNum },
        confirm: { required, sameAs: sameAs(state.value.password.password) },
      },
    };

    const v$ = useVuelidate(rules, state);

    console.log(v$.value.email.$invalid);

    const validations = (field) => {
      if (field === 'username') {
        if (v$.value.email.required) return 'Por favor escribe un nombre';
        if (v$.value.email.minLength)
          return 'Por favor escribe un nombre con mínimo 3 carácteres.';
      }
      if (field === 'email') {
        if (v$.value.email.required)
          return 'Por favor escribe un correo electrónico';
        if (v$.value.email.email)
          return 'Por favor escribe un correo electrónico válido';
      }
    };

    return {
      validations,
      isPwd1: ref(true),
      isPwd2: ref(true),
      state,
      v$,
      letterNumber: ref(/^[0-9a-zA-Z]+$/),

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
