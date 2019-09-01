<template>
  <van-row type="flex" justify="space-between">
    <van-col>{{comment.userName}}</van-col>
    <van-col>{{'#' + comment.floor}}</van-col>
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
