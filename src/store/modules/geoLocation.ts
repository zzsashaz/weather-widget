import { IGeoLocationState, IRootState } from '@/types/store';
import { ActionContext } from 'vuex';
import { GEO_LOCATION_MUTATIONS } from '@/utils/constants';

export default {
  state: ():IGeoLocationState => ({
    currentLatitude: 0,
    currentLongitude: 0,
  }),
  actions: {
    requestCurrentGeoLocation(context:ActionContext<IGeoLocationState, IRootState>):void {
      navigator.geolocation.getCurrentPosition((location) => {
        context.commit(GEO_LOCATION_MUTATIONS.SET_CURRENT_LOCATION, location);
      });
    },
  },
  mutations: {
    [GEO_LOCATION_MUTATIONS.SET_CURRENT_LOCATION](
      state:IGeoLocationState,
      location:GeolocationPosition,
    ) {
      state.currentLatitude = location.coords.latitude;
      state.currentLongitude = location.coords.longitude;
    },
  },
  getters: {
    getCurrentGeoLocation(state:IGeoLocationState):IGeoLocationState {
      return {
        currentLatitude: state.currentLatitude,
        currentLongitude: state.currentLongitude,
      };
    },
  },
};
