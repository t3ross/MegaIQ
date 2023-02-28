<script lang="ts" src="./Register.ts" />

<template>
  <div class="auth-title header-font flex flex-center">
    Mega<span class="iq-background"><span class="iq">IQ</span></span>
  </div>
  <q-form @submit="createAccount" @reset="onReset" class="auth auth-regsiter">
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
          @mousedown="isPwd1 = false"
          @mouseleave="isPwd1 = true"
          @mouseup="isPwd1 = true" />
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
          val === state.password.password ||
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
      class="auth-input"
      v-model="state.accept"
      label="Acepto los términos y condiciones" />

    <router-link class="auth-input auth-link" :to="{ name: 'login' }"
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
