<script setup lang="ts">
import meteoCard from "./components/meteoCard.vue";
import upper from "./components/upper.vue";

function log(...data: any) {
  console.log(...data);
}

const state = ref(-1);
</script>

<script lang="ts">
import { ref } from "vue";

import Meteo from "./components/scripts/getData";
import * as types from "./components/scripts/dataTypes";

const latitude = ref(0 as number),
  longitude = ref(0 as number);

function getLoc(): Promise<Boolean> {
  return new Promise<Boolean>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          localStorage.setItem("latitude", latitude.value.toString());
          localStorage.setItem("longitude", longitude.value.toString());
          console.log("resolved");
          resolve(true);
        },
        (error) => {
          reject(false);
        }
      );
    }
  });
}

if (localStorage.getItem("latitude")) {
  latitude.value = parseInt(localStorage.getItem("latitude") as string);
  longitude.value = parseInt(localStorage.getItem("longitude") as string);
} else {
  try {
    await getLoc();
  } catch (e) {
    //london's coordinates
    (latitude.value = 51.507351), (longitude.value = -0.127758);
    console.log("rejected");
  }
}

const meteo = new Meteo(latitude.value, longitude.value);

const current_weather = ref(types.emptyInformationsArray.current_weather);
const daily = ref(types.emptyInformationsArray.daily);
const hourly = ref(types.emptyInformationsArray.hourly);

const position = ref(types.emptyLocation);
//const data = await meteo.getAll();

position.value = await meteo.getLocationInfo();

//data.value = await meteo.getAll();

const d = await meteo.getAll();
current_weather.value = d.current_weather;
daily.value = d.daily;
hourly.value = d.hourly;

/*setTimeout(()=> {
  console.log("replaced")
  current_weather.value = types.emptyInformationsArray.current_weather;
  daily.value = types.emptyInformationsArray.daily;
  hourly.value = types.emptyInformationsArray.hourly;
}, 3000)*/
</script>

<template>
  <Suspense>
    <main>
      <Suspense>
        <upper
          class="upper"
          :position="position"
          :current_weather="current_weather"
          :hourly="hourly"
          :state="state"></upper>
      </Suspense>
      <Suspense>
        <meteoCard
          class="meteoCard"
          @changeState="(newState) => (state = newState)"
          :daily="daily"
          :hourly="hourly"></meteoCard>
      </Suspense>
    </main>
  </Suspense>
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
