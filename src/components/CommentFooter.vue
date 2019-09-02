<template>
  <van-cell class="footer" :title="comment.postDate" :border="false"></van-cell>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.footer {
  padding-left: 0;
  padding-right: 0;
}
</style>
