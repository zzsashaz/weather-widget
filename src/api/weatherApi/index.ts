import HTTPClient from '@/api/HTTPClient';
import { WEATHER_API_URL } from '@/utils/constants';
import { IGeoLocation, IUnit } from '@/types/store';
import { IWeatherData } from '@/types/api';

export const fetchWeatherDataByCoordinates = async (
  { currentLatitude, currentLongitude }:IGeoLocation,
  units:IUnit,
  apiKey:string,
):Promise<IWeatherData> => {
  const { data } = await HTTPClient.$get(`${WEATHER_API_URL}`, {
    params: {
      lat: currentLatitude, lon: currentLongitude, appid: apiKey, units,
    },
  });
  return data;
};

export const fetchWeatherDataByName = async (
  cityName:string,
  units:IUnit,
  apiKey:string,
):Promise<IWeatherData> => {
  const { data } = await HTTPClient.$get(`${WEATHER_API_URL}`, { params: { q: cityName, appid: apiKey, units } });
  return data;
};
