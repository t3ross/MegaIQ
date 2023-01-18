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
    friendsList: {
      type: Array,
      required: false,
      default: null,
    },
  },

  setup() {
    // TODO: Define variables with <>
    const router = useRouter();
    const headerBanner = ref();
    const headerBannerTitle = ref();
    const toolbarTitle = ref();
    const toolbarSearchBar = ref();
    const toolbarButtonLogin = ref<QBtn>();
    const toolbarButtonRegister = ref<QBtn>();
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

    const headerBannerParallax = (event: MouseEvent) => {
      // TODO: Fix this sht
      const x = event.clientX / 20;
      const y = event.clientY / 20;

      headerBanner.value.style.animation = 'none';
      headerBanner.value.style.backgroundPosition = `-${x}px -${y}px`;
    };
    const postContentFilter = function (postContent: string) {
      return postContent.length > 300
        ? postContent.substring(0, 300) + '...'
        : postContent;
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
          toolbarSearchBar.value.classList.remove('toolbar-searchBar-enter');
        } else {
          toolbarTitle.value.classList.add('toolbar-title-enter');
          toolbarButtonLogin.value?.$el.classList.add('toolbar-btn-enter');
          toolbarButtonRegister.value?.$el.classList.add('toolbar-btn-enter');
          toolbarSearchBar.value.classList.add('toolbar-searchBar-enter');

          // toolbarSearchBar.value.classList.remove('toolbar-searchBar');
          // toolbarSearchBar.value?.$el.classList.remove('toolbar-searchBar');
        }
      });

      // const header = document.querySelector('.header-banner');
      // observer.observe(header as Element);
      const header = document.querySelector('.header-banner-toolbar');
      observer.observe(header as Element);
    });

    return {
      mainPosts,
      toolbarTitle,
      toolbarSearchBar,
      toolbarButtonLogin,
      toolbarButtonRegister,
      headerBanner,
      headerBannerTitle,
      headerBannerParallax,
      headerBannerLeave,
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
      goToLogin: () => {
        router.push({ name: 'login' });
      },
      goToRegister: () => {
        router.push({ name: 'register' });
      },
    };
  },
});
