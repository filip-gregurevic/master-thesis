<template>
  <v-navigation-drawer v-model="isSidebarOpen" :permanent="true">
    <v-list>
      <v-list-subheader class="text-h5">My Searches</v-list-subheader>
      <template v-for="search in searches" :key="search.id">
        <v-list-item
          :active="search.id === searchId"
          :subtitle="`${search.results} results`"
          :title="`${search.searchTerm}`"
          color="secondary"
          @click.prevent="loadSearch(search.id)"
        >
          <template v-slot:append>
            <v-tooltip location="bottom" text="Delete Search">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="error"
                  icon="mdi-close"
                  v-bind="props"
                  variant="text"
                  @click.prevent.stop="deleteSearch(search.id)"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-row align-content="center" class="mb-4" justify="center">
      <v-col cols="auto">
        <v-img
          height="50px"
          src="@/assets/logo-cropped.svg"
          width="50px"
        ></v-img>
      </v-col>
      <v-col cols="auto"
        ><h1 class="text-h3">Search MITRE ATT4CK & D3FEND</h1></v-col
      >
    </v-row>
    <v-form
      ref="form"
      @submit.prevent="search"
      @keydown.enter.prevent="submitForm"
    >
      <v-row align-content="center" justify="center">
        <v-col cols="10" lg="8" md="8">
          <v-text-field
            v-model="searchTerm"
            append-inner-icon="mdi-send"
            placeholder="Search..."
            variant="outlined"
            @click:append-inner="submitForm"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row
      v-if="results && results.total === 0"
      :dense="true"
      align-content="center"
      class="context"
      justify="center"
    >
      <v-col cols="auto">
        <h2 class="text-h4">
          There are no results matching "{{ searchTerm }}"
        </h2>
      </v-col>
    </v-row>
    <v-row
      v-if="results && results.total > 0"
      :dense="true"
      align-content="center"
      class="context"
      justify="center"
    >
      <v-col class="py-0" cols="12">
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
              :key="campaign.id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${campaign.mitreId} - ${campaign.name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(campaign.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="campaign.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <!--
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
          -->
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
            <v-list-item v-for="group in results.attack.groups" :key="group.id">
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${group.mitreId} - ${group.name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(group.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="group.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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
              :key="mitigation.id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="
                    highLight(`${mitigation.mitreId} - ${mitigation.name}`)
                  "
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(mitigation.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="mitigation.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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
            <v-list-item v-for="sw in results.attack.software" :key="sw.id">
              <template v-slot:title="{ title }">
                <div v-html="highLight(`${sw.mitreId} - ${sw.name}`)"></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(sw.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="sw.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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
              :key="tactic.id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${tactic.mitreId} - ${tactic.name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(tactic.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="tactic.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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
              :key="technique.id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${technique.mitreId} - ${technique.name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(technique.description)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="technique.link"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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
              :key="technique.id"
            >
              <template v-slot:title="{ title }">
                <div
                  v-html="highLight(`${technique.mitreId} - ${technique.name}`)"
                ></div>
              </template>
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="markdownToHtml(technique.definition)"></div>
              </template>
              <template v-slot:append>
                <v-btn
                  :href="`https://d3fend.mitre.org/technique/d3f:${technique.name.replace(
                    /\s+/g,
                    '',
                  )}`"
                  color="primary"
                  icon="mdi-open-in-new"
                  target="_blank"
                  variant="text"
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

const isSidebarOpen = computed(() => {
  const searchStore = useSearchStore();

  return searchStore.getIsSidebarOpen;
});

const searchTerm = ref('');

/* Add back if search configuration is going to be implemented
 * const searchAttack = ref(true);
 * const searchDefend = ref(true);
 * const searchAttackCampaigns = ref(true);
 * const searchAttackDataSources = ref(true);
 * const searchAttackGroups = ref(true);
 * const searchAttackMitigations = ref(true);
 * const searchAttackSoftware = ref(true);
 * const searchAttackTechniques = ref(true);
 * const searchDefendArtifacts = ref(true);
 * const searchDefendTactics = ref(true);
 * const searchDefendTechniques = ref(true);
 */

function markdownToHtml(markdown: string) {
  // TODO: resolve console warnings
  return marked(highLight(markdown));
}

function highLight(text: string) {
  const regexp = new RegExp(activeSearchTerm.value, 'ig');
  const highlights = text.replace(regexp, '<mark>$&</mark>');
  return `${highlights}`;
}

function submitForm() {
  const form = document.querySelector('form');
  form!.dispatchEvent(new Event('submit', { cancelable: true }));
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
