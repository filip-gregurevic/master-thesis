<template>
  <v-app>
    <v-app-bar flat>
      <v-img
        class="ml-4"
        max-height="32px"
        max-width="32px"
        src="@/assets/logo-cropped.svg"
      ></v-img>
      <v-app-bar-title>
        Filip Gregurević's Master Thesis Project
      </v-app-bar-title>
      <router-link class="mr-4" to="search">Search</router-link>
      <router-link v-if="authUser && authUser.role === 'admin'" to="users"
        >User Management</router-link
      >
      <v-spacer />
      <v-btn
        @click="toggleTheme"
        :icon="
          theme.global.name.value === 'light'
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
      ></v-btn>
      <v-btn v-if="authUser" id="menu-activator">{{ authUser.email }}</v-btn>
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item prepend-icon="mdi-account-circle" to="/profile"
            >Profile</v-list-item
          >
          <v-list-item prepend-icon="mdi-logout" @click="logout"
            >Logout</v-list-item
          >
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

function logout() {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  authStore.logout().then(() => {
    alertStore.initSuccess('Successfully logged out!');
  });
}
</script>
