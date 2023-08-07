<script lang="ts" src="./HomePage.ts" />

<template>
  <!-- ----------Header---------- -->

  <q-header class="header-container">
    <q-toolbar class="header row justify-between">
      <!-- MegaIQ logo -->
      <q-toolbar-title shrink class="col-1-md-1">
        <div ref="toolbarTitle" class="toolbar-title header-font">
          <q-img
            src="~assets/MegaIQ.svg"
            width="150px"
            height="50px"
            :ratio="1"
            class="no-friend-img"
            spinner-color="primary"
            spinner-size="82px"
            alt="MegaIQ logo" />
        </div>
      </q-toolbar-title>
      <!-- Search bar -->
      <div class="searchBar toolbar-searchBar col-6" ref="toolbarSearchBar">
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

      <div class="column justify-end col-1-md-1">
        <div v-if="userLogged">
          <q-btn dense flat round icon="las la-cog" />
          <q-btn dense flat round icon="las la-user-circle" />
        </div>
        <div
          v-else
          class="row q-gutter-x-sm text-font-medium row flex-center no-wrap q-pr-md">
          <q-btn
            class="enter-account-btn toolbar-btn toolbar-login text-uppercase"
            ref="toolbarButtonLogin"
            @click="goToLogin"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="enter-account-btn toolbar-btn toolbar-register justify-center"
            ref="toolbarButtonRegister"
            @click="goToRegister"
            color="primary"
            label="Registrate!" />
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <!-- Banner -->

  <div
    class="header-banner text-h1 column flex-center q-gutter-y-xl text-white"
    ref="headerBanner"
    @mousemove="headerBannerParallax">
    <div class="flex items-end col" ref="headerBannerTitle">
      <!-- Logo -->
      <q-img
        src="~assets/MegaIQ.svg"
        width="380px"
        height="132px"
        :ratio="2"
        class="no-friend-img"
        spinner-color="primary"
        spinner-size="82px"
        alt="MegaIQ logo" />
    </div>
    <p class="header-text text-body1 text-font-medium">
      Repasa conceptos, aprende cosas nuevas y comparte con demás estudiantes e
      instructores sobre temas académicos. MegaIQ está diseñado para
      complementar y mejorar tu aprendizaje escolar!
    </p>
    <!-- Toolbar -->
    <div class="flex justify-center items-end col full-width non-selectable">
      <q-toolbar class="header-banner-toolbar q-gutter-x-md q-pb-lg">
        <q-toolbar-title>
          <!-- Search Bar -->
          <q-input
            standout
            class="searchBar header-banner-searchBar white-border q-pl-lg q-pr-sm q-py-sm"
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
              class="header-btn"
              @click="goToServices"
              label="Servicios de pago"
              color="primary" />
          </q-input>
        </q-toolbar-title>
        <!-- Buttons -->
        <div
          class="header-banner-btns text-font-medium flex flex-center q-gutter-x-md">
          <q-btn
            class="header-btn account-btn"
            @click="goToLogin"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="header-btn account-btn"
            @click="goToRegister"
            label="Registrate!"
            color="primary" />
        </div>
      </q-toolbar>
    </div>
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

        <div class="friend-lateral laterals q-pa-md">
          <p class="text-h4 text-white text-weight-regular">Amigos</p>

          <div
            v-if="friendsList.length === 0"
            class="no-friends column flex-center">
            No tienes ningún amigo aún... <br />
            <a href="#">Busca gente aquí</a>
            <q-img
              src="~assets/coolface.png"
              width="140px"
              :ratio="1"
              class="q-mt-md no-friend-img"
              spinner-color="primary"
              spinner-size="82px"
              alt="No friends image" />
          </div>

          <q-list class="friend-list" v-else>
            <q-item
              clickable
              v-ripple:white
              class="no-padding friend-item"
              v-for="friend in friendsList"
              :key="friend.friendId">
              <q-item-section avatar>
                <q-avatar size="56px">
                  <img
                    :src="friend.friendPFP"
                    :alt="friend.friendName + 'Photo'" />
                  <div
                    class="online-dot"
                    v-if="friend.friendStatus === 'online'"></div>
                </q-avatar>
              </q-item-section>

              <q-item-section
                class="friend-info text-white"
                :class="{ 'first-friend': friend.friendId === 1 }">
                {{ friend.friendName }}
                <br />

                <span class="friend-last-msg text-weight-light text-subtitle1">
                  <i
                    :class="
                      friend.friendMsgSeen
                        ? 'fa-solid fa-circle-check'
                        : 'fa-regular fa-circle-check'
                    "></i>
                  {{ friend.friendLastMsg }}</span
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>

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
              <span class="fa-solid fa-fire"></span>
              Top
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-recent white-border"
              stack
              unelevated>
              <span class="fa-solid fa-star"></span>
              Recientes
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-more white-border"
              stack
              unelevated>
              <span class="fa-solid fa-compass"></span>
              Descubrir
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-voted white-border"
              stack
              unelevated>
              <span class="fa-solid fa-users"></span>
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
