<template>
    <span v-if="content" v-html="content" ></span>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
    },
  },
};
</script>
