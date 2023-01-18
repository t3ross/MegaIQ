<template>
  <div ref="toolbarTitle" class="auth-title header-font">
    Mega<span class="iq-background"><span class="iq">IQ</span></span>
  </div>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="auth auth-login q-gutter-y-md">
    <q-input
      class="auth-input"
      filled
      v-model="name"
      label="Tu nombre"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Por favor escribe algún nombre',
      ]" />

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

    <q-toggle v-model="accept" label="Acepto los términos y condiciones" />

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
      name,
      email,
      accept,

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
