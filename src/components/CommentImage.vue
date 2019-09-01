<template>
  <div class="row" @click="showImg">
    <span class="s-code" v-if="showShortCode">{{data.shortCode}}</span>
    <van-image v-else lazy-load :src="data.url" />
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { IMG_IN_COMMENT, EMOT_IN_COMMENT } from '../types';

export default {
  props: {
    data: {
      type: Object,
    },
    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    showImg() {
      if (this.type === EMOT_IN_COMMENT) {
        return;
      }
      ImagePreview({
        images: [this.data.url],
        showIndex: false,
        lazyLoad: true,
        closeOnPopstate: true,
      });
    },
  },
  computed: {
    showShortCode() {
      return this.type === IMG_IN_COMMENT && this.data.shortCode;
    },
  },
};
</script>

<style lang="less" scoped>
.s-code {
  color: #1989fa;
  &:hover {
    cursor: pointer;
    //color: #07c160;
  }
}

.row {
  display: inline-block;
}
</style>
