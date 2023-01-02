<template>
  <!-- ----------Header---------- -->

  <q-header class="bg-blur">
    <q-toolbar class="bg-blur">
      <q-toolbar-title>
        <div ref="toolbarTitle" class="toolbar-title header-font">MegaIQ</div>
      </q-toolbar-title>
      <div v-if="userLogged">
        <q-btn dense flat round icon="las la-cog" />
        <q-btn dense flat round icon="las la-user-circle" />
      </div>
      <div
        v-else
        class="row q-gutter-x-xl text-font-medium row flex-center q-pr-lg">
        <a
          class="toolbar-buttons toolbar-login text-white text-uppercase"
          ref="toolbarButtonLogin"
          href="#"
          >Inicia sesión!</a
        >
        <button
          class="toolbar-buttons toolbar-register q-btn q-btn-item non-selectable no-outline q-btn--standard bg-primary text-white q-btn--actionable justify-center"
          ref="toolbarButtonRegister"
          type="button"
          v-ripple>
          Registrate!
        </button>
      </div>
    </q-toolbar>
  </q-header>

  <div
    class="header-banner text-h1 header-font column q-gutter-y-xl flex-center text-white"
    ref="headerBanner"
    @mousemove="headerBannerParallax">
    <div ref="headerBannerTitle" class="header-banner-title">MegaIQ</div>
    <p class="header-text text-body1 text-font-medium">
      Repasa conceptos, aprende cosas nuevas y comparte con demás estudiantes e
      instructores sobre temas académicos. MegaIQ está diseñado para
      complementar y mejorar tu aprendizaje escolar!
    </p>
  </div>

  <!-- ----------Main---------- -->

  <div class="layout-container flex q-py-md">
    <q-layout view="hHh lpr fFf" class="layout-content">
      <!-- Aside -->

      <q-drawer
        side="left"
        :width="280"
        :breakpoint="500"
        content-style="laterals"
        class="q-gutter-y-md"
        show-if-above>
        <!-- Friend drawer -->

        <div class="friend-lateral laterals q-pa-md">
          <p class="text-h4 text-white text-weight-regular">Amigos</p>

          <div v-if="friendsList" class="no-friends column flex-center">
            No tienes ningún amigo aún... <br />
            <a href="#">Busca gente aquí</a>
            <q-img
              src="~assets/coolface.png"
              width="140px"
              :ratio="1"
              class="q-mt-md no-friend-img"
              spinner-color="primary"
              spinner-size="82px" />
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
                  <img :src="friend.pfp" />
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

      <q-page-container class="main full-height flex">
        <!-- <q-scroll-area class="main-container q-gutter-y-md fit"> -->
        <div
          class="selCont-container full-width row flex-center q-pa-md white-border">
          <q-btn
            :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
            class="selCont-option col column flex-center selCont-top white-border"
            stack
            unelevated>
            <span class="fa-solid fa-fire"></span>
            Top
          </q-btn>
          <q-btn
            :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
            class="selCont-option col column flex-center selCont-recent white-border"
            stack
            unelevated>
            <span class="fa-solid fa-star"></span>
            Recientes
          </q-btn>
          <q-btn
            :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
            class="selCont-option col column flex-center selCont-voted white-border"
            stack
            unelevated>
            <span class="fa-solid fa-heart"></span>
            Más votos
          </q-btn>
          <q-btn
            :ripple="{ early: false, color: 'indigo-3', keyCodes: [] }"
            class="selCont-option col column flex-center selCont-more white-border"
            stack
            unelevated>
            <span class="fa-solid fa-compass"></span>
            Descubrir
          </q-btn>
        </div>
        <div
          class="main-post q-pa-md border white-border"
          v-for="post in mainPosts"
          :key="post.postId">
          <div class="post-header"></div>
          <q-toolbar class="post-title text-h5 q-px-none">
            <q-toolbar-title class="column justify-between">
              <div class="q-pt-sm">
                {{ post.postTitle }} -
                <span class="post-author vertical-middle text-h5">
                  <q-avatar size="20px" class="q-mb-xs"
                    ><img
                      :src="post.postAuthorPfp"
                      alt="{{ post.postAuthor }} profile image"
                  /></q-avatar>
                  {{ post.postAuthor }}</span
                >
              </div>
              <div class="post-description text-grey-8 q-pt-sm">
                {{ post.postDescription }}
              </div>
            </q-toolbar-title>

            <div class="flex q-gutter-md q-pr-sm">
              <div class="post-like-count column flex-center">
                <q-btn
                  dense
                  flat
                  round
                  icon="fa-solid fa-heart fa-lg"
                  size="16px"
                  class="text-indigo-2" />
                {{ post.postLikeCount }}
              </div>
              <div class="post-dislike-count column flex-center">
                <q-btn
                  dense
                  flat
                  round
                  icon="fa-solid fa-heart-crack fa-lg"
                  size="16px"
                  class="text-indigo-2" />
                {{ post.postDislikeCount }}
              </div>
            </div>
          </q-toolbar>

          <q-separator class="blog-header-separator q-mt-md" dark />

          <div class="row flex-center">
            <img
              :src="post.postImage"
              width="530"
              class="bg-grey-1 q-my-lg q-pa-sm" />
            <div>
              {{ post.postContentFilter() }}
            </div>
          </div>
        </div>
        <!-- </q-scroll-area> -->
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const mainPosts = [
      {
        postId: '1',
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: '23',
        postDislikeCount: '2',
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
        postContentFilter: function () {
          return this.postContent.length > 200
            ? this.postContent.substring(0, 200) + '...'
            : this.postContent;
        },
      },
      {
        postId: '1',
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: '23',
        postDislikeCount: '2',
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
        postContentFilter: function () {
          return this.postContent.length > 200
            ? this.postContent.substring(0, 200) + '...'
            : this.postContent;
        },
      },
      {
        postId: '1',
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: '23',
        postDislikeCount: '2',
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
        postContentFilter: function () {
          return this.postContent.length > 200
            ? this.postContent.substring(0, 200) + '...'
            : this.postContent;
        },
      },
    ];

    const headerBanner = ref();

    const headerBannerTitle = ref();

    const toolbarTitle = ref();

    const toolbarButtonLogin = ref();
    const toolbarButtonRegister = ref();

    const headerBannerParallax = (event: any) => {
      let x = event.clientX / 28;
      let y = event.clientY / 28;

      headerBanner.value.style.backgroundPosition = `-${x}px -${y}px`;
    };

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            toolbarTitle.value.classList.remove('toolbar-title-enter');
            toolbarButtonLogin.value.classList.remove('toolbar-buttons-enter');
            toolbarButtonRegister.value.classList.remove(
              'toolbar-buttons-enter'
            );
          } else {
            toolbarTitle.value.classList.add('toolbar-title-enter');
            toolbarButtonLogin.value.classList.add('toolbar-buttons-enter');
            toolbarButtonRegister.value.classList.add('toolbar-buttons-enter');
          }
        },
        {
          rootMargin: '0px -100px',
        }
      );

      const header = document.querySelector('.header-banner-title');
      observer.observe(header as Element);
    });

    return {
      headerBannerTitle,
      toolbarTitle,
      toolbarButtonLogin,
      toolbarButtonRegister,
      headerBanner,
      headerBannerParallax,
      mainPosts,
      group: ref(['op1']),
      userLogged: false,

      filterType: [
        {
          label: 'Blog',
          value: 'blog',
        },
        {
          label: 'Video',
          value: 'video',
        },
      ],

      filterSubjects: [
        {
          label: 'Matemáticas',
          value: 'math',
        },
        {
          label: 'Biología',
          value: 'biology',
        },
        {
          label: 'Química',
          value: 'chemistry',
        },
        {
          label: 'Física',
          value: 'physics',
        },
        {
          label: 'Geografía',
          value: 'geography',
        },
        {
          label: 'Artes',
          value: 'art',
        },
        {
          label: 'Economía',
          value: 'economy',
        },
      ],
      friendsList: [],
    };
  },
});
</script>

