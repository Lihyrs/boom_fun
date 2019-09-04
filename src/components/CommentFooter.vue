<template>
  <van-row v-if="comment.postDate"><van-col>发表于 {{comment.postDate}}</van-col></van-row>
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
