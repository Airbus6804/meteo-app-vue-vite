<script setup lang="ts"> 

import Meteo from './scripts/getData';

import { ref } from 'vue'

const lat = ref("wait!!");

const meteo = new Meteo(1, 1); 

meteo.getData(
    [Meteo.parameters.hourly.temperature, Meteo.parameters.hourly.weathercode], [Meteo.parameters.daily.sunset], true
).then(e => {
    console.log(e)
})
/*
icons https://erikflowers.github.io/weather-icons/
*/
</script>

<template>
    
    {{lat}}
</template>