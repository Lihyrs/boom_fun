<template>
  <van-cell title-class="uname" :title="comment.userName" :value="floor" :border="false"></van-cell>
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
  computed: {
    floor() {
      if (this.showFloor) {
        return `#${this.comment.floor}`;
      }
      return '';
    },
  },
};
</script>
