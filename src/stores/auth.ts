import { defineStore } from 'pinia';
import authApi from 'src/api/authApi';

const useCounterStore = defineStore('auth', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    createUser: async (user: {
      username: string;
      email: string;
      password: string;

      accept: boolean;
    }) => {
      const { username, email, password } = user;
      console.log(username);

      try {
        const { data } = await authApi.post(':signUp', {
          email,
          password,

          returnSecureToken: true,
        });
        console.log(data);

        return { ok: true };
      } catch (error: unknown) {
        console.log(error);
        return { ok: false, message: '....' };
      }
    },
  },
});

export default useCounterStore;
