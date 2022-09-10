import Vue from 'vue';
import Vuex from 'vuex';
import geoLocation from '@/store/modules/geoLocation';
import weather from '@/store/modules/weather';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    geoLocation,
    weather,
  },
});
