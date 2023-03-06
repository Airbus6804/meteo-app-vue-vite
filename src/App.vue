<script setup lang="ts">
import meteoCard from "./components/meteoCard.vue";
import upper from "./components/upper.vue";
import Meteo from "./components/scripts/getData";

let latitude = 1, longitude = 1;

function getLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      localStorage.setItem("latitude", latitude.toString());
      localStorage.setItem("longitude", longitude.toString());
    });
  }
}

if (!localStorage.getItem("latitude")) {
  getLoc();
}



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
