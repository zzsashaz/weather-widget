<template>
  <div class="icon-body" v-html="icon"/>
</template>

<script lang="ts">

import Vue, { PropType } from 'vue';
import ICONS from '@/utils/icons';
import { IIconsTypes } from '@/types/constants';

export default Vue.extend({
  name: 'icon',
  props: {
    iconType: {
      type: String as PropType<IIconsTypes>,
      required: true,
    },
  },
  computed: {
    icon():string {
      return ICONS[this.iconType];
    },
  },
  data() {
    return {
      ICONS,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-body {
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>
