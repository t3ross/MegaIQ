import { Notify } from 'quasar';
import { ref } from 'vue';
import useAuthStore from 'src/stores/auth';

const useAuth = () => {
  const state = ref({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    accept: false,
  });

  const authStore = useAuthStore();

  const createUser = async (user: {
    username: string;
    email: string;
    password: string;
    accept: boolean;
  }) => {
    if (state.value.accept !== true) {
      Notify.create({
        color: 'orange-6',
        textColor: 'white',
        icon: 'warning',
        message: 'Necesitas aceptar los términos y condiciones primero',
      });
    } else {
      Notify.create({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Creando cuenta',
      });
      const resp = await authStore.createUser(user);
      return resp;
    }
  };

  const enterUser = () => {
    Notify.create({
      color: 'primary',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Accediendo a cuenta',
    });
  };

  // const createAccount = () => {
  if (state.value.accept !== true) {
    Notify.create({
      color: 'orange-6',
      textColor: 'white',
      icon: 'warning',
      message: 'Necesitas aceptar los términos y condiciones primero',
    });
  } else {
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Creando cuenta',
    });
  }
  // };

  const onReset = () => {
    state.value.username = '';
    state.value.email = '';
    state.value.password = '';
    state.value.passwordConfirm = '';
    state.value.accept = false;
  };

  return {
    state,
    enterUser,
    createUser,
    isPwd: ref(true),
    onReset,
  };
};

export default useAuth;
