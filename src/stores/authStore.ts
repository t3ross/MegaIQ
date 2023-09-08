import { defineStore } from 'pinia';
import authApi from 'src/api/authApi';

interface AuthState {
  status: string;
  username: object;
  idToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore('Auth', {
  state: (): AuthState => ({
    status: 'authenticating',
    username: {},
    idToken: '',
    refreshToken: '',
  }),

  getters: {
    currentState(): string {
      return this.status;
    },
  },
  actions: {
    // Actions
    // Mutations
    async createUser(user: {
      username: string;
      email: string;
      password?: string;
      accept: boolean;
    }) {
      const { username, email, password } = user;

      try {
        const { data } = await authApi.post(':signUp', {
          email,
          password,
          returnSecureToken: true,
        });
        const { idToken, refreshToken } = data;

        await authApi.post(':update', {
          displayName: username,
          idToken,
        });

        delete user.password;
        this.loginUser(user, idToken, refreshToken);

        return { ok: true };
      } catch (error: any) {
        return { ok: false, message: error.response.data.error.message };
      }
    },

    async signInUser(user: {
      username: string;
      email: string;
      password: string;
    }) {
      const { email, password } = user;

      try {
        const { data } = await authApi.post(':signInWithPassword', {
          email,
          password,
          returnSecureToken: true,
        });

        const { displayName, idToken, refreshToken } = data;
        user.username = displayName;

        this.loginUser(user, idToken, refreshToken);

        return { ok: true };
      } catch (error: any) {
        return { ok: false, message: error.response.data.error.message };
      }
    },

    async checkAuthentication() {
      const idToken = localStorage.getItem('idToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!idToken) {
        this.logout;
        return { ok: false, message: 'No hay token' };
      }

      try {
        const { data } = await authApi.post(':lookup', { idToken });
        const { displayName, email } = data.users[0];

        const user = {
          name: displayName,
          email,
        };

        this.loginUser(user, idToken, refreshToken as string);

        return { ok: true };
      } catch (error: any) {
        this.logout;
        return { ok: false, message: error.response.data.error.message };
      }
    },

    //Mutations

    loginUser(username: object, idToken: string, refreshToken: string) {
      if (idToken) {
        localStorage.setItem('idToken', idToken);
        this.idToken = idToken;
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        this.refreshToken = refreshToken;
      }
      this.username = username;
      this.status = 'authenticated';
    },
    logout() {
      this.username = {};
      this.idToken = '';
      this.refreshToken = '';
      this.status = 'not-authenticated';

      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    },
  },
});
