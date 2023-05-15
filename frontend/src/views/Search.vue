<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-subheader>Search History</v-list-subheader>
      <v-list-item
        v-for="search in searches"
        :key="search.id"
      >
        <v-list-item-title>{{ search }}</v-list-item-title>
        <template v-slot:append>
          <v-btn
            color="danger"
            icon="mdi-close"
            variant="text"
            @click.prevent="deleteSearch(search.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="10" md="8" lg="6">
        <v-text-field
          variant="outlined"
          placeholder="Search..."
          v-model="searchTerm"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn
          block
          color="primary"
          :disabled="!searchTerm"
          @click="search"
        >Go</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="12">
        <v-list>
          <v-list-subheader>Results:</v-list-subheader>
          <v-list-group value="ATT3CK">
            <v-list-item></v-list-item>
          </v-list-group>
          <v-list-group value="D3FEND">
            <v-list-item></v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="12" lg="6">
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <v-switch label="Include ATT4CK"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="6">
            <v-switch label="Include Groups"></v-switch>
          </v-col>
          <v-col cols="6">
            <v-switch label="Include Software"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="6">
            <v-switch label="Include Techniques"></v-switch>
          </v-col>
          <v-col cols="6">
            <v-switch label="Include Mitigations"></v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <v-switch label="Include D3FEND"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch label="Include Artifacts"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Tactics"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Techniques"></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';

// load search history when component is loaded
onMounted(() => {
  const searchStore = useSearchStore();

  searchStore.loadSearches();
});

const searches = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.searches;
});

const results = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.results;
});

const searchTerm = ref('');

function search() {
  const searchStore = useSearchStore();

  searchStore.search(searchTerm.value);
}

function deleteSearch(searchId: number) {
  const searchStore = useSearchStore();

  searchStore.deleteSearchById(searchId);
}
</script>
