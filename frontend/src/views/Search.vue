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
          @click="search"
        >Go</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';

const searches = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.searches;
});

onMounted(() => {
  const searchStore = useSearchStore();

  searchStore.loadSearches();
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
