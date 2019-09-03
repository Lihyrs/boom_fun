<template>
  <div>
    <a class="fc-avatar">
      <!-- 头像 -->
      <van-image radius="50%" class="avatar" lazy-load :src="data.headUrl" />
      <!-- 挂件 -->
      <van-image v-if="data.avatarImage" class="bzt" lazy-load :src="data.avatarImage" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.fc-avatar {
  position: relative;
  width: 80px;
  height: 70px;
  display: inline-block;

  .avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bzt {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
