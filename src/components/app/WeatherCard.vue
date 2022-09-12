<template>
<div class="weather-card">
  <div class="weather-card__head">
    <div class="weather-card__city-name">
      {{ city }}
    </div>
    <div class="weather-card__delete" v-if="deleteAvailable">
      <icon icon-type="delete" clickable @click="deleteCity"/>
    </div>
  </div>
  <div class="weather-card__body">
    <div class="weather-card__weather-icon">
      <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="weather-icon">
    </div>
    <div class="weather-card__wind">
      <icon icon-type="wind"/>
      <icon icon-type="direction" :style="`transform: rotate(${weather.wind.deg}deg)`"/>
      {{ $t(`measures.speed.${currentUnits}`, { value: weather.wind.speed }) }}
      {{ $t(`measures.windDirection.${windDirection}`) }}
    </div>
    <div class="weather-card__temperature">
      <icon icon-type="temp"/>
      {{ $t(`measures.temperature.${currentUnits}`, { value: weather.main.temp }) }}
    </div>
    <div class="weather-card__feeling">
      <icon icon-type="feels_like"/>
      {{ $t(`measures.temperature.${currentUnits}`, { value: weather.main.feels_like }) }}
    </div>
    <div class="weather-card__max-temperature">
      <icon icon-type="temp_max"/>
      {{ $t(`measures.temperature.${currentUnits}`, { value: weather.main.temp_max }) }}
    </div>
    <div class="weather-card__min-temperature">
      <icon icon-type="temp_min"/>
      {{ $t(`measures.temperature.${currentUnits}`, { value: weather.main.temp_min }) }}
    </div>
    <div class="weather-card__sunrise">
      <icon icon-type="sunrise"/>
      {{ $d(weather.sys.sunrise*1000, 'time') }}
    </div>
    <div class="weather-card__sunset">
      <icon icon-type="sunset"/>
      {{ $d(weather.sys.sunset*1000, 'time') }}
    </div>
    <div class="weather-card__humidity">
      <icon icon-type="humidity"/>
      {{ $t('measures.percent', { value: weather.main.humidity }) }}
    </div>
    <div class="weather-card__pressure">
      <icon icon-type="pressure"/>
      {{ $t('measures.pressure', { value: weather.main.pressure }) }}
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IWeatherData } from '@/types/api';
import { mapGetters } from 'vuex';
import { WEATHER_MUTATIONS } from '@/utils/constants';

export default Vue.extend({
  name: 'weather-card',
  props: {
    weather: {
      type: Object as PropType<IWeatherData>,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deleteAvailable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      currentUnits: 'getCurrentUnits',
    }),
    windDirection():string {
      const degree = this.weather.wind.deg;
      if (degree > 22.5 && degree < 67.5) {
        return 'NE';
      }
      if (degree >= 67.5 && degree <= 112.5) {
        return 'E';
      }
      if (degree > 112.5 && degree < 157.5) {
        return 'SE';
      }
      if (degree >= 157.5 && degree <= 202.5) {
        return 'S';
      }
      if (degree > 202.5 && degree < 247.5) {
        return 'SW';
      }
      if (degree >= 247.5 && degree <= 292.5) {
        return 'W';
      }
      if (degree > 292.5 && degree < 337.5) {
        return 'NW';
      }
      return 'N';
    },
  },
  methods: {
    deleteCity() {
      this.$store.commit(WEATHER_MUTATIONS.DELETE_CITY_FROM_MAP, this.weather.id);
    },
  },
});
</script>

<style scoped lang="scss">
.weather-card {
  padding: 5px 0;
  margin: 10px 0;
  border-top: 1px solid $base-border;
  &:hover {
    cursor: grabbing;
  }
  &__head {
    display: flex;
    justify-content: space-between;
  }
  &__body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100px repeat(4, 30px);
    grid-gap: 20px;
    &>* {
      display: flex;
      align-items: center;
    }
    &__weather-icon {
      img {
        height: 100%;
      }
    }
  }
}
</style>
