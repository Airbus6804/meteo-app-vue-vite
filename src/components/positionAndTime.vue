<script setup lang="ts">
import Meteo from "./scripts/getData";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getVNodeBlockHelper } from "@vue/compiler-core";

library.add(faLocationDot);

const meteo = new Meteo(
  Number(localStorage.getItem("latitude")),
  Number(localStorage.getItem("longitude"))
);

const position = await meteo.getLocationInfo();

const month = [
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

const date = new Date();
</script>

<template>
  <section class="positionAndTime">
    <div class="icon">
      <FontAwesomeIcon icon="fa-solid fa-location-dot"></FontAwesomeIcon>
    </div>
    <span class="position"> {{ position.city }}, {{ position.region }} </span>
    <span class="time">
      Today, {{ month[date.getMonth() - 1] }} {{ date.getDate() }}
      {{ date.getHours() > 12 ? date.getHours() - 12 : date.getHours() }}:{{
        date.getMinutes()
      }}
      {{ date.getHours() > 12 ? "PM" : "AM" }}
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
  "marker time";

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
    &>*{
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
