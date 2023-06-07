import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

export const useChatGPTStore = defineStore('chat-gpt', {
  state: () => ({
    conversations: [],
    currentConversation: undefined as any | undefined,
    isLoading: false,
    isSidebarOpen: true,
  }),
  getters: {
    getConversations(state) {
      return state.conversations;
    },
    getCurrentConversation(state) {
      return state.currentConversation;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsSidebarOpen(state) {
      return state.isSidebarOpen;
    },
  },
  actions: {
    startNewConversation() {
      this.currentConversation = undefined;
    },
    loadConversations() {
      const authStore = useAuthStore();

      this.isLoading = true;
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
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async loadConversationById(conversationId: number) {
      return axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            '/chat-gpt/conversations/' +
            conversationId,
        )
        .then(async (res) => {
          this.currentConversation = res.data;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async sendMessage(message: string) {
      if (this.currentConversation) {
        this.currentConversation = {
          ...this.currentConversation,
          messages: [
            ...this.currentConversation.messages,
            { content: message, type: 'user' },
          ],
        };
        await this.continueConversation(message);
      } else {
        this.currentConversation = {
          messages: [{ content: message, type: 'user' }],
        };
        await this.createConversation(message);
      }
    },
    createConversation(message: string) {
      const authStore = useAuthStore();

      this.isLoading = true;
      return axios
        .post(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/chat-gpt',
          { content: message },
        )
        .then(async (res) => {
          this.currentConversation = res.data;

          await this.loadConversations();

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    continueConversation(message: string) {
      this.isLoading = true;
      return axios
        .patch(
          import.meta.env.VITE_BACKEND_URL +
            '/chat-gpt/conversations/' +
            this.currentConversation.id,
          { content: message },
        )
        .then(async (res) => {
          this.currentConversation = res.data;

          await this.loadConversations();

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async changeConversationName(conversationId: number, name: string) {
      return axios
        .patch(
          import.meta.env.VITE_BACKEND_URL +
            '/chat-gpt/conversations/' +
            this.currentConversation.id +
            '/name',
          { name },
        )
        .then(async (res) => {
          await this.loadConversations();

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    deleteConversationById(conversationId: number) {
      return axios
        .delete(
          import.meta.env.VITE_BACKEND_URL +
            '/chat-gpt/conversations/' +
            conversationId,
        )
        .then(async () => {
          await this.loadConversations();

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
