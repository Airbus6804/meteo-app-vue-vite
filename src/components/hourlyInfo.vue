<script setup lang="ts">
import hourlyInfoElement from "./hourlyInfoElement.vue";

import { icon, library } from "@fortawesome/fontawesome-svg-core";

import iconsMap from "./scripts/iconsMap";

import {ref, defineEmits} from "vue";

/* import font awesome icon component */

import { faArrowLeft, faTruckMonster } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//import Meteo from "./scripts/getData";

const props = defineProps({
  state: {
    type: Number,
    required: true,
  },
  hourly: {
    type: Object as any,
    required: true,
  },
});

/*const meteo = new Meteo(
  Number(localStorage.getItem("latitude")),
  Number(localStorage.getItem("longitude"))
);*/

const emits:any = defineEmits();

//const emits = console.log;

//const meteoData = await meteo.getHourly();

const meteoData = props.hourly; 

console.log(meteoData?.time);

iconsMap.forEach((e) => library.add(e.icon));

library.add(faArrowLeft);

const fa = "fa-solid fa-";

const icons = [] as Array<any>;

const date = new Date();

const day = date.getDay();

const hour = date.getHours();

if (props.state != 0) {
  for (let i = 24 * props.state; i < 24 + props.state * 24; i = i + 4) {
    icons.push({
      icon: iconsMap.get(meteoData?.weather_code[i].toString()).icon.iconName,
      time: meteoData?.time[i],
      temperature: meteoData?.temperature[i],
    });
  }
} else {
  for (
    let i = hour + 1;
    i < 24 + props.state;
    i += 24 - hour <= 6 ? 1 : Math.round((24 - hour) / 6)
  ) {
    console.log(i);
    icons.push({
      icon: iconsMap.get(meteoData?.weather_code[i].toString()).icon.iconName,
      time: meteoData?.time[i],
      temperature: meteoData?.temperature[i],
      index: i,
    });
  }
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

console.log(day + props.state > 6 ? day + props.state - 6 : day + props.state);
</script>

<template>
  <section class="hourlyInfo">
    <div class="hourlyInfo__header">
      <FontAwesomeIcon
        @click="() => emits('changeState', -1)"
        icon="fa-solid fa-arrow-left"
        clickable
      ></FontAwesomeIcon>
      Back to daily
    </div>
    <div class="hourlyInfo__dayName">
      {{
        state === 0
          ? "Today"
          : days[day + state > 6 ? day + state - 6 : day + state]
      }}
    </div>
    <div class="hourlyInfo__displayer--overflower">
      <div class="hourlyInfo__displayer">
        <hourlyInfoElement
          v-for="n in icons"
          :temperature="n.temperature"
          :icon="fa + n.icon"
          :time="n.time"
        ></hourlyInfoElement>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
[clickable] {
  cursor: pointer;
}
.hourlyInfo {
  display: flex;
  flex-direction: column;

  height: 100%;
  &__displayer {
    
    margin: auto;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    height: 100%;
    min-width: 100%;
    width: max-content;
    padding-inline-end: 2rem;


    &--overflower{
        height: 50%;
        margin: auto;
        width: 100vw;
        overflow-x: auto;
    }
  }

  &__dayName {
    color: white;
    font-size: 3em;
    margin: auto;
    margin-bottom: 0rem;
    font-weight: 800;
    text-shadow: 0 4px 4px black;
  }
}
</style>
