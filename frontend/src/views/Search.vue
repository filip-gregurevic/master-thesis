<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-subheader class="text-h5">My Searches</v-list-subheader>
      <v-list-item
        v-for="search in searches"
        :key="search.id"
        :title="`${search.searchTerm}`"
        :subtitle="`${search.results.total} results`"
        :active="search.id === searchId"
        active-color="secondary"
        @click.prevent="loadSearch(search.id)"
      >
        <template v-slot:append>
          <v-btn
            color="error"
            icon="mdi-close"
            variant="text"
            @click.prevent.stop="deleteSearch(search.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-row justify="center" align-content="center" class="mb-4">
      <v-col cols="auto"
        ><v-img
          height="64px"
          width="64px"
          src="@/assets/logo-cropped.svg"
        ></v-img
      ></v-col>
      <v-col cols="auto"
        ><h1 class="text-h3">Search MITRE ATT4CK & D3FEND</h1></v-col
      >
    </v-row>
    <v-form @submit.prevent="search">
      <v-row justify="center" align-content="center">
        <v-col cols="10" md="8" lg="8">
          <v-text-field
            variant="outlined"
            placeholder="Search..."
            v-model="searchTerm"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn type="submit" block color="primary" :disabled="!searchTerm"
            >Go</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row
      v-if="results && results.total === 0"
      justify="center"
      align-content="center"
      dense
      class="context"
    >
      <v-col cols="auto">
        <h2 class="text-h4">
          There are no results matching "{{ searchTerm }}"
        </h2>
      </v-col>
    </v-row>
    <v-row
      v-if="results && results.total > 0"
      justify="center"
      align-content="center"
      dense
      class="context"
    >
      <v-col cols="12" class="py-0">
        <h2 class="text-h4">{{ results.total }} Results</h2>
      </v-col>
      <v-col cols="12">
        <v-list v-if="results.attack && results.attack.total > 0" class="pt-0">
          <v-list-subheader
            ><h3 class="text-h5">
              ATT4CK: {{ results.attack.total }}
            </h3></v-list-subheader
          >
          <v-list
            v-if="results.attack.campaigns && results.attack.campaigns.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Campaigns: {{ results.attack.campaignsTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="campaign in results.attack.campaigns"
              :key="(campaign as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(campaign as any).mitreId} - ${(campaign as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div
                  v-html="markdownToHtml((campaign as any).description)"
                ></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(campaign as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list
            v-if="
              results.attack.dataSources && results.attack.dataSources.length
            "
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">Data Sources:</h4></v-list-subheader
            >
            <v-list-item
              v-for="dataSource in results.attack.dataSources"
              :key="(dataSource as any).id"
            >
              {{ dataSource }}
            </v-list-item>
          </v-list>
          <v-list
            v-if="results.attack.groups && results.attack.groups.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Groups: {{ results.attack.groupsTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="group in results.attack.groups"
              :key="(group as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(group as any).mitreId} - ${(group as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml((group as any).description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(group as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list
            v-if="
              results.attack.mitigations && results.attack.mitigations.length
            "
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Mitigations: {{ results.attack.mitigationsTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="mitigation in results.attack.mitigations"
              :key="(mitigation as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="
                    highLight(`${(mitigation as any).mitreId} - ${(mitigation as any).name}`)
                  "
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div
                  v-html="markdownToHtml((mitigation as any).description)"
                ></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(mitigation as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list
            v-if="results.attack.software && results.attack.software.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Software: {{ results.attack.softwareTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="sw in results.attack.software"
              :key="(sw as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(sw as any).mitreId} - ${(sw as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml((sw as any).description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(sw as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list
            v-if="results.attack.tactics && results.attack.tactics.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Tactics: {{ results.attack.tacticsTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="tactic in results.attack.tactics"
              :key="(tactic as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(tactic as any).mitreId} - ${(tactic as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml((tactic as any).description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(tactic as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list
            v-if="results.attack.techniques && results.attack.techniques.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Techniques: {{ results.attack.techniquesTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="technique in results.attack.techniques"
              :key="(technique as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(technique as any).mitreId} - ${(technique as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div
                  v-html="markdownToHtml((technique as any).description)"
                ></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="(technique as any).link"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-list>
        <v-list v-if="results.defend && results.defend.total > 0" class="pt-0">
          <v-list-subheader
            ><h3 class="text-h5">
              D3FEND: {{ results.defend.total }}
            </h3></v-list-subheader
          >
          <v-list
            v-if="results.defend.techniques && results.defend.techniques.length"
            :lines="false"
            class="pt-0"
          >
            <v-list-subheader
              ><h4 class="text-h6">
                Techniques: {{ results.defend.techniquesTotal }}
              </h4></v-list-subheader
            >
            <v-list-item
              v-for="technique in results.defend.techniques"
              :key="(technique as any).id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${(technique as any).mitreId} - ${(technique as any).name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div
                  v-html="markdownToHtml((technique as any).definition)"
                ></div>
              </template>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-open-in-new"
                  variant="text"
                  :href="`https://d3fend.mitre.org/technique/d3f:${(technique as any).name.replace(/\s+/g, '')}`"
                  target="_blank"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-list>
      </v-col>
    </v-row>
    <!-- TODO: add search config later if wanted
    <v-row justify="center" align-content="center">
      <v-col cols="12" lg="6">
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <v-switch label="Include ATT4CK" v-model="searchAttack"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch
              label="Include Groups"
              v-model="searchAttackGroups"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include Software"
              v-model="searchAttackSoftware"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include Techniques"
              v-model="searchAttackTechniques"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch
              label="Include Mitigations"
              v-model="searchAttackMitigations"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include Campaigns"
              v-model="searchAttackCampaigns"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include DataSources"
              v-model="searchAttackDataSources"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <v-switch label="Include D3FEND" v-model="searchDefend"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch
              label="Include Artifacts"
              v-model="searchDefendArtifacts"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include Tactics"
              v-model="searchDefendTactics"
            ></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch
              label="Include Techniques"
              v-model="searchDefendTechniques"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    -->
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';
import { useAlertStore } from '@/store/alert';
import { marked } from 'marked';

// load search history when component is loaded
onMounted(() => {
  const searchStore = useSearchStore();

  searchStore.loadSearches();
});

const searches = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.getSearches;
});

const results = computed(() => {
  const searchStore = useSearchStore();
  return searchStore.getResults;
});

const searchId = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.getCurrentSearchId;
});

