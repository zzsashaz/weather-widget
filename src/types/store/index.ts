export interface IGeoLocation {
  currentLatitude:number,
  currentLongitude:number,
}
export interface IGeoLocationState {
  location:IGeoLocation
  isGeoLocationFailed:boolean
}
export type IUnit = 'metric' | 'standard' | 'imperial'
export interface IWeatherState {
  units: IUnit
  currentLocationWeatherData: any
}
export interface IRootState {
  geoLocation:IGeoLocationState
  weather:IWeatherState
}
