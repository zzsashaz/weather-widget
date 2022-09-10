import { IRootState, IUnit, IWeatherState } from '@/types/store';
import { ActionContext } from 'vuex';
import { fetchWeatherDataByCoordinates } from '@/api/weatherApi';
import { WEATHER_MUTATIONS } from '@/utils/constants';

export default {
  state: ():IWeatherState => ({
    units: 'metric',
    currentLocationWeatherData: null,
    apiKey: '',
  }),
  actions: {
    async fetchLocationWeatherData(
      context:ActionContext<IWeatherState, IRootState>,
    ):Promise<void> {
      const weatherData = await fetchWeatherDataByCoordinates(
        context.rootGetters.getCurrentGeoLocation,
        context.getters.getCurrentUnits,
        context.getters.getApiKey,
      );
      context.commit(WEATHER_MUTATIONS.SET_CURRENT_LOCATION_WEATHER, weatherData);
    },
  },
  mutations: {
    [WEATHER_MUTATIONS.SET_CURRENT_LOCATION_WEATHER](state:IWeatherState, weatherData:any):void {
      state.currentLocationWeatherData = weatherData;
    },
    [WEATHER_MUTATIONS.SET_API_KEY](state:IWeatherState):void {
      const apiKey = document.currentScript?.getAttribute('api-key');
      if (apiKey) {
        state.apiKey = apiKey;
      }
    },
  },
  getters: {
    getCurrentUnits(state:IWeatherState):IUnit {
      return state.units;
    },
    getCurrentLocationWeatherData(state:IWeatherState):IUnit {
      return state.currentLocationWeatherData;
    },
    getApiKey(state:IWeatherState): string {
      return state.apiKey;
    },
  },
};
