import {
  ICitiesWeatherData, IRootState, IUnit, IWeatherState,
} from '@/types/store';
import { ActionContext } from 'vuex';
import { fetchWeatherDataByCoordinates, fetchWeatherDataByName } from '@/api/weatherApi';
import { WEATHER_MUTATIONS } from '@/utils/constants';
import { IWeatherData } from '@/types/api';
import type { TWeather } from '@/types/api';

export default {
  state: ():IWeatherState => ({
    units: 'metric',
    currentLocationWeatherData: null as TWeather,
    apiKey: '',
    isApiAvailable: true,
    citiesWeather: { },
  }),
  actions: {
    async fetchCurrentLocationWeatherData(
      context:ActionContext<IWeatherState, IRootState>,
    ):Promise<void> {
      try {
        if (context.rootGetters.getGeoLocationStatus) {
          const weatherData = await fetchWeatherDataByCoordinates(
            context.rootGetters.getCurrentGeoLocation,
            context.getters.getCurrentUnits,
            context.getters.getApiKey,
          );
          context.commit(WEATHER_MUTATIONS.SET_CURRENT_LOCATION_WEATHER, weatherData);
        }
      } catch (e) {
        context.commit(WEATHER_MUTATIONS.SET_API_STATUS, false);
      }
    },
    async fetchWeatherDataByCityName(
      context:ActionContext<IWeatherState, IRootState>,
      cityName:string,
    ):Promise<IWeatherData> {
      const weatherData = await fetchWeatherDataByName(
        cityName,
        context.getters.getCurrentUnits,
        context.getters.getApiKey,
      );
      return weatherData;
    },
  },
  mutations: {
    [WEATHER_MUTATIONS.SET_CURRENT_LOCATION_WEATHER](
      state:IWeatherState,
      weatherData:IWeatherData,
    ):void {
      state.currentLocationWeatherData = weatherData;
    },
    [WEATHER_MUTATIONS.SET_API_KEY](state:IWeatherState):void {
      const apiKey = document.currentScript?.getAttribute('data-api-key');
      if (apiKey) {
        state.apiKey = apiKey;
      }
    },
    [WEATHER_MUTATIONS.SET_API_STATUS](state:IWeatherState, status:boolean):void {
      state.isApiAvailable = status;
    },
    [WEATHER_MUTATIONS.SET_UNITS_FORMAT](state:IWeatherState, units:IUnit):void {
      state.units = units;
    },
    [WEATHER_MUTATIONS.ADD_CITY_TO_MAP](state:IWeatherState, weatherData:IWeatherData):void {
      const memo = JSON.parse(JSON.stringify(state.citiesWeather));
      memo[weatherData.name] = weatherData;
      state.citiesWeather = memo;
    },
    [WEATHER_MUTATIONS.DELETE_CITY_FROM_MAP](state:IWeatherState, city:string):void {
      const memo = JSON.parse(JSON.stringify(state.citiesWeather));
      delete memo[city];
      state.citiesWeather = memo;
    },
  },
  getters: {
    getCurrentUnits(state:IWeatherState):IUnit {
      return state.units;
    },
    getCurrentLocationWeatherData(state:IWeatherState):TWeather {
      return state.currentLocationWeatherData;
    },
    getApiKey(state:IWeatherState): string {
      return state.apiKey;
    },
    getApiStatus(state:IWeatherState): boolean {
      return state.isApiAvailable;
    },
    getCitiesWeather(state:IWeatherState):ICitiesWeatherData {
      return state.citiesWeather;
    },
  },
};
