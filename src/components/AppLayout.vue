<template>
  <van-tabs v-model="activeId" swipeable>
    <van-tab v-for="item in tags" :title="item.name" :name="item.id" :key="item.id">
      <Comment :comment="comment" v-if="{comment}" />
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeId: '',
      comment: {
        avatarFrame: 18,
        avatarImage:
          'https://tx-free-imgs.acfun.cn/o_1cvf2r0jv1jeilj01guc8kh5u10.png' /* 挂件 */,
        cid: 85821822,
        content:
          '虽然说游戏可以治疗抑郁症，但是你给人家玩黑魂是几个意思[emot=ac,09/] [img=图片]https://imgs.aixifan.com/content/2019_08_23/1.5665199072906725E9.jpg[/img]',
        deviceModel: '网页端',
        floor: 1 /* 楼层 */,
        headUrl: [
          {
            cdn: 'thirdwx.qlogo.cn',
            url:
              'https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg' /* 头像 */,
            urlPattern: '',
          },
        ],
        imageUrl: '',
        isDelete: false,
        isSignedUpCollege: false,
        isUp: false,
        isUpDelete: false,
        nameRed: 1,
        postDate: '08-30 11: 24',
        quoteId: 10 /* 引用的评论ID */,
        sourceId: 10836491 /* 文章ID */,
        sourceType: 3,
        timestamp: 1567135494603,
        userId: 277511,
        userName: '腾讯老总马化腾',
        verified: 0,
      },
    };
  },
  watch: {
    activeId() {
      // this.$store.dispatch('changeActive', { activeId: this.activeId });
      this.changeActive({ activeId: this.activeId });
    },
  },
  methods: {
    ...mapActions(['changeActive']),
  },
  computed: {
    tags() {
      const channels = this.$db.getChannels();
      return channels;
    },
    channelIdReamIdMap() {
      let ret = [];
      const channels = this.$db.getChannels();
      for (let item of channels.values()) {
        ret.push([item.id, this.$db.getChannelReamIdsById(item.id)]);
      }
      console.log(ret);
      return new Map(ret);
    },
    ...mapGetters([
      'getArticlesByChannelId',
      'getActiveId',
      'getCurArticles',
      'getArticlesSet',
    ]),
  },
};
</script>
