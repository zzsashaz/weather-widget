import { IGeoLocation, IGeoLocationState, IRootState } from '@/types/store';
import { ActionContext } from 'vuex';
import { GEO_LOCATION_MUTATIONS } from '@/utils/constants';

export default {
  state: ():IGeoLocationState => ({
    location: {
      currentLatitude: 0,
      currentLongitude: 0,
    },
    isGeoLocationEnabled: false,
  }),
  actions: {
    requestCurrentGeoLocation(context:ActionContext<IGeoLocationState, IRootState>):void {
      navigator.geolocation.getCurrentPosition((location) => {
        context.commit(GEO_LOCATION_MUTATIONS.SET_CURRENT_LOCATION, location);
        context.commit(GEO_LOCATION_MUTATIONS.SET_GEO_LOCATION_STATUS, true);
      }, () => {
        context.commit(GEO_LOCATION_MUTATIONS.SET_GEO_LOCATION_STATUS, false);
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
    [GEO_LOCATION_MUTATIONS.SET_GEO_LOCATION_STATUS](state:IGeoLocationState, status:boolean):void {
      state.isGeoLocationEnabled = status;
    },
  },
  getters: {
    getCurrentGeoLocation(state:IGeoLocationState):IGeoLocation {
      return state.location;
    },
    getGeoLocationStatus(state:IGeoLocationState):boolean {
      return state.isGeoLocationEnabled;
    },
  },
};
