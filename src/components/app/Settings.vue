<template>
  <div class="settings">
    <div class="settings__header">
      <span>{{$t('settings.title')}}</span>
      <icon icon-type="close" clickable @click="$emit('closeSettings')"/>
    </div>
    <div class="settings__city">
      <span>{{$t('settings.city.title')}}</span>
      <form class="settings__city-form" action="#" @keyup.enter="addCity">
        <input v-model="cityValue" type="text" class="settings_city-input">
        <icon clickable @click="addCity" icon-type="plus"/>
      </form>
      <div class="settings__city-error" v-if="isShowingError">
        <p>{{$t('settings.city.error')}}</p>
      </div>
    </div>
    <div class="settings__language">
      <span>{{$t('settings.language.title')}}</span>
      <form class="settings__language-form">
        <div class="settings__language-option">
          <input
            v-model="$i18n.locale"
            type="radio"
            name="language"
            value="en"
            class="settings_language-input"
            id="language-en"
          >
          <label for="language-en">{{$t('settings.language.en')}}</label>
        </div>
        <div class="settings__language-option">
          <input
            v-model="$i18n.locale"
            type="radio"
            name="language"
            value="ru"
            id="language-ru"
            class="settings_language-input"
          >
          <label for="language-ru">{{$t('settings.language.ru')}}</label>
        </div>
      </form>
    </div>
    <div class="settings__units">
      <span>{{$t('settings.units.title')}}</span>
      <form class="settings__units-form">
        <div class="settings__units-option">
          <input
            v-model="units"
            type="radio"
            name="units"
            value="metric"
            class="settings_units-input"
            id="units-metric"
          >
          <label for="units-metric">{{$t('settings.units.metric')}}</label>
        </div>
        <div class="settings__units-option">
          <input
            v-model="units"
            type="radio"
            name="units"
            value="imperial"
            class="settings_units-input"
            id="units-imperial"
          >
          <label for="units-imperial">{{$t('settings.units.imperial')}}</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { WEATHER_MUTATIONS } from '@/utils/constants';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'settings',
  data() {
    return {
      cityValue: '',
      units: this.$store.getters.getCurrentUnits,
      isShowingError: false,
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
  watch: {
    async units() {
      this.$store.commit(WEATHER_MUTATIONS.SET_UNITS_FORMAT, this.units);
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
      await Promise.all(this.citiesNamesList.map(async (cityName) => {
        try {
          const weatherData = await this.$store.dispatch('fetchWeatherDataByCityName', cityName);
          this.$store.commit(WEATHER_MUTATIONS.UPDATE_CITY_MAP, weatherData);
        } catch (e) {
          this.$store.commit(WEATHER_MUTATIONS.SET_API_STATUS, false);
        }
      }));
    },
    cityValue() {
      this.isShowingError = false;
    },
  },
  methods: {
    async addCity() {
      if (this.cityValue.length) {
        try {
          const weatherData = await this.$store.dispatch('fetchWeatherDataByCityName', this.cityValue);
          this.$store.commit(WEATHER_MUTATIONS.UPDATE_CITY_MAP, weatherData);
          this.cityValue = '';
        } catch (e) {
          if (e.response.data.cod === '404') {
            this.isShowingError = true;
          } else {
            this.$store.commit(WEATHER_MUTATIONS.SET_API_STATUS, false);
          }
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: $settings-background;
  z-index: 100;
  padding: 8px 16px;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 28px;
    align-items: center;
    margin-bottom: 10px;
  }
  &__city {
    border-top: 1px solid $base-border;
    border-bottom: 1px solid $base-border;
    padding: 8px 0;
  }
  &__city-form {
    display: flex;
    align-items: center;
    margin-top: 8px;
    input {
      border: none;
      border-radius: 3px;
      width: 100%;
      margin-right: 15px;
    }
  }
  &__language {
    border-bottom: 1px solid $base-border;
    padding: 8px 0;
  }
  &__language-option {
    margin: 8px 0;
    input {
      padding-right: 8px;
      cursor: pointer;
    }
    label {
      cursor: pointer;
    }
  }
  &__units {
    border-bottom: 1px solid $base-border;
    padding: 8px 0;
  }
  &__units-option {
    margin: 8px 0;
    input {
      padding-right: 8px;
      cursor: pointer;
    }
    label {
      cursor: pointer;
    }
  }
}
</style>
