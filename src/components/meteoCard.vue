<script setup lang="ts">
import meteoInfo from "./meteoInfo.vue";
import hourlyInfo from "./hourlyInfo.vue";

import {ref} from "vue";
import { meteoInformations, meteoInformationsDaily } from "./scripts/dataTypes";

const lat = ref("wait!!");

//const meteo = new Meteo(Number(localStorage.getItem("latitude")), Number(localStorage.getItem("longitude")));

/*
console.log(await meteo.getNow());
console.log(await meteo.getDaily());
console.log(await meteo.getHourly());
console.log(await meteo.getAll());
*/
/*
icons https://erikflowers.github.io/weather-icons/
*/

//console.log(await meteo.getNow()):

//const meteoData = await meteo.getDaily();

const props = defineProps({
  hourly: {
    type: Object as any,
    required: true,
  },
  daily:{
    type: Object as any,
    required: true
  }
})


const state = ref(-1);

const emit = defineEmits();


//const meteoData = JSON.parse(
//  '{"max_temperature":[29,28.9,29,28.8,28.7,28.7,28.8],"min_temperature":[28,27.8,27.6,27.9,27.6,28.2,27.9],"weather_code":[95,95,96,96,96,95,95],"time":["2023-03-04","2023-03-05","2023-03-06","2023-03-07","2023-03-08","2023-03-09","2023-03-10"],"sunrise":["2023-03-04T06:03","2023-03-05T06:03","2023-03-06T06:03","2023-03-07T06:03","2023-03-08T06:02","2023-03-09T06:02","2023-03-10T06:02"],"sunset":["2023-03-04T18:11","2023-03-05T18:11","2023-03-06T18:11","2023-03-07T18:11","2023-03-08T18:10","2023-03-09T18:10","2023-03-10T18:10"]}'
//);

//console.log(JSON.stringify(meteoData));
</script>

<template>
  <section class="meteoCard">
    <meteoInfo
      v-if="state.valueOf() === -1"
      v-for="n in 7"
      v-bind:index="n"
      v-bind:data="daily as meteoInformationsDaily"
      @changeState="(newState: number) => {state = newState; $emit('changeState', newState) }"
      
    ></meteoInfo>
    <hourlyInfo v-else="null" @changeState="(newState: number) => {state = newState; $emit('changeState', newState) }" :state="state" :hourly="hourly"></hourlyInfo>
    
  </section>
</template>

<style lang="scss" scoped>
.meteoCard {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 1rem;
}
</style>
