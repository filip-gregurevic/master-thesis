<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-title>
        <v-icon icon="mdi-circle-slice-6" />

        Filip Gregurević's Master Thesis Project
      </v-app-bar-title>
      <router-link to="users">User Management</router-link>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultView from './View.vue'
  import { useAuthStore } from "@/store/auth";

  function logout () {
    const authStore = useAuthStore();

    authStore.logout();
  }
</script>
