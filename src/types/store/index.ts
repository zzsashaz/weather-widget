import type { IWeatherData, TWeather } from '@/types/api';

export interface IGeoLocation {
  currentLatitude:number,
  currentLongitude:number,
}

export interface IGeoLocationState {
  location:IGeoLocation
  isGeoLocationEnabled:boolean
}
export type IUnit = 'metric' | 'imperial'

export interface ICitiesWeatherData {
  [key: string]:IWeatherData
}

export interface IWeatherState {
  units: IUnit
  currentLocationWeatherData: TWeather
  apiKey: string
  isApiAvailable:boolean,
  citiesWeather: ICitiesWeatherData
}

export interface IRootState {
  geoLocation:IGeoLocationState
  weather:IWeatherState
}
