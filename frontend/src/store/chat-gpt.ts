import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

export const useChatGPTStore = defineStore('chat-gpt', {
  state: () => ({
    conversations: [],
    results: undefined as any | undefined,
  }),
  getters: {
    getConversations(state) {
      return state.conversations;
    },
    getResults(state) {
      return state.results;
    },
  },
  actions: {
    loadConversations() {
      const authStore = useAuthStore();

      return axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/chat-gpt',
        )
        .then((res) => {
          this.conversations = res.data;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
