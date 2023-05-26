import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searches: [],
    results: [],
  }),
  getters: {
    getSearches(state) {
      return state.searches;
    },
  },
  actions: {
    loadSearches() {
      const authStore = useAuthStore();

      return axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/searches',
        )
        .then((res) => {
          this.searches = res.data;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async search(searchTerm: string) {
      const authStore = useAuthStore();

      const res = await axios
        .post(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/searches',
          { searchTerm },
        )
        .then(async (res) => {
          this.results = res.data;

          await this.loadSearches();
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async deleteSearchById(searchId: number) {
      return axios
        .delete(import.meta.env.VITE_BACKEND_URL + '/searches/' + searchId)
        .then(async () => {
          await this.loadSearches();

          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
