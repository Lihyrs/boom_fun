<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <van-list
      v-model="loadMoring"
      :loading-text="loadMoringText"
      :finished-text="loadAllText"
      :finished="finished"
      :error.sync="loadMoreError"
      :error-text="loadMoringErrorText"
      @load="loadMore"
      v-if="getCurArticles"
    >
      <ArticleListItem v-for="item in getCurArticles.articleList" :data="item" :key="item.id" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { aritcleListData } from '../assets/testData';
import ArticleListItem from './ArticleListItem.vue';
import RemoteData from '../mixins/RemoteData';

const LOAD_MORE = 'LOAD_MORE';
const REFRESH = 'REFRESH';

export default {
  components: {
    ArticleListItem,
  },
  mixins: [RemoteData({ url: 'afdf' })],
  data() {
    return {
      loadMoring: false,
      refreshing: false,
      loadMoreError: false,
      type: '',
      pageNo: 1,
    };
  },

  methods: {
    refresh() {
      this.pageNo = 1;
      this.type = REFRESH;
      this.refreshing = true;
      this.getArticles(`afdf?${this.pageNo}`);
    },
    loadMore() {
      this.type = LOAD_MORE;
      this.getArticles(`afdf?${++this.pageNo}`);
    },
    getArticles(url) {
      this.fetchResource(url, {
        onSucess: this.getArticlesOnSucess,
        onError: this.getArticlesOnError,
      });
    },
    getArticlesOnSucess(data) {
      let ret = {};

      if (this.type === LOAD_MORE) {
        ret = this.getCurArticles();
        ret.articleList.push(data.articleList);
      } else if (this.type === REFRESH) {
        ret = data;
      }
      this.updateCurArticles({ activeId: this.getActiveId, data: ret });
      this.doFetchEnd();
    },
    getArticlesOnError(err) {
      if (this.type === LOAD_MORE) {
        this.pageNo--;
        this.loadMoreError = true;
      }
      this.doFetchEnd();
    },
    doFetchEnd() {
      if (this.type === REFRESH) {
        this.refreshing = false;
      } else if (this.type === LOAD_MORE) {
        this.loadMoring = false;
      }
    },
    ...mapActions(['updateCurArticles', 'updateActiveId']),
  },
  computed: {
    finished() {
      return false;
    },
    loadMoringText() {
      return 'loading...';
    },
    loadAllText() {
      return '没有更多了';
    },
    loadMoringErrorText() {
      return '请求失败，点击重新加载';
    },
    ...mapGetters(['getCurArticles', 'getActiveId']),
  },
};
</script>
