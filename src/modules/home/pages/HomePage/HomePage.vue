<script lang="ts" src="./HomePage.ts" />

<template>
  <!-- ----------Header---------- -->

  <q-header class="header-container">
    <q-toolbar class="header row justify-between">
      <q-toolbar-title shrink class="col-1-md-1">
        <div ref="toolbarTitle" class="toolbar-title header-font">
          Mega<span class="iq-background"><span class="iq">IQ</span></span>
        </div>
      </q-toolbar-title>
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

  <div
    class="header-banner text-h1 column flex-center q-gutter-y-xl text-white"
    ref="headerBanner"
    @mousemove="headerBannerParallax">
    <div class="flex items-end q-pt-xl col" ref="headerBannerTitle">
      <div class="header-banner-title header-font">
        Mega<span class="iq-background iq-banner"
          ><span class="iq non-selectable">IQ</span></span
        >
      </div>
    </div>
    <p class="header-text text-body1 text-font-medium">
      Repasa conceptos, aprende cosas nuevas y comparte con demás estudiantes e
      instructores sobre temas académicos. MegaIQ está diseñado para
      complementar y mejorar tu aprendizaje escolar!
    </p>
    <div class="flex justify-center items-end col full-width non-selectable">
      <q-toolbar class="header-banner-toolbar q-gutter-x-md q-pb-lg">
        <q-toolbar-title>
          <q-input
            standout
            class="searchBar header-banner-searchBar white-border q-px-lg q-py-sm"
            borderless
            color="primary"
            type="text"
            v-model="searchBar"
            placeholder="Busca algún tema del que quieras investigar...">
            <template v-slot:prepend>
              <q-icon
                name="fa-solid fa-magnifying-glass"
                color="primary" /> </template
          ></q-input>
        </q-toolbar-title>
        <div
          class="header-banner-btns text-font-medium flex flex-center q-gutter-x-md">
          <q-btn
            class="enter-account-btn"
            @click="goToLogin"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="enter-account-btn"
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

          <div v-if="!friendsList" class="no-friends column flex-center">
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
              :class="{ 'last-friend': friend.id === '3' }"
              v-for="friend in friendsList"
              :key="friend.id">
              <q-item-section avatar>
                <q-avatar size="56px">
                  <img :src="friend.pfp" :alt="friend.name + 'Photo'" />
                  <div
                    class="online-dot"
                    v-if="friend.status === 'active'"></div>
                </q-avatar>
              </q-item-section>

              <q-item-section
                class="friend-info text-white"
                :class="{ 'first-friend': friend.id === '1' }">
                {{ friend.name }}
                <br />

                <span class="friend-last-msg text-weight-light text-subtitle1">
                  <i
                    :class="
                      friend.msgSeen
                        ? 'fa-solid fa-circle-check'
                        : 'fa-regular fa-circle-check'
                    "></i>
                  {{ friend.lastMsg }}</span
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
        <div class="column flex-center" v-if="!mainPosts">
          <img
            src="https://distok.top/stickers/749043879713701898/749053210760577245.png"
            alt="No posts results Image" />
          <p>No hay nada para mostrar aquí... busca en otro sitio ^^</p>
        </div>
        <div class="q-gutter-y-md" v-else>
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
              class="filterContent-option col column flex-center filterContent-voted white-border"
              stack
              unelevated>
              <span class="fa-solid fa-heart"></span>
              Más votos
            </q-btn>
            <q-btn
              :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
              class="filterContent-option col column flex-center filterContent-more white-border"
              stack
              unelevated>
              <span class="fa-solid fa-compass"></span>
              Descubrir
            </q-btn>
          </div>

          <div
            class="main-posts q-pa-md white-border"
            v-for="post in mainPosts"
            :key="post.postId">
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
                  {{ post.postDescription }} <a href="#"></a>
                </div>
              </q-toolbar-title>
              <div class="flex q-gutter-md q-pr-sm">
                <div class="post-like-count column flex-center non-selectable">
                  <q-btn
                    class="text-indigo-2"
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart fa-lg"
                    size="16px" />
                  {{ post.postLikeCount }}
                </div>
                <div
                  class="post-dislike-count column flex-center non-selectable">
                  <q-btn
                    class="text-indigo-2"
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart-crack fa-lg"
                    size="16px" />
                  {{ post.postDislikeCount }}
                </div>
              </div>
            </q-toolbar>
            <q-separator class="blog-header-separator q-mt-md" dark />
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
//----------------Header

