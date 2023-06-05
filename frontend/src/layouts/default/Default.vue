<template>
  <v-app>
    <v-app-bar>
      <v-btn icon="mdi-menu" variant="text" @click="toggleSidebar">
        <v-tooltip activator="parent" location="bottom"
          >Toggle Side Bar
        </v-tooltip>
      </v-btn>
      <v-img
        class="ml-4"
        max-height="32px"
        max-width="32px"
        src="@/assets/logo-cropped.svg"
      ></v-img>
      <v-app-bar-title>
        Filip Gregurević's Master Thesis Project
      </v-app-bar-title>
      <v-btn class="mr-4" color="primary" to="search"> Search</v-btn>
      <v-btn class="mr-4" color="primary" to="nlp"> NLP</v-btn>
      <v-btn class="mr-4" color="primary" to="chat-gpt"> ChatGPT</v-btn>
      <v-btn
        v-if="authUser && authUser.role === 'admin'"
        color="primary"
        to="users"
      >
        User Management
      </v-btn>
      <v-spacer />
      <v-btn
        :icon="
          theme.global.name.value === 'light'
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
        @click="toggleTheme"
      ></v-btn>
      <v-btn v-if="authUser" id="menu-activator">{{ authUser.email }}</v-btn>
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item prepend-icon="mdi-account-circle" to="/profile"
            >Profile
          </v-list-item>
          <v-list-item prepend-icon="mdi-logout" @click="logout"
            >Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue';
import { useAuthStore } from '@/store/auth';
import { useTheme } from 'vuetify';
import { computed } from 'vue';
import { useAlertStore } from '@/store/alert';
import { useSearchStore } from '@/store/search';
import { useNLPStore } from '@/store/nlp';
import { useChatGPTStore } from '@/store/chat-gpt';

const authUser = computed(() => {
  const authStore = useAuthStore();

  return authStore.user;
});

const theme = computed(() => {
  return useTheme();
});

function toggleTheme() {
  theme.value.global.name.value = theme.value.global.current.value.dark
    ? 'light'
    : 'dark';
}

function toggleSidebar() {
  const searchStore = useSearchStore();
  const nlpStore = useNLPStore();
  const chatGPTStore = useChatGPTStore();

  searchStore.toggleSidebar();
  nlpStore.toggleSidebar();
  chatGPTStore.toggleSidebar();
}

function logout() {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  authStore.logout().then(() => {
    alertStore.initSuccess('Successfully logged out!');
  });
}
</script>
