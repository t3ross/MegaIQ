import { Notify } from 'quasar';
import { ref } from 'vue';

const useAuth = () => {
  const state = ref({
    username: '',
    email: '',
    password: {
      password: '',
      confirm: '',
    },
    accept: false,
  });

  const enterAccount = () => {
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
        message: 'Accediendo a cuenta',
      });
    }
  };

  const createAccount = () => {
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Creando cuenta',
    });
  };

  const onReset = () => {
    state.value.username = '';
    state.value.email = '';
    state.value.accept = false;
  };

  return {
    state,
    enterAccount,
    createAccount,
    onReset,
  };
};

export default useAuth;
