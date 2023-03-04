<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps({
  data: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="meteoAverage">
    <FontAwesomeIcon :icon="icon" class="meteoAverage__icon"></FontAwesomeIcon>
    <span class="meteoAverage__number" :name="name">
      {{ data.toFixed() }}
    </span>
    <span class="meteoAverage__name">{{ name }}</span>
  </div>
</template>

<style scoped lang="scss">
.meteoAverage {
  flex: 1;
  min-width: 6rem;
  align-items: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__number {
    font-size: 30px;
    font-weight: 900;
    text-shadow: 0px 4px 4px black;
    &[name="Average Temp."] {
      &::after {
        content: "°";
      }
    }
    &::after {
      content: "%";
    }
  }
  &__icon{
    height: 2rem;
  }
  &__name{
    font-size: 13px;
  }
  & > *{
    text-align: center;
  }
}
</style>
