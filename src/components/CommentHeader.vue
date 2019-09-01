<template>
  <van-row type="flex" justify="space-between">
    <van-col>{{comment.userName}}</van-col>
    <van-col v-if="showFloor">{{'#' + comment.floor}}</van-col>
  </van-row>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    showFloor: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
