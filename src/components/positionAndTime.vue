<script setup lang="ts">
import Meteo from "./scripts/getData";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getVNodeBlockHelper } from "@vue/compiler-core";

import { ref } from "vue";

library.add(faLocationDot);

const meteo = new Meteo(
  Number(localStorage.getItem("latitude")),
  Number(localStorage.getItem("longitude"))
);

const position = await meteo.getLocationInfo();

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

console.log("month: ", month.valueOf())

setInterval(() => {
    date = new Date();
    month.value = date.getMonth() - 1;
    day.value = date.getDate();
    hour.value = date.getHours();
    minutes.value = date.getMinutes();
    seconds.value = date.getSeconds();
}, 1000)

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
      {{ hour.valueOf() > 12 ? "PM" : "AM" }}
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
