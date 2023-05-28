import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { Results, SearchResult } from '@/types/search';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searches: [] as any[],
    results: undefined as Results | undefined,
    currentSearchId: -1,
    currentSearchTerm: '',
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
    getCurrentSearchTerm(state) {
      return state.currentSearchTerm;
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

      return await axios
        .post<SearchResult>(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/searches',
          { searchTerm },
        )
        .then(async (res) => {
          this.results = res.data.results;
          this.currentSearchId = res.data.id;
          this.currentSearchTerm = res.data.searchTerm;

          await this.loadSearches();
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async loadSearchById(searchId: number) {
      return axios
        .get(import.meta.env.VITE_BACKEND_URL + '/searches/' + searchId)
        .then((res) => {
          this.results = res.data.results;
          this.currentSearchId = res.data.id;
          this.currentSearchTerm = res.data.searchTerm;

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
