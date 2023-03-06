<script setup lang="ts">
import { PropsExpression } from "@vue/compiler-core";
import averagesCard from "./averagesCard.vue";
import positionAndTime from "./positionAndTime.vue";
import {
  location,
  meteoInformations,
  meteoInformationsHourly,
} from "./scripts/dataTypes";
import { ref, watch } from "vue";

const props = defineProps({
  hourly: { type: Object as any, required: true },
  current_weather: { type: Object as any, required: true },
  position: { type: Object, required: true },
  state: { type: Number, required: true },
});

//const {state: State} = props;

console.log(props);

const position = props.position as location;
const current_weather = props.current_weather as meteoInformations;


//console.log("Upper:", props.state.valueOf())

//STATE HA IL CURRENT PAGE DA PASSARE AVERAGESCARD A AVERAGES PER POI FARE LA MEDIA DA LI

//console.log(current_weather, hourly, position)
</script>

<template>
  <section class="upper">
    <Suspense>
      <positionAndTime
        class="positionAndTime"
        :current_weather="current_weather"
        :position="position"></positionAndTime>
    </Suspense>
    <Suspense>
      <averagesCard
        class="averagesCard"
        :hourly="hourly"
        :state=props></averagesCard>
    </Suspense>
  </section>
</template>

<style scoped lang="scss">
.upper {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-inline: 0.5rem;

  & > .averagesCard {
    margin-top: auto;
  }
}
</style>
