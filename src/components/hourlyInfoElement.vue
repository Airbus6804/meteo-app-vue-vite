<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { stringifyExpression } from "@vue/compiler-core";


const props = defineProps({
    temperature: {
        type: Number,
        required: true
    },

    icon: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    }
});

const hour = new Date(props.time).getHours();


const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

</script>

<template>
  <div class="element">
    <span class="temperature">{{ temperature }}</span>
    <div class="icon">
        <FontAwesomeIcon :icon="icon"></FontAwesomeIcon>
    </div>
    <span class="hour" :pm="hour > 12">{{ hour > 12 ? hour - 12 : hour }}</span>
  </div>
</template>

<style scoped lang="scss">
.element {

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;

  border-radius: 1rem;

  transition: .35s ease;

  min-width: max-content;

  


  &:hover {
    background-color: rgba(255, 255, 255, 0.3);

    border: 1px solid black;
    box-shadow: 0px 2px 3px #333;
  }

  &>.temperature{
    position: relative;
    top: 1rem;
    &::after{
        content: "°";
    }
  }
  &>.icon{
    flex: 1;
    display: grid;
    place-items: center;
    &>svg{
        max-width: 4rem;
        aspect-ratio: 1/1;
        height: 10vw;
    }
  }

  &>.hour{
    &[pm=true]{
        &::after{
            content: " pm";
        }
    }
    &::after{
        content: " am";
    }
    position: relative;
    bottom: 1rem;
  }

  &>*{
    text-align: center;
  }
}
</style>
