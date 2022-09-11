<template>
<div class="header">
  <div class="header__refresh">
    <icon v-if="!coolDownSeconds" icon-type="refresh" clickable @click="refreshData"/>
    <span v-if="coolDownSeconds">{{$t('measures.seconds',{ value:this.coolDownSeconds })}}</span>
  </div>
  <icon @click="$emit('openSettings')" icon-type="gear" clickable/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { WEATHER_MUTATIONS } from '@/utils/constants';

export default Vue.extend({
  name: 'widget-header',
  data() {
    return {
      coolDownSeconds: 0,
      coolDownIntervalId: 0,
    };
  },
  computed: {
    ...mapGetters({
      citiesWeather: 'getCitiesWeather',
    }),
    citiesNamesList():Array<string> {
      return Object.keys(this.citiesWeather);
    },
  },
  methods: {
    async refreshData() {
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
      await this.refreshCityWeatherData();
      this.initRefreshCoolDown(30);
    },
    initRefreshCoolDown(seconds:number) {
      this.coolDownSeconds = seconds;
      this.coolDownIntervalId = setInterval(() => {
        this.coolDownSeconds -= 1;
        if (this.coolDownSeconds === 0) {
          clearInterval(this.coolDownIntervalId);
        }
      }, 1000);
    },
    async refreshCityWeatherData() {
      await Promise.all(this.citiesNamesList.map(async (cityName) => {
        try {
          const weatherData = await this.$store.dispatch('fetchWeatherDataByCityName', cityName);
          this.$store.commit(WEATHER_MUTATIONS.UPDATE_CITY_MAP, weatherData);
        } catch (e) {
          this.$store.commit(WEATHER_MUTATIONS.SET_API_STATUS, false);
        }
      }));
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  &__refresh {
    align-items: center;
  }
}
</style>
