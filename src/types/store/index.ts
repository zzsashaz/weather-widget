export interface IGeoLocation {
  currentLatitude:number,
  currentLongitude:number,
}
export interface IGeoLocationState {
  location:IGeoLocation
  isGeoLocationEnabled:boolean
}
export type IUnit = 'metric' | 'standard' | 'imperial'
export interface IWeatherState {
  units: IUnit
  currentLocationWeatherData: any
  apiKey: string
  isApiAvailable:boolean
}
export interface IRootState {
  geoLocation:IGeoLocationState
  weather:IWeatherState
}
