import { IGeoLocationMutations, IWeatherMutations } from '@/types/constants';

export const GEO_LOCATION_MUTATIONS:IGeoLocationMutations = {
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_GEO_LOCATION_FAILED: 'SET_GEO_LOCATION_FAILED',
};
export const WEATHER_API_KEY = '2a81b7809d21bf2cb2ec1d64b02ab952';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather/';
export const WEATHER_MUTATIONS:IWeatherMutations = {
  SET_CURRENT_LOCATION_WEATHER: 'SET_CURRENT_LOCATION_WEATHER',
};
