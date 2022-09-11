<template>
<div class="header">
  <icon icon-type="refresh" clickable @click="refreshData"/>
  <icon icon-type="gear" clickable/>
</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'widget-header',
  methods: {
    async refreshData() {
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
