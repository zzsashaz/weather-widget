import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const tagName = document.currentScript?.getAttribute('widget-selector');

new Vue({
  store,
  render: (h) => h(App),
}).$mount(tagName || 'weather-widget');
