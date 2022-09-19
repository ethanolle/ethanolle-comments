<template>
  <main>
    <div v-for="jedi in jedis" :key="jedi.swapId">
      <span @click="getJediDetail(jedi)">• {{ jedi.name }}</span>
      <div v-if="jedi.actor">
        Acteur : {{jedi.actor.name}}
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

    onMounted(async () => {
      console.log("coucou");
      jedis.value = await jediService.getAllJedisFromMovies();
      console.log("jedis.value", jedis.value);
    });

    return {
      jedis,
    };
  },
  methods: {
    async getJediDetail(jedi: Character) {
      const jediWithActorData = await actorService.getActorFromIMDB(jedi);
        console.log("coucou", jediWithActorData);
      // replace jedi with new jedi retrieved
      const index = this.jedis.findIndex(
        (j: Character) => j.swapiId === jedi.swapiId
      );
      this.jedis[index] = jediWithActorData;

    },
  },
});
</script>
