<template>
  <div id="widget">
    <div class="widget" v-if="apiKey.length && !isApiError">
      <div class="widget__header">Header</div>
      <div class="widget__body">Body</div>
      <div class="widget__footer">Footer</div>
    </div>
    <div class="error" v-else>
      <h2>Service is unavailable</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { WEATHER_MUTATIONS } from '@/utils/constants';

export default Vue.extend({
  name: 'widget',
  data() {
    return {
      isApiError: false,
    };
  },
  created() {
    this.$store.commit(WEATHER_MUTATIONS.SET_API_KEY);
    if (this.apiKey.length) {
      this.$store.dispatch('requestCurrentGeoLocation');
    }
  },
  computed: {
    ...mapGetters({
      geoLocation: 'getCurrentGeoLocation',
      isGeoLocationFailed: 'getGeoLocationStatus',
      currentUnits: 'getCurrentUnits',
      userLocationWeatherData: 'getCurrentLocationWeatherData',
      apiKey: 'getApiKey',
    }),
  },
  watch: {
    async geoLocation() {
      try {
        await this.$store.dispatch('fetchLocationWeatherData');
      } catch (e) {
        this.isApiError = true;
      }
    },
    userLocationWeatherData() {
      console.log(this.userLocationWeatherData);
    },
    apiKey() {
      console.log(this.apiKey);
    },
  },
});
</script>

<style lang="scss" scoped>
.widget {
  background: $widget-background;
  &__header {

  }
  &__body {

  }
  &__footer {

  }
}
.error {
  background: $error-background;
  display: flex;
  height: 350px;
  align-items: center;
  justify-content: center;
}
</style>
