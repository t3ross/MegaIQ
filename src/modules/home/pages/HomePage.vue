<template>
  <!-- ----------Header---------- -->

  <q-header class="bg-blur">
    <q-toolbar class="bg-blur">
      <q-toolbar-title> MegaIQ </q-toolbar-title>
      <q-btn dense flat round icon="las la-cog" />
      <q-btn dense flat round icon="las la-user-circle" />
    </q-toolbar>
  </q-header>

  <div class="text-h2 main-font header-banner flex flex-center text-white">
    MegaIQ
  </div>

  <!-- ----------Main---------- -->

  <div class="layout-container flex justify-center q-pt-md">
    <q-layout view="hHh lpr fFf" class="layout-content flex align-center">
      <!-- ----Left drawer---- -->

      <q-drawer
        side="left"
        :width="250"
        :breakpoint="500"
        content-style="laterals"
        show-if-above>
        <div class="laterals left-lateral">
          <p
            class="q-px-md q-pt-md q-mb-none text-h5 text-white text-weight-regular">
            Filtrar resultados
          </p>

          <!-- Type checkboxes -->

          <div class="q-pa-md">
            <p class="q-mb-xs text-subtitle1 text-white text-weight-regular">
              Tipo
            </p>

            <q-option-group
              v-model="group"
              :options="filterType"
              color="indigo-4"
              type="checkbox"
              class="filter-checkboxes q-ml-auto q-mr-md" />

            <!-- Features Checkboxes -->

            <p
              class="q-pt-lg q-mb-xs text-subtitle1 text-white text-weight-regular">
              Características
            </p>
            <q-option-group
              v-model="group"
              :options="filterFeatures"
              color="indigo-4"
              type="checkbox"
              class="filter-checkboxes q-ml-auto q-mr-md" />

            <!-- Subjects checkboxes -->

            <p
              class="q-pt-lg q-mb-xs text-subtitle1 text-white text-weight-regular">
              Asignaturas
            </p>
            <q-option-group
              v-model="group"
              :options="filterSubjects"
              color="indigo-4"
              type="checkbox"
              class="filter-checkboxes q-ml-auto q-mr-md" />
          </div>
        </div>
      </q-drawer>

      <!-- ----Right drawer---- -->

      <q-drawer
        side="right"
        :width="250"
        :breakpoint="500"
        content-style="laterals"
        show-if-above>
        <div class="laterals right-lateral q-pa-md">
          <p class="text-h5 text-white text-weight-regular">Amigos</p>

          <q-list class="friend-list">
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
      </q-drawer>

      <!-- ----Main content---- -->

      <q-page-container class="main full-height">
        <div class="main-container">
          <div
            class="main-post q-pa-md border"
            v-for="post in mainPosts"
            :key="post.postId">
            <div class="post-header"></div>
            <q-toolbar class="post-title text-h5 q-px-none">
              <q-toolbar-title class="column justify-between">
                <div class="q-pt-sm">
                  {{ post.postTitle }} -
                  <span class="post-author vertical-middle text-subtitle1">
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

              <div class="post- flex q-gutter-md">
                <div class="post-like-count column flex-center">
                  <q-btn
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart fa-lg"
                    size="20px"
                    class="text-indigo-2" />
                  {{ post.postLikeCount }}
                </div>
                <div class="post-dislike-count column flex-center">
                  <q-btn
                    dense
                    flat
                    round
                    icon="fa-solid fa-heart-crack fa-lg"
                    size="20px"
                    class="text-indigo-2" />
                  {{ post.postDislikeCount }}
                </div>
              </div>
            </q-toolbar>

            <q-separator spaced />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    return {
      group: ref(['op1']),

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

      filterFeatures: [
        {
          label: 'Más recientes',
          value: 'mostRecent',
        },
        {
          label: 'Mejor votados',
          value: 'bestVoted',
        },
        {
          label: 'Más comentados',
          value: 'mostCommented',
        },
        {
          label: 'Más antiguos',
          value: 'older',
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
      friendsList: [
        {
          name: 'Michael',
          pfp: 'https://cdn.quasar.dev/img/boy-avatar.png',
          id: '1',
          status: 'active',
          lastMsg: 'Brooo',
          msgSeen: true,
          lastMsgDate: '12:30',
        },
        {
          name: 'Andrés Walteros',
          pfp: 'https://i.pinimg.com/736x/2d/ef/82/2def8264083dab1a4788e0d0e3b47c8d.jpg',
          id: '2',
          status: 'active',
          lastMsg: 'Holaa',
          msgSeen: false,
          lastMsgDate: '',
        },
        {
          name: 'Valen',
          pfp: 'https://i.redd.it/ij5qucry9mk81.jpg',
          id: '3',
          status: 'inactive',
          lastMsg: 'Suba al gato',
          msgSeen: true,
          lastMsgDate: '',
        },
      ],
      mainPosts: [
        {
          postId: '1',
          postTitle: 'Cómo pasar trigo',
          postImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Trigonometria_02.svg/1200px-Trigonometria_02.svg.png',
          postDescription:
            'Guía básica para entender los conceptos principales de trigonometría.',
          postAuthor: 'Andres Walteros',
          postAuthorPfp:
            'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg',
          postDate: '1 month ago',
          postLikeCount: '23',
          postDislikeCount: '2',
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
//----------------Header
.bg-blur {
  backdrop-filter: blur(15px);
  background-color: rgba($primary, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.header-banner {
  background-image: linear-gradient(
      180deg,
      rgba(31, 50, 219, 0.747) 10%,
      rgba(0, 212, 255, 0) 100%
    ),
    url('https://4.bp.blogspot.com/-u7xOINjjawk/XHKV0l9lc8I/AAAAAAAAC0Y/RR3HQuyUIjsPqkPhwPTnGfA1f582YPvlgCKgBGAs/w0/blue-red-smoke-abstract-4k-53.jpg');
  background-size: cover;
  height: 70vh;
  margin-top: -50px;
}

//----------------Main
.layout-content {
  max-width: 1600px;
}

//----Laterals
.laterals {
  background: linear-gradient(
    133deg,
    rgba(121, 135, 203, 0.7) 0%,
    rgba(52, 88, 255, 0.7) 100%
  );
  width: 100%;
}

//Left-lateral
.left-lateral {
  border-radius: 0 8px 8px 0;
}
.filter-checkboxes {
  background-color: $white-blue;
  border-radius: 8px;
  padding: 8px 0;
}
.filter-checkboxes:last-child {
  margin-bottom: 12px;
}

//Right-lateral
.right-lateral {
  border-radius: 8px 0 0 8px;
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

//-----Main

.main {
  padding: 16px !important;
  margin: 0 266px;
  border: 1px solid $white;
  border-radius: 8px;
  width: 90%;
}

//-----Posts

.post-author {
}
.post-description {
  font-size: 14px;
}
.post-like-count,
.post-dislike-count {
  font-size: 18px;
  background: $white;
  border-radius: 6px;
}
.main-post {
  border: 1px solid $light-grey;
  border-radius: 8px;
}
</style>
