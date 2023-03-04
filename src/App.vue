<script setup lang="ts">
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import meteoCard from "./components/meteoCard.vue";
import upper from "./components/upper.vue";





</script>

<template>
  <main>
    <Suspense>
      <upper class="upper"></upper>
    </Suspense>
    <Suspense>
      <meteoCard class="meteoCard"></meteoCard>
    </Suspense>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
}
.meteoCard {
  flex: 1;
}
.upper {
  flex: 1;
}
</style>
