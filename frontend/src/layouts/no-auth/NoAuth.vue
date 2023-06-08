<template>
  <v-app>
    <v-app-bar :flat="true">
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
        :icon="
          theme.global.name.value === 'light'
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
        @click="toggleTheme"
      ></v-btn>
    </v-app-bar>
    <no-auth-view />
  </v-app>
</template>

<script lang="ts" setup>
import NoAuthView from './View.vue';
import { computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';

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
</script>
