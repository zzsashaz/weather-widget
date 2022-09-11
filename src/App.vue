<template>
  <div id="widget">
    <div class="widget" v-if="apiKey.length && apiStatus">
      <widget-header/>
      <div class="widget__body">
        <weather-card
          v-if="userLocationWeatherData"
          :weather="userLocationWeatherData"
          :city="$t('city.userCity')"
          :delete-available="false"
        />
      </div>
      <div class="widget__footer">Footer</div>
    </div>
    <div class="error" v-else>
      <h2>{{$t('errors.common')}}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { WEATHER_MUTATIONS } from '@/utils/constants';
import ICONS from '@/utils/icons';
import WidgetHeader from '@/components/app/WidgetHeader.vue';
import WeatherCard from '@/components/app/WeatherCard.vue';

export default Vue.extend({
  name: 'widget',
  components: { WeatherCard, WidgetHeader },
  data() {
    return {
      ICONS,
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
      isGeoLocationEnabled: 'getGeoLocationStatus',
      currentUnits: 'getCurrentUnits',
      userLocationWeatherData: 'getCurrentLocationWeatherData',
      apiKey: 'getApiKey',
      apiStatus: 'getApiStatus',
    }),
  },
  watch: {
    async geoLocation() {
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
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
  padding: 8px 16px;
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
