import { Notify } from 'quasar';
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';

const useAuth = () => {
  const authStore = useAuthStore();

  const createUser = async (user: {
    username: string;
    email: string;
    password: string;
    accept: boolean;
  }) => {
    if (user.accept !== true) {
      Notify.create({
        color: 'orange-6',
        textColor: 'white',
        icon: 'warning',
        message: 'Necesitas aceptar los términos y condiciones primero',
      });
    } else {
      const resp = await authStore.createUser(user);
      return resp;
    }
  };

  const loginUser = async (user: {
    username: string;
    email: string;
    password: string;
    accept: boolean;
  }) => {
    const resp = await authStore.signInUser(user);
    return resp;
  };

  // };

  return {
    authStore,
    createUser,
    loginUser,
    isPwd: ref(true),
  };
};

export default useAuth;
