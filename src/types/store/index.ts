import type { TWeather } from '@/types/api';

export interface IGeoLocation {
  currentLatitude:number,
  currentLongitude:number,
}
export interface IGeoLocationState {
  location:IGeoLocation
  isGeoLocationEnabled:boolean
}
export type IUnit = 'metric' | 'imperial'
export interface IWeatherState {
  units: IUnit
  currentLocationWeatherData: TWeather
  apiKey: string
  isApiAvailable:boolean
}
export interface IRootState {
  geoLocation:IGeoLocationState
  weather:IWeatherState
}
