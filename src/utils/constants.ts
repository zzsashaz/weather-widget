import { IGeoLocationMutations, IWeatherMutations } from '@/types/constants';

export const GEO_LOCATION_MUTATIONS:IGeoLocationMutations = {
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_GEO_LOCATION_STATUS: 'SET_GEO_LOCATION_STATUS',
};

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather/';

export const WEATHER_MUTATIONS:IWeatherMutations = {
  SET_CURRENT_LOCATION_WEATHER: 'SET_CURRENT_LOCATION_WEATHER',
  SET_API_KEY: 'SET_API_KEY',
  SET_API_STATUS: 'SET_API_STATUS',
  SET_UNITS_FORMAT: 'SET_UNITS_FORMAT',
  UPDATE_CITY_MAP: 'UPDATE_CITY_MAP',
  DELETE_CITY_FROM_MAP: 'DELETE_CITY_FROM_MAP',
};
