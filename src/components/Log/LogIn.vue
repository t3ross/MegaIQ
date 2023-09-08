<template>
  <q-form
    @submit.prevent="onSubmit"
    @reset="onReset"
    class="auth auth-login q-pb-lg q-pt-sm bg-white">
    <!-- X button -->
    <div class="flex col justify-end q-pr-sm q-pb-sm">
      <q-btn
        unelevated
        round
        class="text-primary"
        icon="fa-solid fa-x"
        size="12px"
        v-close-popup />
    </div>
    <!-- Inputs -->
    <q-input
      class="auth-input q-px-lg q-pb-lg"
      filled
      type="email"
      v-model="userForm.email"
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
      :type="isPwd ? 'password' : 'text'"
      v-model="userForm.password"
      label="Escribe tu contraseña"
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        // TODO: Match the passwords
      ]">
      <template v-slot:append v-if="userForm.password">
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @mousedown="isPwd = false"
          @mouseleave="isPwd = true"
          @mouseup="isPwd = true" />
      </template>
    </q-input>

    <!-- <div class="q-px-lg">
      <router-link class="auth-input auth-link" :to="{ name: 'register' }"
        >¿No tienes cuenta?
        <span class="text-primary">Regístrate</span></router-link
      >
    </div> -->

    <div class="flex col justify-end q-px-lg q-gutter-sm">
      <q-btn
        label="Vaciar campos"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm" />
      <q-btn unelevated label="Acceder" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuth from 'src/composables/useAuth';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'AuthLogin',
  setup() {
    const { loginUser, isPwd } = useAuth();
    const userForm = ref({
      email: '',
      password: '',
    });
    const onReset = () => {
      userForm.value.username = '';
      userForm.value.email = '';
      userForm.value.password = '';
      userForm.value.passwordConfirm = '';
      userForm.value.accept = false;
    };

    return {
      userForm,
      loginUser,
      isPwd,
      onReset,
      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value);

        if (!ok) {
          Notify.create({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: message,
          });
        } else {
          Notify.create({
            color: 'green-4',
            textColor: 'white',
            icon: 'check',
            message: 'Accediendo a cuenta',
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
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
