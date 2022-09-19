<script lang="ts">

import { defineComponent, onMounted } from "vue";
import ApiService from "@/services/ApiService";
import JediService from "@/services/JediService";
const apiService = new ApiService();
const jediService = new JediService();

export default defineComponent({
  setup() {

    onMounted(async () => {
      // const test = await apiService.getAllMoviesFromSWAPI();
      // const allJedisFromMovies = jediService.getAllJedisFromMovies();
    })
  },
});
</script>

<template>
  <main>
    Coucou
  </main>
</template>
