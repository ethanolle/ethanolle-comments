<template>
  <main>
    <!-- <img src="../assets/img/loader.gif" /> -->
    <h2 v-if="isLoading">Chargement en cours...</h2>
    <div v-for="jedi in jedis" :key="jedi.swapId">
      <span style="cursor: pointer" @click="getJediDetail(jedi)"
        >• {{ jedi.name }}</span
      >
      <div v-if="jedi.actor" style="margin-left: 20px">
        <span style="font-weight: bold">Acteur</span> : {{ jedi.actor.name }}
        <span v-if="jedi.actor.birthdate">
          <br />
          <span style="font-weight: bold">né(e) le</span> {{ jedi.actor.birthdate }}
        </span>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import JediService from "@/services/JediService";
import ActorService from "@/services/ActorService";
import type { Character } from "@/types/Character";
const apiService = new ApiService();
const jediService = new JediService();
const actorService = new ActorService();

export default defineComponent({
  setup() {
    const jedis = ref([]);
    const isLoading = ref(true);

    onMounted(async () => {
      jedis.value = await jediService.getAllJedisFromMovies();
      isLoading.value = false;
    });

    return {
      jedis,
      isLoading,
    };
  },
  methods: {
    async getJediDetail(jedi: Character) {
      this.isLoading = true;
      const jediWithActorData = await actorService.getActorFromIMDB(jedi);
      // replace jedi with new jedi retrieved
      const index = this.jedis.findIndex(
        (j: Character) => j.swapiId === jedi.swapiId
      );
      this.jedis[index] = jediWithActorData;
      this.isLoading = false;
    },
  },
});
</script>
