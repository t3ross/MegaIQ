import useAuth from 'src/modules/auth/composables/useAuth';

export default {
  name: 'auth-login',
  setup() {
    const { state } = useAuth();
    const { enterAccount } = useAuth();
    const { onReset } = useAuth();

    return {
      state,
      enterAccount,
      onReset,
    };
  },
};
