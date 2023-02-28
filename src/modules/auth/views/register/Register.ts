import useAuth from 'src/modules/auth/composables/useAuth';

import { ref } from 'vue';

export default {
  name: 'auth-register',
  setup() {
    const { state } = useAuth();
    const { createAccount } = useAuth();
    const { onReset } = useAuth();

    return {
      state,
      createAccount,
      onReset,
      letterNumber: ref('(?=[A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]'),
      isPwd1: ref(true),
      isPwd2: ref(true),
    };
  },
};
