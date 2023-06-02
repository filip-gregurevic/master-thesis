import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import { SearchResult } from '@/types/search';

export const useNLPStore = defineStore('mlp', {
  state: () => ({
    searches: [] as any[],
    results: undefined as any | undefined,
    currentSearchId: -1,
    currentSentence: '',
  }),
  getters: {
    getSearches(state) {
      return state.searches;
    },
    getResults(state) {
      return state.results;
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
            '/nlp',
        )
        .then((res) => {
          this.searches = res.data;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async search(sentence: string) {
      const authStore = useAuthStore();

      return await axios
        .post<any>(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/nlp',
          { sentence },
        )
        .then(async (res) => {
          this.results = res.data.results;
          this.currentSearchId = res.data.id;
          this.currentSentence = res.data.sentence;

          await this.loadSearches();
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
