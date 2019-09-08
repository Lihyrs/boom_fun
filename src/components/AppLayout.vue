<template>
  <van-tabs v-model="activeId" swipeable sticky @change="handleChange">
    <van-tab v-for="item in tags" :title="item.name" :name="item.id" :key="item.id">
      <div class="art-list-container">
        <ArticleList />
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeId: '',
      scrollTops: {},
    };
  },
  watch: {
    activeId(newVal) {
      this.changeActive({ activeId: newVal });
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleChange(obj) {
      const offset = this.scrollTops[`${obj}`];
      window.scrollTo(0, offset);
      if (offset) {
        if (offset >= 300) {
          this.$emit('showToTopBtn');
        }
      } else {
        this.$emit('hideToTopBtn');
      }
      // this.changeActive({ activeId: newVal });
    },
    handleScroll() {
      let ret;
      if (document.compatMode === 'CSS1Compat') {
        ret = document.documentElement.scrollTop;
      } else {
        ret = document.body.scrollTop;
      }
      if (ret >= 300) {
        this.$emit('showToTopBtn');
      } else {
        this.$emit('hideToTopBtn');
      }
      this.scrollTops[`${this.activeId}`] = ret || this.scrollTops[`${this.activeId}`] || 0;
    },
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