<style scoped lang="scss">
//----------------Header
.bg-blur {
  backdrop-filter: blur(10px);
  background-color: rgba($primary, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  height: 80px;

  .toolbar-title {
    font-size: 30px;
    transition: all 0.2s;
    margin-left: -10%;
  }

  .toolbar-buttons {
    margin-top: -130px;
  }
  .toolbar-login {
    transition: all 0.1s;
  }

  .toolbar-register {
    transition: all 0.1s;
    scale: 1.2;
    border-radius: 20px;
  }

  // Animations

  .toolbar-title-enter {
    transform: translate(10%, 0);
  }
  .toolbar-login:hover {
    transform: scale(1.1);
  }
  .toolbar-register:hover {
    transform: scale(1.1);
  }
  .toolbar-buttons-enter {
    margin-top: 0;
  }
}
.header-banner {
  transition: all 0.1s;
  background-image: url('../../../assets/red-blue-bg.png');
  background-size: 105%;
  height: 90vh;
  margin-top: -80px;
  .header-text {
    width: 800px;
  }
}
//----------------Main
.layout-content {
  .main {
    // padding: 0 !important;
    margin: 0 16px;

    gap: 20px;

    .selCont-container {
      gap: 16px;
      .selCont-option {
        width: 200px;
        padding: 10px;
      }
      .selCont-option span {
        font-size: 28px;
        padding: 4px 0 12px 0;
        color: rgba($primary, 0.5);
      }
      .selCont-option:hover {
        background: rgba($info, 0.1);
      }
    }
    //-----Posts

    .post-description {
      font-size: 14px;
    }
    .post-like-count,
    .post-dislike-count {
      font-size: 18px;
      background: $white;
      border-radius: 6px;
    }
    .blog-header-separator {
      background: $white;
    }
  }
}

//----Laterals
.laterals {
  background: linear-gradient(
    133deg,
    rgba(121, 135, 203, 0.7) 0%,
    rgba(88, 119, 255, 0.7) 100%
  );
  width: 100%;
  position: sticky;
  .apply-btn {
    width: 200px;
    border-radius: 8px;
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
  background: linear-gradient(
    133deg,
    rgba(121, 135, 203, 0.7) 0%,
    rgba(108, 135, 255, 0.7) 100%
  );

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
      line-height: 20px;
      font-size: 18px;
    }
    .first-friend {
      border-top: none;
      color: red;
    }

    .online-dot {
      width: 12px;
      height: 12px;
      background: #99cc00;
      outline: 3px solid rgb(210, 225, 255);
      position: absolute;
      bottom: 2%;
      right: 2%;
      border-radius: 100%;
    }
    .last-friend {
      border-bottom: 1px solid rgba($white-blue, 0.719);
      margin-bottom: 12px;
    }
  }
}
</style>
