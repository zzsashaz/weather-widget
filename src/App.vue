<template>
  <div id="widget">
    <div class="widget" v-if="apiKey.length && !isApiError">
      <widget-header/>
      <div class="widget__body">Body</div>
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

export default Vue.extend({
  name: 'widget',
  components: { WidgetHeader },
  data() {
    return {
      isApiError: false,
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
