<template>
<div class="header">
  <div class="header__refresh">
    <icon v-if="!coolDownSeconds" icon-type="refresh" clickable @click="refreshData"/>
    <span v-if="coolDownSeconds">{{$t('measures.seconds',{ value:this.coolDownSeconds })}}</span>
  </div>
  <icon icon-type="gear" clickable/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'widget-header',
  data() {
    return {
      coolDownSeconds: 0,
      coolDownIntervalId: 0,
    };
  },
  methods: {
    async refreshData() {
      await this.$store.dispatch('fetchCurrentLocationWeatherData');
      this.initRefreshCoolDown(30);
    },
    initRefreshCoolDown(seconds:number) {
      this.coolDownSeconds = seconds;
      this.coolDownIntervalId = setInterval(() => {
        this.coolDownSeconds -= 1;
        if (this.coolDownSeconds === 0) {
          clearInterval(this.coolDownIntervalId);
        }
      }, 1000);
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
