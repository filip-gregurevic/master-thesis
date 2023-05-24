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
    <v-row v-if="results" justify="center" align-content="center">
      <v-col cols="12">
        <v-list>
          <v-list-subheader>Results:</v-list-subheader>
          <v-list v-if="results.attack">
            <v-list-subheader>ATT4CK:</v-list-subheader>
            <v-list v-if="results.attack.campaigns">
              <v-list-subheader>Campaigns:</v-list-subheader>
              <v-list-item v-for="campaign in results.attack.campaigns" :key="campaign.id">
                {{ campaign }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.dataSources">
              <v-list-subheader>Data Sources:</v-list-subheader>
              <v-list-item v-for="dataSource in results.attack.dataSources" :key="dataSource.id">
                {{ dataSource }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.groups">
              <v-list-subheader>Groups:</v-list-subheader>
              <v-list-item v-for="group in results.attack.groups" :key="group.id">
                {{ group }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.mitigations">
              <v-list-subheader>Mitigations:</v-list-subheader>
              <v-list-item v-for="mitigation in results.attack.mitigations" :key="mitigation.id">
                {{ mitigation }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.software">
              <v-list-subheader>Software:</v-list-subheader>
              <v-list-item v-for="sw in results.attack.software" :key="sw.id">
                {{ sw }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.tactics">
              <v-list-subheader>Tactics:</v-list-subheader>
              <v-list-item v-for="tactic in results.attack.tactics" :key="tactic.id">
                {{ tactic }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.attack.techniques">
              <v-list-subheader>Techniques:</v-list-subheader>
              <v-list-item v-for="technique in results.attack.techniques" :key="technique.id">
                {{ technique }}
              </v-list-item>
            </v-list>
          </v-list>
          <v-list v-if="results.defend">
            <v-list-subheader>D3FEND:</v-list-subheader>
            <v-list v-if="results.defend.artifacts">
              <v-list-subheader>Artifacts:</v-list-subheader>
              <v-list-item v-for="artifact in results.defend.artifacts" :key="artifact.id">
                {{ artifact }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.defend.tactics">
              <v-list-subheader>Tactics:</v-list-subheader>
              <v-list-item v-for="tactic in results.defend.tactics" :key="tactic.id">
                {{ tactic }}
              </v-list-item>
            </v-list>
            <v-list v-if="results.defend.techniques">
              <v-list-subheader>Techniques:</v-list-subheader>
              <v-list-item v-for="technique in results.defend.techniques" :key="technique.id">
                {{ technique }}
              </v-list-item>
            </v-list>
          </v-list>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="12" lg="6">
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <v-switch label="Include ATT4CK" v-model="searchAttack"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch label="Include Groups" v-model="searchAttackGroups"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Software" v-model="searchAttackSoftware"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Techniques" v-model="searchAttackTechniques"></v-switch>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="4">
            <v-switch label="Include Mitigations" v-model="searchAttackMitigations"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Campaigns" v-model="searchAttackCampaigns"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include DataSources" v-model="searchAttackDataSources"></v-switch>
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
            <v-switch label="Include Artifacts" v-model="searchDefendArtifacts"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Tactics" v-model="searchDefendTactics"></v-switch>
          </v-col>
          <v-col cols="4">
            <v-switch label="Include Techniques" v-model="searchDefendTechniques"></v-switch>
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

function search() {
  const searchStore = useSearchStore();

  searchStore.search(
    searchTerm.value,
  );
}

function deleteSearch(searchId: number) {
  const searchStore = useSearchStore();

  searchStore.deleteSearchById(searchId);
}
</script>
