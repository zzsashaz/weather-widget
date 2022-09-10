import ICONS from '@/utils/icons';

export interface IGeoLocationMutations {
  SET_CURRENT_LOCATION:string
  SET_GEO_LOCATION_FAILED:string
}
export interface IWeatherMutations {
  SET_CURRENT_LOCATION_WEATHER:string,
  SET_API_KEY:string
}
export type IIconsTypes = keyof typeof ICONS
