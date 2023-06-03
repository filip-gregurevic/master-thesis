<template>
  <v-navigation-drawer :permanent="true">
    <v-list lines="three">
      <v-list-subheader class="text-h5">My Searches</v-list-subheader>
      <template
        v-for="search in searches"
        :key="search.id"
      >
        <v-list-item
          :subtitle="`${search.sentence}`"
          :active="search.id === searchId"
          color="secondary"
          @click.prevent="loadSearch(search.id)"
        >
          <template v-slot:append>
            <v-btn color="error" icon="mdi-close" variant="text" @click.prevent.stop="deleteSearch(search.id)"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-form @submit.prevent="search">
      <v-row align-content="center" justify="center">
        <v-col cols="10" lg="8" md="8">
          <v-textarea
            v-model="sentence"
            placeholder="Write a full sentence"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col cols="1">
          <v-btn :block="true" :disabled="!sentence" color="primary" type="submit"
          >Go
          </v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-list v-if="results" :lines="false">
      <v-list-item v-for="result in results" :key="result.id">
        <template v-slot:title="{ title }">
          <div v-html="`${result._source.ID} - ${result._source.name}`"></div>
          <div class="text-primary">{{ Math.floor(result._score * 100) }}% match</div>
        </template>
        <template v-slot:subtitle="{ subtitle }">
          <div v-html="markdownToHtml(result._source.description)"></div>
        </template>
        <template v-slot:append>
          <v-btn
            :href="result._source.url"
            color="primary"
            icon="mdi-open-in-new"
            target="_blank"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useNLPStore } from "@/store/nlp";
import { useAlertStore } from "@/store/alert";
import { marked } from "marked";
import { useSearchStore } from "@/store/search";

// load search history when component is loaded
onMounted(() => {
  const nlpStore = useNLPStore();

  nlpStore.loadSearches();
});

const searches = computed(() => {
  const nlpStore = useNLPStore();

  return nlpStore.getSearches;
});

const results = computed(() => {
  const nlpStore = useNLPStore();

  return nlpStore.getResults;
});

const searchId = computed(() => {
  const nlpStore = useNLPStore();

  return nlpStore.getCurrentSearchId;
});

const sentence = ref("");

function markdownToHtml(markdown: string) {
  // TODO: resolve console warnings
  return marked(markdown);
}

function search() {
  const nlpStore = useNLPStore();
  const alertStore = useAlertStore();

  nlpStore.search(sentence.value).catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}

function loadSearch(searchId: number) {
  const nlpStore = useNLPStore();
  const alertStore = useAlertStore();

  nlpStore
  .loadSearchById(searchId)
  .then((search) => {
    sentence.value = search.sentence;
  })
  .catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}

function deleteSearch(searchId: number) {
  const nlpStore = useNLPStore();
  const alertStore = useAlertStore();

  nlpStore
  .deleteSearchById(searchId)
  .then(() => {
    alertStore.initSuccess('Successfully deleted search');
  })
  .catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}
</script>
