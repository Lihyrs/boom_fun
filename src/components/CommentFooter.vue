<template>
  <van-row v-if="comment.postDate" class="footer comm-footer">
    <van-col>
      <span class="post-time">发表于 {{comment.postDate}}</span>
      <span class="post-dev" v-if="isPC">来自 {{comment.deviceModel}}</span>
    </van-col>
  </van-row>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isPC() {
      return this.$client.isPC();
    },
  },
};
</script>

<style lang="less" scoped>
.post-time{
  margin-right:10px
}
</style>
