<template>
<div class="header">
  <icon icon-type="refresh" clickable @click="refreshData"/>
  <icon icon-type="gear" clickable/>
</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'widget-header',
  computed: {
    ...mapGetters({
      isGeoLocationFailed: 'getGeoLocationStatus',
    }),
  },
  methods: {
    async refreshData() {
      if (!this.isGeoLocationFailed) {
        try {
          await this.$store.dispatch('fetchLocationWeatherData');
        } catch (e) {
          this.isApiError = true;
        }
      }
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
