import Vue from 'vue';
import Vuex from 'vuex';
import geoLocation from '@/store/modules/geoLocation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    geoLocation,
  },
});
