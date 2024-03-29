<template>
  <v-app>
    <v-app-bar>
      <v-tooltip location="bottom" text="Toggle Side Bar">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-menu"
            v-bind="props"
            variant="text"
            @click="toggleSidebar"
          ></v-btn>
        </template>
      </v-tooltip>
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
import { computed, onMounted } from 'vue';
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

onMounted(() => {
  const storedTheme = localStorage.getItem('darkTheme');
  if (storedTheme) {
    if (storedTheme === 'dark') {
      theme.value.global.name.value = 'dark';
    } else {
      theme.value.global.name.value = 'light';
    }
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    theme.value.global.name.value = 'dark';
    localStorage.setItem('darkTheme', 'dark');
  }
});

function toggleTheme() {
  theme.value.global.name.value = theme.value.global.current.value.dark
    ? 'light'
    : 'dark';
  localStorage.setItem('darkTheme', theme.value.global.name.value);
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
