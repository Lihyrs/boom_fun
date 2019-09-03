<template>
  <van-tabs v-model="activeId" swipeable>
    <van-tab v-for="item in tags" :title="item.name" :name="item.id" :key="item.id">
      <ArticleList />
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeId: '',
    };
  },
  watch: {
    activeId() {
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
