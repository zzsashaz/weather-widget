export interface IGeoLocationState {
  currentLatitude:number,
  currentLongitude:number
}
export interface IRootState {
  geoLocation:IGeoLocationState
}
