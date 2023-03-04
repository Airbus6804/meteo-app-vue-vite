<script setup lang="ts">
import averagesCard from "./averagesCard.vue";
import positionAndTime from "./positionAndTime.vue";
</script>

<template>
  <section class="upper">
    <Suspense>
      <positionAndTime class="positionAndTime"></positionAndTime>
    </Suspense>
    <Suspense>
      <averagesCard class="averagesCard"></averagesCard>
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
