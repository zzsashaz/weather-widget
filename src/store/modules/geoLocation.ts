import { IGeoLocation, IGeoLocationState, IRootState } from '@/types/store';
import { ActionContext } from 'vuex';
import { GEO_LOCATION_MUTATIONS } from '@/utils/constants';

export default {
  state: ():IGeoLocationState => ({
    location: {
      currentLatitude: 0,
      currentLongitude: 0,
    },
    isGeoLocationFailed: false,
  }),
  actions: {
    requestCurrentGeoLocation(context:ActionContext<IGeoLocationState, IRootState>):void {
      navigator.geolocation.getCurrentPosition((location) => {
        context.commit(GEO_LOCATION_MUTATIONS.SET_CURRENT_LOCATION, location);
      }, () => {
        context.commit(GEO_LOCATION_MUTATIONS.SET_GEO_LOCATION_FAILED);
      });
    },
  },
  mutations: {
    [GEO_LOCATION_MUTATIONS.SET_CURRENT_LOCATION](
      state:IGeoLocationState,
      location:GeolocationPosition,
    ):void {
      state.location = {
        currentLatitude: location.coords.latitude,
        currentLongitude: location.coords.longitude,
      };
    },
    [GEO_LOCATION_MUTATIONS.SET_GEO_LOCATION_FAILED](state:IGeoLocationState):void {
      state.isGeoLocationFailed = true;
    },
  },
  getters: {
    getCurrentGeoLocation(state:IGeoLocationState):IGeoLocation {
      return state.location;
    },
    getGeoLocationStatus(state:IGeoLocationState):boolean {
      return state.isGeoLocationFailed;
    },
  },
};
