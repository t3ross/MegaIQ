<script lang="ts" src="./HomePage.ts" />

<template>
  <!-- ----------Header---------- -->

  <q-header class="header-container">
    <q-toolbar class="header row justify-between">
      <!-- MegaIQ logo -->
      <q-toolbar-title shrink class="col-1-md-1">
        <div ref="toolbarTitle" class="toolbar-title-home header-font">
          <q-img
            class="c-pointer"
            @click="goToHome"
            src="~assets/MegaIQ.svg"
            width="150px"
            height="50px"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            alt="MegaIQ logo" />
        </div>
      </q-toolbar-title>
      <!-- Search bar -->
      <div
        class="searchBar toolbar-searchBar toolbar-searchBar-home col-6"
        ref="toolbarSearchBar">
        <q-input
          class="q-px-lg prevent prueba"
          borderless
          v-model="searchBar"
          color="primary"
          type="text"
          placeholder="Busca algún tema del que quieras investigar...">
          <template v-slot:prepend>
            <q-icon
              name="fa-solid fa-magnifying-glass"
              color="primary" /> </template
        ></q-input>
      </div>
      <!-- Account -->
      <div class="column justify-end col-1-md-1">
        <div v-if="userLogged">
          <q-btn dense flat round icon="las la-cog" />
          <q-btn dense flat round icon="las la-user-circle" />
        </div>
        <!-- Buttons -->
        <div
          v-else
          class="row q-gutter-x-sm text-font-medium row flex-center no-wrap q-pr-md">
          <q-btn
            class="header-btn account-btn toolbar-btn toolbar-login text-uppercase"
            ref="toolbarButtonLogin"
            @click="logIn = true"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="header-btn account-btn toolbar-btn justify-center"
            ref="toolbarButtonRegister"
            @click="register = true"
            color="primary"
            label="Registrate!" />
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <!-- Banner -->

  <div
    class="header-banner text-h1 flex flex-center column q-gutter-y-xl text-white"
    ref="headerBanner"
    @mousemove="headerBannerParallax">
    <!-- Logo -->
    <div
      class="flex justify-end column items-center col-7 q-gutter-md"
      ref="headerBannerTitle">
      <q-img
        src="~assets/MegaIQ.svg"
        class="headerBannerLogo c-pointer"
        width="380px"
        height="132px"
        :ratio="2"
        spinner-color="primary"
        spinner-size="82px"
        alt="MegaIQ logo" />
      <p class="header-text text-body1 text-font-medium text-md">
        Repasa conceptos, aprende cosas nuevas y comparte con demás estudiantes
        e instructores sobre temas académicos. MegaIQ está diseñado para
        complementar y mejorar tu aprendizaje escolar!
      </p>
      <q-btn push color="primary" label="Conócenos aquí!" @click="goToMeetUs" />
    </div>
    <!-- Toolbar -->
    <div class="flex justify-center items-end col full-width non-selectable">
      <q-toolbar class="header-banner-toolbar q-gutter-x-md q-pb-sm">
        <q-toolbar-title>
          <!-- Search Bar -->
          <q-input
            standout
            class="searchBar header-banner-searchBar q-pl-lg"
            borderless
            color="primary"
            type="text"
            v-model="searchBar"
            placeholder="Busca algún tema del que quieras investigar...">
            <!-- Inside -->
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-magnifying-glass" color="primary" />
            </template>
            <q-btn
              class="header-btn text-font-medium"
              @click="goToServices"
              label="Servicios de pago"
              color="primary" />
          </q-input>
        </q-toolbar-title>
        <!-- Buttons -->
        <div class="text-font-medium flex flex-center q-gutter-x-md">
          <q-btn
            class="header-btn account-btn"
            @click="logIn = true"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="header-btn account-btn"
            @click="register = true"
            label="Registrate!"
            color="primary" />
        </div>
      </q-toolbar>
    </div>
  </div>

  <!-- Dialogs Login, Register -->
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

  <!-- ----------Main---------- -->

  <div class="layout-container flex flex-center full-height q-py-md">
    <q-layout view="hHh lpr fFf" class="layout-content">
      <!-- Aside -->

      <q-drawer
        class="lateral q-gutter-y-md"
        side="left"
        :width="280"
        :breakpoint="500"
        content-style="laterals"
        show-if-above>
        <!-- Friend drawer -->

        <FriendsAside />

        <!-- Filter drawer -->

        <div class="filter-lateral laterals q-pa-md">
          <p class="text-h4 text-white text-weight-regular">
            Filtrar resultados
          </p>

          <!-- Filter checkboxes -->

          <div>
            <p class="type-checkboxes text-h5 text-white text-weight-regular">
              Tipo
            </p>

            <!-- Type checkboxes -->

            <q-option-group
              v-model="group"
              :options="filterType"
              color="indigo-4"
              type="checkbox"
              class="filter-checkboxes q-ml-auto" />

            <!-- Subjects checkboxes -->

            <p
              class="type-checkboxes q-pt-lg text-h5 text-white text-weight-regular">
              Asignaturas
            </p>

            <q-option-group
              v-model="group"
              :options="filterSubjects"
              color="indigo-4"
              type="checkbox"
              class="filter-checkboxes q-ml-auto" />

            <q-btn
              color="secondary"
              label="Aplicar"
              class="apply-btn q-mt-lg full-width" />
          </div>
        </div>
      </q-drawer>

      <!-- ----Main content---- -->

      <q-page-container class="main full-height flex flex-center">
        <!-- No results -->
        <div class="column flex-center" v-if="mainPosts.length === 0">
          <img
            src="https://distok.top/stickers/749043879713701898/749053210760577245.png"
            alt="No posts results Image" />
          <p>No hay nada para mostrar aquí... busca en otro sitio ^^</p>
        </div>
        <!-- Results -->
        <div class="q-gutter-y-md" v-else>
          <!-- Top filters  -->
          <div
            class="filterContent-container full-width row flex-center q-pa-md white-border col-1">
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-top white-border"
              stack
              unelevated>
              <span class="filter-icon fa-solid fa-fire"></span>
              Top
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-recent white-border"
              stack
              unelevated>
              <span class="filter-icon fa-solid fa-star"></span>
              Recientes
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-more white-border"
              stack
              unelevated>
              <span class="filter-icon fa-solid fa-compass"></span>
              Descubrir
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-voted white-border"
              stack
              unelevated>
              <span class="filter-icon fa-solid fa-users"></span>
              Siguiendo
            </q-btn>
          </div>
          <!-- Posts -->
          <div
            class="main-posts q-pa-md white-border"
            v-for="post in mainPosts"
            :key="post.postId">
            <!-- Post Header -->
            <q-toolbar class="post-title text-h5 q-px-none">
              <q-toolbar-title class="column justify-between">
                <div class="q-pt-sm">
                  {{ post.postTitle }} -
                  <span class="post-author vertical-middle text-h5">
                    <q-avatar size="20px" class="q-mb-xs"
                      ><img
                        :src="post.postAuthorPfp"
                        :alt="post.postAuthor + 'profile image'"
                    /></q-avatar>
                    {{ post.postAuthor }}</span
                  >
                </div>
                <div class="post-description text-grey-8 q-pt-sm">
                  {{ post.postDescription }}
                </div>
              </q-toolbar-title>
              <!-- Votation -->
              <div class="flex q-gutter-md">
                <!-- Like -->
                <div
                  class="post-vote-count post-like-count column flex-center non-selectable">
                  <q-btn
                    class="text-indigo-2"
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart fa-lg"
                    size="16px" />
                  <div class="text-grey-7 text-weight-light q-pb-xs">
                    {{ post.postLikeCount }}
                  </div>
                </div>
                <!-- Dislike -->
                <div
                  class="post-vote-count post-dislike-count column flex-center non-selectable">
                  <q-btn
                    class="text-indigo-2"
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart-crack fa-lg"
                    size="16px" />
                  <div class="text-grey-7 text-weight-light q-pb-xs">
                    {{ post.postDislikeCount }}
                  </div>
                </div>
              </div>
            </q-toolbar>
            <q-separator class="blog-header-separator q-mt-md" dark />
            <!-- Post body -->
            <div class="row flex-center">
              <img
                :src="post.postImage"
                :alt="post.postTitle + 'image'"
                width="530"
                class="bg-grey-1 q-my-lg q-pa-sm" />
              <div>
                {{ postContentFilter(post.postContent) }}
              </div>
            </div>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="scss">
@import '../../css/Home.scss';
</style>
