<template>
  <div id="widget" class="widget">
    <div class="widget__header">Header</div>
    <div class="widget__body">Body</div>
    <div class="widget__footer">Footer</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'widget',
  mounted() {
    this.$store.dispatch('requestCurrentGeoLocation');
  },
  computed: {
    ...mapGetters({
      geoLocation: 'getCurrentGeoLocation',
    }),
  },
  watch: {
    geoLocation() {
      console.log(this.geoLocation);
    },
  },
});
</script>

<style lang="scss" scoped>
.widget {
  background: $widget-background;
  &__header {

  }
  &__body {

  }
  &__footer {

  }
}
</style>
