<template>
  <div class="content">
    <div v-if="username && isQuote" class="qtd-comm-header" >
      <span class="uname">{{username}}</span>
      <template v-if="quoteUserName">
        <span>回复</span>
        <span class="uname">{{quoteUserName}}</span>
      </template>
      <span >:</span>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
    },
    quoteUser: {
      type: Object,
    },
    isQuote: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    username() {
      return this.userInfo ? this.userInfo.username : '';
    },
    quoteUserName() {
      return this.quoteUser.userName;
    },
  },
};
</script>

<style lang="less" scoped>
.qtd-comm-header{
    display: inline;
}
</style>
