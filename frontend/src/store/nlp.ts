import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

export const useNLPStore = defineStore('mlp', {
  state: () => ({
    searches: [] as any[],
    results: undefined as any | undefined,
    currentSearchId: -1,
    currentSentence: '',
    isSidebarOpen: true,
    isLoading: false,
  }),
  getters: {
    getSearches(state) {
      return state.searches;
    },
    getResults(state) {
      return state.results;
    },
    getCurrentSearchId(state) {
      return state.currentSearchId;
    },
    getIsSidebarOpen(state) {
      return state.isSidebarOpen;
    },
    getIsLoading(state) {
      return state.isLoading;
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
          this.results = res.data.hits;
          this.currentSearchId = res.data.id;
          this.currentSentence = res.data.sentence;

          await this.loadSearches();
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async loadSearchById(searchId: number) {
      return axios
        .get(import.meta.env.VITE_BACKEND_URL + '/nlp/' + searchId)
        .then((res) => {
          this.results = res.data.hits;
          this.currentSearchId = res.data.id;
          this.currentSentence = res.data.sentence;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async deleteSearchById(searchId: number) {
      return axios
        .delete(import.meta.env.VITE_BACKEND_URL + '/nlp/' + searchId)
        .then(async () => {
          await this.loadSearches();

          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
});
