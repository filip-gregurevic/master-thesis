<template>
  <v-navigation-drawer :permanent="true">
    <v-list>
      <v-list-subheader class="text-h5">My Searches</v-list-subheader>
      <v-list-item
        v-for="search in searches"
        :key="search.id"
        :title="`${search.searchTerm}`"
        :subtitle="`${search.results} results`"
        color="secondary"
      >
        <template v-slot:append>
          <v-btn
            color="error"
            icon="mdi-close"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-form @submit.prevent="search">
    <v-row justify="center" align-content="center">
      <v-col cols="10" md="8" lg="8">
        <v-text-field
          variant="outlined"
          placeholder="Write a full sentence"
          v-model="sentence"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          type="submit"
          :block="true"
          color="primary"
          :disabled="!sentence"
        >Go</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>


<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useNLPStore } from '@/store/nlp';
import { useAlertStore } from "@/store/alert";

// load search history when component is loaded
onMounted(() => {
  const nlpStore = useNLPStore();

  nlpStore.loadSearches();
});

const searches = computed(() => {
  const nlpStore = useNLPStore();

  return nlpStore.getSearches;
});

const sentence = ref('');

function search() {
  const nlpStore = useNLPStore();
  const alertStore = useAlertStore();

  nlpStore.search(sentence.value).catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}
</script>
