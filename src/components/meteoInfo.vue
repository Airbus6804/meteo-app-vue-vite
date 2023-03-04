<script setup lang="ts">
import * as types from "./scripts/dataTypes";

import iconsMap from "./scripts/iconsMap";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//import {faSun, faCloudSun, faCloud, faCloudRain, faSnowflake, faThunderstorm} from "@fortawesome/free-solid-svg-icons";
//library.add(faSun, faCloudSun, faCloud, faCloudRain, faSnowflake, faThunderstorm)

iconsMap.forEach((e) => library.add(e.icon));

const props = defineProps({
  data: Object,
  index: Number,
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const data = props.data as types.meteoInformationsDaily;
const index = (props.index - 1) as Number;

const date = new Date(data.time[index]);
const day = index != 0 ? days[date.getDay()] : "Today";

const { name, icon } = iconsMap.get(data.weather_code[index].toString());

const fa = "fa-solid fa-";
</script>

<template>
  <div class="meteoInfo">
    <div class="meteoInfo__day">
      <span class="day"> {{ day }} </span>
      <span class="weather"> {{ name }} </span>
    </div>

    <div class="meteoInfo__temperature">
      <FontAwesomeIcon
        :icon="fa + icon.iconName"
        class="meteoInfo__temperature__icon"
      ></FontAwesomeIcon>
      <div class="meteoInfo__temperature__minMax">
        <span class="max"> {{ data.max_temperature[index] }} </span>
        <span class="min"> {{ data.min_temperature[index] }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.meteoInfo {
  border-bottom: 1px solid gray;
  height: 3rem;
  display: flex;
  align-items: center;
  &__day {
    display: flex;
    flex-direction: column;
    & > .day {
      font-weight: 500;
      line-height: 110%;
    }
    & > .weather {
      font-size: 11px;
      padding-left: 0.5rem;
    }

    & > * {
      text-align: left;
    }
  }
  &__temperature {
    margin-left: auto;
    display: flex;
    align-items: center;
    &__icon {
      height: 20px;

      width: 40px;
      font-size: 40px !important;

      /*background-image: url("https://www.figma.com/file/lLym1mtLhaRZ7qDHnT48Xe/Weather-Glassmorphism-Icon-(Community)?node-id=102%3A1855&t=L0cHFvMbz1EX8Yqw-4");
        background-position: center;
        background-size: 100% 100%;*/
    }
    &__minMax {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 12px;
      width: 2rem;
      align-items: center;
      & > * {
        &::after {
          content: "°";
        }
      }
    }
  }
}
</style>
