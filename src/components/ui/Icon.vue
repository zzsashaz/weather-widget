<template>
  <div
    class="icon-body"
    :class="{'icon-body_clickable':clickable}"
    @click="onClick"
    v-html="icon"
  />
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
    clickable: {
      type: Boolean,
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
  methods: {
    onClick() {
      if (this.clickable) {
        this.$emit('click');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.icon-body {
  display: inline-block;
  width: 24px;
  height: 24px;
  &_clickable {
    cursor: pointer;
  }
}
</style>
