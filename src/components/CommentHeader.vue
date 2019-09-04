<template>
  <!-- begin of comment header -->
  <van-row class="comment-header" v-if="visibily">
    <!-- username -->
    <van-col span="12">
      <span class="uname">{{username}}</span>
    </van-col>
    <!-- floor -->
    <van-col class="floor" span="12"  v-if="showFloor">
      <span >{{floor}}</span>
    </van-col>
  </van-row>
  <!-- end of comment header -->
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
    visibily: {
      type: Boolean,
      default: true,
    },
    cusClass: {
      type: String,
    },
  },
  computed: {
    floor() {
      if (this.showFloor) {
        return `#${this.comment.floor}`;
      }
      return '';
    },
    username() {
      return this.comment.userName;
    },
    getClass() {
      return this.cusClass;
    },
  },
};
</script>

<style lang="less" scoped>
.floor{
  text-align: end
}
</style>
