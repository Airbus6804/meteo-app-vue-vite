<script setup lang="ts">

import iconsMap from "./scripts/iconsMap";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { ref } from "vue";
import { meteoInformations } from "./scripts/dataTypes";

iconsMap.forEach((e) => library.add(e.icon));

library.add(faLocationDot);

const props = defineProps({
  current_weather: { type: Object as any, required: true },
  position: { type: Object, required: true },
})

/*const meteo = new Meteo(
  Number(localStorage.getItem("latitude")),
  Number(localStorage.getItem("longitude"))
);

const position = await meteo.getLocationInfo();*/

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();

const month = ref(date.getMonth() - 1);
const day = ref(date.getDate())
const hour = ref(date.getHours())
const minutes = ref(date.getMinutes());
const seconds = ref(date.getSeconds());

const CurrentWeather = props.current_weather as meteoInformations;


setInterval(() => {
    date = new Date();
    month.value = date.getMonth() - 1;
    day.value = date.getDate();
    hour.value = date.getHours();
    minutes.value = date.getMinutes();
    seconds.value = date.getSeconds();
}, 1000)

const fa = "fa-solid fa-";



</script>

<template>
  <section class="positionAndTime">
    <div class="icon">
      <FontAwesomeIcon icon="fa-solid fa-location-dot"></FontAwesomeIcon>
    </div>
    <span class="position"> {{ position.city }}, {{ position.region }} </span>
    <span class="time">
      Today, {{ months[month.valueOf()] }} {{ day.valueOf() }}
      {{ hour.valueOf() > 12 ? hour.valueOf() - 12 : hour.valueOf() }}:{{
        Number(minutes.valueOf()) > 10 ? "" : "0"
      }}{{ minutes.valueOf() }}
      {{ hour.valueOf() > 12 ? "PM" : "AM" }}  <FontAwesomeIcon :icon="fa + iconsMap.get(CurrentWeather.weathercode.toString()).icon.iconName"></FontAwesomeIcon> {{ iconsMap.get(CurrentWeather.weathercode.toString()).name }}
    </span>
  </section>
</template>

<style scoped lang="scss">
.positionAndTime {
  color: white;
  text-shadow: 0px 4px 4px black;
  display: grid;
  grid-template-columns: 1.3rem 1fr;
  grid-template-areas:
    "marker position"
    "marker time"
    ;

  & > .position {
    font-size: 24px;
    font-weight: 500;
    grid-area: position;
    line-height: 150%;
  }

  & > .icon {
    grid-area: marker;
    height: 20px !important;
    display: flex;
    align-items: center;
    & > * {
      margin: auto;
      margin-top: 10px;
    }
  }

  & > .time {
    grid-area: time;
    font-size: 13px;
  }
}
</style>
