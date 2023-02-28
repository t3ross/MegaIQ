<script lang="ts" src="./Login.ts" />

<template>
  <div class="auth-title header-font flex flex-center">
    Mega<span class="iq-background"><span class="iq">IQ</span></span>
  </div>
  <q-form @submit="enterAccount" @reset="onReset" class="auth auth-login">
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
      :type="isPwd ? 'password' : 'text'"
      v-model="state.password.password"
      label="Escribe tu contraseña"
      :rules="[
        (val) =>
          (val && val.length !== 0) || 'Por favor escribe una contraseña',
        // TODO: Match the passwords
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

    <router-link class="auth-input auth-link" :to="{ name: 'register' }"
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
