export interface IWeatherClouds {
  all:number
}
export interface IWeatherCoord {
  lat:number,
  lon:number
}
export interface IWeatherMain {
  // eslint-disable-next-line camelcase
  feels_like:number,
  humidity:number,
  pressure:number,
  temp:number,
  // eslint-disable-next-line camelcase
  temp_max:number,
  // eslint-disable-next-line camelcase
  temp_min:number
}
export interface IWeatherSys {
  country:string,
  id:number,
  sunrise:number,
  sunset:number,
  type:number
}
export interface IWeatherItem {
  description:string,
  icon:string,
  id:number,
  main:string
}
export interface IWeatherWind {
  deg:number,
  gust:number,
  speed:number
}
export interface IWeatherData {
  base:string,
  clouds:IWeatherClouds,
  cod:number,
  coord:IWeatherCoord,
  dt:number,
  id:number,
  main:IWeatherMain,
  name:string,
  sys:IWeatherSys,
  timezone:number,
  visibility:number,
  weather:Array<IWeatherItem>,
  wind:IWeatherWind
}
export type TWeather = null | IWeatherData
