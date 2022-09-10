<template>
  <div id="widget" class="widget">
    <div class="widget__header">Header</div>
    <div class="widget__body">Body</div>
    <div class="widget__footer">Footer</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'widget',
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
