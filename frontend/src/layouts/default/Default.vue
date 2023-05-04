<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-title>
        <v-icon icon="mdi-circle-slice-6" />

        Essentials Preset
      </v-app-bar-title>
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
</script>
