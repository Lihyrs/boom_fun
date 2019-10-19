<template>
  <!-- begin of comment header -->
  <div class="comment-header" v-if="visibily">
    <!-- username -->
    <span class="floor">{{floor}}</span>
    <span v-if="username" class="uname">{{username}}</span>
    <!-- for insert : -->
    <slot v-if="username" />
  </div>
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
