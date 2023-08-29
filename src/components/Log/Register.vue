<template>
  <q-form
    @submit.prevent="onSubmit"
    @reset="onReset"
    class="auth auth-register q-pb-lg q-pt-sm bg-white">
    <div class="flex col justify-end q-pr-sm q-pb-sm">
      <q-btn
        unelevated
        round
        class="text-primary"
        icon="fa-solid fa-x"
        size="12px"
        v-close-popup />
    </div>
    <q-input
      class="auth-input q-px-lg q-pb-lg"
      filled
      type="text"
      v-model="state.username"
      label="Tu nombre de usuario"
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
        (val) =>
          val.length >= 3 ||
          'Por favor escribe un nombre con mínimo 3 carácteres.',
      ]" />
    <q-input
      class="auth-input q-px-lg q-pb-lg"
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
      class="auth-input q-px-lg q-pb-lg"
      filled
      :type="isPwd1 ? 'password' : 'text'"
      v-model="state.password"
      label="Escribe tu contraseña"
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
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @mousedown="isPwd = false"
          @mouseleave="isPwd = true"
          @mouseup="isPwd = true" />
      </template>
    </q-input>
    <q-input
      class="auth-input q-px-lg"
      filled
      :type="isPwd2 ? 'password' : 'text'"
      v-model="state.passwordConfirm"
      label="Repite la contraseña"
      :rules="[
        (val) =>
          (val && val.length !== 0) ||
          'Por favor escribe la contraseña nuevamente',
        (val) =>
          val === state.password ||
          'Las contraseñas no coinciden. Por favor escribe la contraseña nuevamente',
      ]"
      ><template v-slot:append v-if="state.password.confirm">
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @mousedown="isPwd2 = false"
          @mouseleave="isPwd2 = true"
          @mouseup="isPwd2 = true" /> </template
    ></q-input>
    <q-toggle
      class="auth-input q-px-lg q-pb-md"
      v-model="state.accept"
      label="Acepto los términos y condiciones" />

    <!-- <div class="q-px-lg c-pointer" v-close-popup>
      ¿No tienes cuenta?
      <span class="text-primary">Inicia sesión</span>
    </div> -->

    <div class="flex col justify-end q-px-lg q-gutter-sm">
      <q-btn
        label="Vaciar campos"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm" />
      <q-btn unelevated label="Crear cuenta" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuth from 'src/composables/useAuth';

export default defineComponent({
  name: 'AuthRegister',

  setup() {
    const { state, onReset, isPwd, createUser } = useAuth();

    return {
      state,
      createUser,
      isPwd,
      onReset,
      letterNumber: ref('(?=[A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]'),
      isPwd1: ref(true),
      isPwd2: ref(true),

      onSubmit: async () => {
        createUser(state.value);
      },
    };
  },
});
</script>

<style lang="scss">
@import 'src/css/quasar.variables.scss';

.auth {
  border-radius: 8px;
  width: 500px;
}
.auth-link:active {
  color: $primary;
  text-decoration: underline;
}
</style>
