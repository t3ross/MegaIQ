import { QBtn } from 'quasar';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  props: {
    // mainPosts: {
    //   type: Array,
    //   required: false,
    //   default: null,
    // },
    // friendsList: {
    //   type: Array,
    //   required: false,
    //   default: null,
    // },
  },

  setup() {
    // TODO: Define variables with <>
    const router = useRouter();
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
        postTitle: 'Curso de Vue',
        postAuthor: 'Sebastián López',
        postAuthorPfp:
          'https://i1.sndcdn.com/avatars-000632823915-wppxj4-t240x240.jpg',
        postDate: '1 month ago',
        postLikeCount: 52,
        postDislikeCount: 7,
        postImage:
          'https://cms.rootstack.com/sites/default/files/inline-images/01-vuejs.jpg',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
      {
        postId: 1,
        postTitle: 'Dibujar en Photoshop',
        postAuthor: 'Juan Hernandez',
        postAuthorPfp:
          'https://i1.sndcdn.com/avatars-000216806460-o9nr4k-t240x240.jpg',
        postDate: '1 month ago',
        postLikeCount: 21,
        postDislikeCount: 10,
        postImage:
          'https://www.saberprogramas.com/wp-content/uploads/2017/10/35-Miniatura-Pasar-foto-a-dibujo.jpg',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
      {
        postId: 1,
        postTitle: 'Modificar plantillas de SENA',
        postAuthor: 'Andres Walteros',
        postAuthorPfp: 'https://i.ytimg.com/vi/mwK2IslAQIo/maxresdefault.jpg',
        postDate: '1 month ago',
        postLikeCount: 100,
        postDislikeCount: 22,
        postImage:
          'https://www.uniboyaca.edu.co/sites/default/files/2023-02/sena.jpg',
        postDescription:
          'Guía básica para entender los conceptos principales de trigonometría.',
        postContent:
          'Anim mollit proident deserunt est excepteur reprehenderit eu cupidatat id cupidatat. Voluptate dolore tempor laboris nostrud proident quis Lorem eiusmod. Duis veniam proident velit cillum ut irure velit excepteur do ipsum. Sint consectetur tempor eiusmod deserunt laboris. In consectetur Lorem nulla culpa. Est dolore cupidatat aute eiusmod in consectetur incididunt fugiat est nulla ea adipisicing.',
      },
    ];
    const friendsList: {
      friendId: number;
      friendName: string;
      friendStatus: string;
      friendPFP: string;
      // TODO: change to date
      friendLastMsg: string;
      friendMsgSeen: boolean;
    }[] = [
      // {
      //   friendId: 0,
      //   friendName: 'string',
      //   friendStatus: 'online',
      //   friendPFP: '',
      //   friendLastMsg: 'string',
      //   friendMsgSeen: true,
      // },
      // {
      //   friendId: 1,
      //   friendName: 'btic',
      //   friendStatus: 'online',
      //   friendPFP: '',
      //   friendLastMsg: 'string',
      //   friendMsgSeen: false,
      // },
    ];
    const postContentFilter = function (postContent: string) {
      return postContent.length > 300
        ? postContent.substring(0, 300) + '...'
        : postContent;
    };

    return {
      mainPosts,
      friendsList,
      searchBar: ref(),
      postContentFilter,
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
      goToHome: () => {
        router.push({ name: 'home' });
      },
      // goToLogin: () => {
      //   router.push({ name: 'login' });
      // },
      // goToRegister: () => {
      //   router.push({ name: 'register' });
      // },
      // goToServices: () => {
      //   router.push({ name: 'services' });
      // },
    };
  },
});
