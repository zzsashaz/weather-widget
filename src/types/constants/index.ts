import ICONS from '@/utils/icons';

export interface IGeoLocationMutations {
  SET_CURRENT_LOCATION:string
  SET_GEO_LOCATION_STATUS:string
}
export interface IWeatherMutations {
  SET_CURRENT_LOCATION_WEATHER:string,
  SET_API_KEY:string,
  SET_API_STATUS:string,
  SET_UNITS_FORMAT:string,
  UPDATE_CITY_MAP:string,
  DELETE_CITY_FROM_MAP: string
}
export type IIconsTypes = keyof typeof ICONS
