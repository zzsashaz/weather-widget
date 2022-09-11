<template>
  <div id="widget">
    <div class="widget" v-if="apiKey.length && apiStatus">
      <widget-header @openSettings="setSettingsStatus(true)"/>
      <settings v-if="settingsStatus" @closeSettings="setSettingsStatus(false)"/>
      <div class="widget__body">
        <weather-card
          v-if="userLocationWeatherData"
          :weather="userLocationWeatherData"
          :city="$t('city.userCity')"
          :delete-available="false"
        />
        <draggable>
          <weather-card
            v-for="weather in citiesWeatherList"
            :key="`${weather.name}-${Date.now()}`"
            :city="weather.name"
            :weather="weather"
          />
        </draggable>
      </div>
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
import Settings from '@/components/app/Settings.vue';
import { IWeatherData } from '@/types/api';
import draggable from 'vuedraggable';

export default Vue.extend({
  name: 'widget',
  components: {
    Settings, WeatherCard, WidgetHeader, draggable,
  },
  data() {
    return {
      ICONS,
      settingsStatus: false,
    };
  },
  async created() {
    this.$store.commit(WEATHER_MUTATIONS.SET_API_KEY);
    if (this.apiKey.length) {
      this.$store.dispatch('requestCurrentGeoLocation');
    }
    await this.initCitiesDataFromLocalStorage();
  },
  computed: {
    ...mapGetters({
      geoLocation: 'getCurrentGeoLocation',
      isGeoLocationEnabled: 'getGeoLocationStatus',
      currentUnits: 'getCurrentUnits',
      userLocationWeatherData: 'getCurrentLocationWeatherData',
      apiKey: 'getApiKey',
      apiStatus: 'getApiStatus',
      citiesWeather: 'getCitiesWeather',
    }),
    citiesWeatherList():Array<IWeatherData> {
      return Object.values(this.citiesWeather);
    },
  },
  watch: {
    async geoLocation() {
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
    },
  },
  methods: {
    setSettingsStatus(status:boolean) {
      this.settingsStatus = status;
    },
    async initCitiesDataFromLocalStorage() {
      const cities = localStorage.getItem('cities');
      if (cities) {
        const citiesList = JSON.parse(cities);
        await Promise.all(citiesList.map(async (cityName:string) => {
          try {
            const weatherData = await this.$store.dispatch('fetchWeatherDataByCityName', cityName);
            this.$store.commit(WEATHER_MUTATIONS.UPDATE_CITY_MAP, weatherData);
          } catch (e) {
            this.$store.commit(WEATHER_MUTATIONS.SET_API_STATUS, false);
          }
        }));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.widget {
  background: $widget-background;
  padding: 8px 16px;
  position: relative;
}
.error {
  background: $error-background;
  display: flex;
  height: 350px;
  align-items: center;
  justify-content: center;
}
</style>
