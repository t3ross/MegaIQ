import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ResultsLayout',
  setup() {
    const router = useRouter();
    return {
      goToHome: () => {
        router.push({ name: 'home' });
      },
      goToLogin: () => {
        router.push({ name: 'login' });
      },
      goToRegister: () => {
        router.push({ name: 'register' });
      },
    };
  },
});
