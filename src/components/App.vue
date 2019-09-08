<template>
  <div >
    <transition name="fade">
      <router-view @showToTopBtn='showToTopBtn' @hideToTopBtn='hideToTopBtn' />
    </transition>
    <div v-if="visibily" id="to-top" @click="scroll2top">
      <van-icon name="arrow-up" />
    </div>
    <van-tabbar v-if="$client.isMobile()">
      <van-tabbar-item @click.native='scroll2top'>文章</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toTopBtnVisibily: false,
    };
  },
  computed: {
    visibily() {
      if (this.$client.isPC()) {
        return this.toTopBtnVisibily;
      }
      return false;
    },
  },
  methods: {
    hideToTopBtn() {
      this.toTopBtnVisibily = false;
    },
    showToTopBtn() {
      this.toTopBtnVisibily = true;
    },
    scroll2top() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="less">
@import "../assets/styles/comm.less";
@import "../assets/styles/media.less";

#to-top {
  margin: 8px 0 0;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 36px;
  text-align: center;
  line-height: 50px;
  border-radius: 3px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 50px;
  z-index: 1;
}
</style>
