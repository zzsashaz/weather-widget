import { IRootState, IUnit, IWeatherState } from '@/types/store';
import { ActionContext } from 'vuex';
import { fetchWeatherDataByCoordinates } from '@/api/weatherApi';
import { WEATHER_MUTATIONS } from '@/utils/constants';

export default {
  state: ():IWeatherState => ({
    units: 'metric',
    currentLocationWeatherData: null,
    apiKey: '',
    isApiAvailable: true,
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
  },
  mutations: {
    [WEATHER_MUTATIONS.SET_CURRENT_LOCATION_WEATHER](state:IWeatherState, weatherData:any):void {
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
    getApiStatus(state:IWeatherState): boolean {
      return state.isApiAvailable;
    },
  },
};
