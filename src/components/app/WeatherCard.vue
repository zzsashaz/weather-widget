<template>
<div class="weather-card">
  {{weather}}
</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IWeatherData } from '@/types/api';

export default Vue.extend({
  name: 'weather-card',
  props: {
    weather: {
      type: Object as PropType<IWeatherData>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">

</style>
