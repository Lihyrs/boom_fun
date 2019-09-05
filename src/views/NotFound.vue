<template>
  <div class="main">
    <img class="img404" src="../assets/imgs/404img.png" alt="404" />
    <div>
      <router-link :to="{name:'home'}">
        <van-button type="danger">返回首页</van-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 233px;
  text-align: center;

  .img404 {
    padding-top: 68px;
    padding-bottom: 48px;
    width: 282px;
    height: 218px;
  }
}
</style>
