<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-title>
        <v-icon icon="mdi-circle-slice-6" />

        Filip Gregurević's Master Thesis Project
      </v-app-bar-title>
      <router-link
        class="mr-4"
        to="search"
      >Search</router-link>
      <router-link
        v-if="authUser && authUser.role === 'admin'"
        to="users"
      >User Management</router-link>
      <v-spacer />
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultView from './View.vue'
  import { useAuthStore } from "@/store/auth";
  import { computed } from 'vue';

  const authUser = computed(() => {
    const authStore = useAuthStore();

    return authStore.user;
  });

  function logout () {
    const authStore = useAuthStore();

    authStore.logout();
  }
</script>
