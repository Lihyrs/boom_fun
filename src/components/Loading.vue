<template>
  <div v-if="error || loading" class="loading"  @click="$emit('reload')"  >
    <van-row v-if="error" class="load-err">
      <van-col span="24">
        <img class="err-img" src="../assets/imgs/q_err_img.png" />
      </van-col>
      <van-col span="24">
        <span class="err-txt">加载出了点问题</span>
      </van-col>
      <van-col span="24">
        <span class="tip">点击重新加载</span>
      </van-col>
    </van-row>
    <van-row class="spinner" v-else-if="loading">
      <van-col>
        <van-loading size="60" type="spinner" color="#fd4c5d" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: [Boolean, String, Number],
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
.load-err {
  & > .van-col {
    text-align: center;
    margin-bottom: 10px;
  }

  .err-img {
    width: 150px;
    height: auto;
  }

  .err-txt,.tip {

    color: #999;
  }

  .tip{
       font-size: 18px;
  }
}

.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  bottom:50px;
  z-index: 1;
  .load-err,.spinner{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%)
  }
}
</style>