const activeSearchTerm = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.getCurrentSearchTerm;
});

const searchTerm = ref('');

const searchAttack = ref(true);
const searchDefend = ref(true);
const searchAttackCampaigns = ref(true);
const searchAttackDataSources = ref(true);
const searchAttackGroups = ref(true);
const searchAttackMitigations = ref(true);
const searchAttackSoftware = ref(true);
const searchAttackTechniques = ref(true);
const searchDefendArtifacts = ref(true);
const searchDefendTactics = ref(true);
const searchDefendTechniques = ref(true);

function markdownToHtml(markdown: string) {
  // TODO: resolve console warnings
  return marked(highLight(markdown));
}

function highLight(text: string) {
  const regexp = new RegExp(activeSearchTerm.value, 'ig');
  const highlights = text.replace(regexp, '<mark>$&</mark>');
  return `${highlights}`;
}

function search() {
  const searchStore = useSearchStore();
  const alertStore = useAlertStore();

  searchStore.search(searchTerm.value).catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}

function deleteSearch(searchId: number) {
  const searchStore = useSearchStore();
  const alertStore = useAlertStore();

  searchStore
    .deleteSearchById(searchId)
    .then(() => {
      alertStore.initSuccess('Successfully deleted search');
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    });
}

function loadSearch(searchId: number) {
  const searchStore = useSearchStore();
  const alertStore = useAlertStore();

  searchStore
    .loadSearchById(searchId)
    .then((res) => {
      searchTerm.value = res.searchTerm;
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    });
}
</script>
