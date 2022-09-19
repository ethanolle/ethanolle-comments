<template>
  <main>
    <div v-for="jedi in jedis" :key="jedi.swapId">
      <span @click="getJediDetail(jedi)">{{jedi.name}}</span>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import JediService from "@/services/JediService";
import type { Character } from "@/types/Character";
const apiService = new ApiService();
const jediService = new JediService();

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
    }
  },
  methods:{
    getJediDetail(jedi: Character){
      console.log("coucou", jedi);
    }
  }
});
</script>
