<template>
  <van-row gutter="10">
    <van-col>{{comment.postDate}}</van-col>
    <van-col>{{comment.deviceModel}}</van-col>
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
};
</script>
