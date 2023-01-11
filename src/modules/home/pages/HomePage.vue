<template>
  <!-- ----------Header---------- -->

  <q-header class="bg-blur">
    <q-toolbar class="bg-blur row justify-between">
      <q-toolbar-title shrink>
        <div
          ref="toolbarTitle"
          class="toolbar-title header-font"
          @click="addSearchBarClass()">
          MegaIQ
        </div>
      </q-toolbar-title>
      <!-- ref="toolbarSearchBar" -->
      <q-input
        ref="toolbarSearchBar"
        class="searchBar toolbar-searchBar toolbar-searchBar-enter white-border q-px-lg"
        borderless
        color="primary"
        v-model="searchBar"
        @focus="addSearchBarClass()"
        type="text"
        placeholder="Busca algún tema del que quieras investigar...">
        <template v-slot:prepend>
          <q-icon
            name="fa-solid fa-magnifying-glass"
            color="primary" /> </template
      ></q-input>

      <div class="column justify-end">
        <div v-if="userLogged">
          <q-btn dense flat round icon="las la-cog" />
          <q-btn dense flat round icon="las la-user-circle" />
        </div>
        <div
          v-else
          class="row q-gutter-x-xl text-font-medium row flex-center no-wrap q-pr-lg">
          <q-btn
            class="enter-account-btn toolbar-btn toolbar-login text-uppercase"
            ref="toolbarButtonLogin"
            label="Inicia sesión!"
            unelevated />
          <q-btn
            class="enter-account-btn toolbar-btn toolbar-register justify-center"
            ref="toolbarButtonRegister"
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
    <div ref="headerBannerTitle" class="header-banner-title header-font">
      MegaIQ
    </div>
    <p class="header-text text-body1 text-font-medium header-font">
      Repasa conceptos, aprende cosas nuevas y comparte con demás estudiantes e
      instructores sobre temas académicos. MegaIQ está diseñado para
      complementar y mejorar tu aprendizaje escolar!
    </p>
    <q-toolbar class="row flex-center q-gutter-x-md">
      <q-toolbar-title>
        <q-input
          class="searchBar banner-searchBar white-border q-px-lg"
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
        class="header-banner-btn text-font-medium flex flex-center q-gutter-x-md">
        <q-btn
          class="enter-account-btn text-uppercase"
          label="Inicia sesión!"
          unelevated />
        <q-btn
          color="primary"
          label="Registrate!"
          class="enter-account-btn justify-center" />
      </div>
    </q-toolbar>
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
        <div
          class="filterContent-container full-width row flex-center q-pa-md white-border">
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
              {{ postContentFilter(post.postContent) }}
            </div>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { QBtn, QInput } from 'quasar';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    // TODO: Define variables with <>
    const mainPosts: {
      postId: number;
      postTitle: string;
      postAuthor: string;
      postAuthorPfp: string;
      // TODO: change to date
      postDate: string;
      postLikeCount: number;
      postDislikeCount: number;
      postImage: string;
      postDescription: string;
      postContent: string;
    }[] = [
      {
        postId: 1,
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: 23,
        postDislikeCount: 2,
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
      {
        postId: 1,
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: 23,
        postDislikeCount: 2,
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
      {
        postId: 1,
        postTitle: 'Cómo pasar trigo',
        postAuthor: 'Andres Walteros',
        postAuthorPfp:
          'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
        postDate: '1 month ago',
        postLikeCount: 23,
        postDislikeCount: 2,
        postImage:
          'https://i0.wp.com/lasmatesfaciles.com/wp-content/uploads/2019/10/intro-trigonometria.png?fit=840%2C473&ssl=1',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
    ];

    const postContentFilter = function (postContent: string) {
      return postContent.length > 200
        ? postContent.substring(0, 200) + '...'
        : postContent;
    };

    const headerBanner = ref();

    const headerBannerTitle = ref();

    const toolbarTitle = ref();

    const toolbarSearchBar = ref<QInput>();
    const toolbarButtonLogin = ref<QBtn>();
    const toolbarButtonRegister = ref<QBtn>();

    const headerBannerParallax = (event: MouseEvent) => {
      // TODO: Fix this sht
      let x = event.clientX / 20;
      let y = event.clientY / 20;

      headerBanner.value.style.animation = 'none';
      headerBanner.value.style.backgroundPosition = `-${x}px -${y}px`;
    };

    // TODO: Make this anim
    const headerBannerLeave = () => {
      setTimeout(() => {
        headerBanner.value.style.animation =
          'headerBannerInitialPos 2s forwards';
        // headerBanner.value.style.animation = 'headerBannerMove 2s infinite';
      }, 1000);
    };
    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          toolbarTitle.value.classList.remove('toolbar-title-enter');
          toolbarButtonLogin.value?.$el.classList.remove('toolbar-btn-enter');
          toolbarButtonRegister.value?.$el.classList.remove(
            'toolbar-btn-enter'
          );
          toolbarSearchBar.value?.$el.classList.remove(
            'toolbar-searchBar-enter'
          );
        } else {
          toolbarTitle.value.classList.add('toolbar-title-enter');
          toolbarButtonLogin.value?.$el.classList.add('toolbar-btn-enter');
          toolbarButtonRegister.value?.$el.classList.add('toolbar-btn-enter');
          toolbarSearchBar.value?.$el.classList.add('toolbar-searchBar-enter');
        }
      });

      const header = document.querySelector('.header-banner');
      observer.observe(header as Element);
    });

    const addSearchBarClass = () => {
      toolbarSearchBar.value?.$el.classList.add('toolbar-searchBar-enter');
      console.log('d');
    };

    return {
      toolbarTitle,
      toolbarSearchBar,
      toolbarButtonLogin,
      toolbarButtonRegister,
      headerBanner,
      headerBannerTitle,
      headerBannerParallax,
      headerBannerLeave,
      searchBar: ref(),
      mainPosts,
      postContentFilter,
      group: ref(['op1']),
      userLogged: false,
      addSearchBarClass,
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
    transform: translateX(-120px);
    transition: all 0.2s;
  }
  .toolbar-title-enter {
    transform: translateX(0);
  }

  .toolbar-searchBar {
    transform: translateY(-150px);
    width: 780px;
    transition: all 0.2s;
  }

  .toolbar-searchBar-enter {
    transform: translateY(0);
  }

  .toolbar-btn {
    margin-top: -150px;
  }

  .toolbar-btn-enter {
    margin-top: 0;
  }
}
.searchBar {
  background: #ffffff;
  border-radius: 50px;
}
.header-banner {
  // animation: headerBannerMove 2s infinite;
  background: url('../../../assets/red-blue-bg.png') no-repeat;
  background-size: 120%;
  height: 800px;
  margin-top: -80px;
  transition: all 0.1s;
  .header-text {
    width: 800px;
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
  border-radius: 20px;
  letter-spacing: normal;
  transition: all 0.1s;
}
.enter-account-btn:hover {
  scale: 1.2;
}

//----------------Main
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

    .post-description {
      font-size: 14px;
    }
    .post-like-count,
    .post-dislike-count {
      background: $white;
      border-radius: 6px;
      font-size: 18px;
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
  background: linear-gradient(
    133deg,
    rgba(121, 135, 203, 0.7) 0%,
    rgba(108, 135, 255, 0.7) 100%
  );
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
