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
      <v-spacer />
      <v-btn
        @click="toggleTheme"
        :icon="
          theme.global.name.value === 'light'
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
      ></v-btn>
    </v-app-bar>
    <no-auth-view />
  </v-app>
</template>

<script lang="ts" setup>
import NoAuthView from './View.vue';
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = computed(() => {
  return useTheme();
});

function toggleTheme() {
  theme.value.global.name.value = theme.value.global.current.value.dark
    ? 'light'
    : 'dark';
}
</script>