.header-container {
  backdrop-filter: blur(10px);
  background-color: rgba($primary, 0.5);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  .header {
    height: 80px;

    .toolbar-title {
      font-size: 30px;
      transform: translateX(-150px);
      transition: all 0.2s;
    }
    .toolbar-title::selection {
      background: $secondary;
    }
    .toolbar-title-enter {
      transform: translateX(0);
    }

    .toolbar-searchBar {
      transform: translateY(-150px);
      max-width: 1100px;
      transition: all 0.2s;
      // display: block !important;
    }

    .toolbar-searchBar-enter {
      transform: translateY(0);
      // width: 780px;
      // display: block !important;
    }

    .toolbar-btn {
      margin-top: -150px;
    }

    .toolbar-btn-enter {
      margin-top: 0;
    }
  }
}

.searchBar {
  background: #ffffff;
  border-radius: 50px;
}
.header-banner {
  // animation: headerBannerMove 2s infinite;
  background: url('assets/red-blue-bg.png') no-repeat;
  background-size: 120%;
  height: 90vh;
  margin-top: -80px;
  transition: all 0.1s;

  .header-banner-title {
    animation: headerBannerFloating ease 10s infinite alternate;
    font-size: 7rem;
  }
  .iq-banner {
    padding: 4px 12px;
    border-radius: 12px;
    margin-left: 12px;
  }
  .header-text {
    width: 800px;
    margin-bottom: 0; //Default Quasar P attribute
  }
  .header-banner-toolbar {
    max-width: 1400px;
  }

  .header-banner-searchBar {
    font-size: 1.7rem;
  }

  // @keyframes headerBannerMove {
  //   0% {
  //     background-position: 0px 0px;
  //   }
  //   50% {
  //     background-position: -20px -20px;
  //   }
  //   100% {
  //     background-position: 0px 0px;
  //   }
  // }
  // @keyframes headerBannerInitialPos {
  //   0% {
  //   }
  //   100% {
  //     background-position: 0px 0px;
  //   }
  // }
}
.enter-account-btn {
  border-radius: 100px;
  letter-spacing: normal;
  transition: all 0.1s;
  font-size: 1.7rem !important;
}
.enter-account-btn:hover {
  scale: 1.1;
}

//----------------Main
.lateral {
  overflow: hidden;
}
.layout-content {
  .main {
    gap: 20px;
    margin: 0 16px;
    position: relative;

    .filterContent-container {
      gap: 16px;
      .filterContent-option {
        padding: 10px;
      }
      .filterContent-option span {
        color: rgba($primary, 0.5);
        font-size: 28px;
        padding: 4px 0 12px 0;
      }
      .filterContent-option:hover {
        background: rgba($white, 0.1);
      }
    }
    //-----Posts
    .post-like-count .post-dislike-count {
      background: $primary;
      border-radius: 6px;
      font-size: 18px;
    }

    .post-description {
      font-size: 14px;
    }
    .blog-header-separator {
      background: $white;
    }
  }
}

//----Laterals
.laterals {
  background: linear-gradient(133deg, $primary 0%, $secondary 100%);
  position: sticky;
  width: 100%;
  .apply-btn {
    border-radius: 8px;
    width: 200px;
  }
}
//subjects-lateral
.filter-lateral {
  border-radius: 0 8px 8px 0;

  .filter-checkboxes {
    background-color: $white-blue;
    border-radius: 8px;
    padding: 8px 0;
  }
  .filter-checkboxes:last-child {
    margin-bottom: 12px;
  }
}
//friend-lateral
.friend-lateral {
  border-radius: 0 8px 8px 0;

  .no-friend-img {
    opacity: 0.6;
  }
  .friend-list {
    border-top: 1px solid rgba($white-blue, 0.719);
    .friend-item {
      height: 76px;
    }
    .friend-item:last-child {
      height: 76px;
    }
    .friend-info {
      border-top: 1px solid rgba($white-blue, 0.719);
      font-size: 18px;
      line-height: 20px;
    }
    .first-friend {
      border-top: none;
      color: red;
    }

    .online-dot {
      background: #99cc00;
      border-radius: 100%;
      bottom: 2%;
      height: 12px;
      outline: 3px solid rgb(210, 225, 255);
      position: absolute;
      right: 2%;
      width: 12px;
    }
    .last-friend {
      border-bottom: 1px solid rgba($white-blue, 0.719);
      margin-bottom: 12px;
    }
  }
}
</style>
