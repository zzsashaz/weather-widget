import Vue from 'vue';
import declareGlobalComponents from '@/components/plugins/declareGlobalComponents';
import App from './App.vue';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

const tagName = document.currentScript?.getAttribute('widget-selector');

declareGlobalComponents();

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount(tagName || 'weather-widget');
