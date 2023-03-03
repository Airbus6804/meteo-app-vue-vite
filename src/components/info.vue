<script setup lang="ts"> 

import Meteo from './scripts/getData';

import { ref } from 'vue'

const lat = ref("wait!!");

const meteo = new Meteo(1, 1); 

</script>

<template>
    {{lat}}
</template>