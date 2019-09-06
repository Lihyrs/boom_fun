<template>
  <div>
    <van-pull-refresh v-if="getCurArticles" v-model="refreshing" @refresh="refresh">
      <van-list
        v-model="loadMoring"
        :loading-text="loadMoringText"
        :finished-text="loadAllText"
        :finished="finished"
        :error.sync="loadMoreError"
        :error-text="loadMoringErrorText"
        @load="loadMore"
        class="art-list"
      >
        <ArticleListItem v-for="item in getCurArticles.articleList" :data="item" :key="item.id"/>
      </van-list>
    </van-pull-refresh>
    <LoadingView v-else :error="hasRemoteErrors" :loading="remoteDataBusy" @reload="reloadOnError" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { aritcleListData } from '../assets/testData';
import ArticleListItem from './ArticleListItem.vue';
import RemoteData from '../mixins/RemoteData';

const LOAD_MORE = 'LOAD_MORE';
const REFRESH = 'REFRESH';

const baseUrl = 'https://webapi.acfun.cn/query/article/list?';

export default {
  components: {
    ArticleListItem,
  },
  mixins: [RemoteData({ url: 'afdf', name: 'articleList' })],
  data() {
    return {
      loadMoring: false,
      refreshing: false,
      loadMoreError: false,
      type: '',
      pageNo: 1,
    };
  },
  mounted() {
    // for dev
    // this.updateCurArticles({
    //   activeId: this.getActiveId,
    //   data: aritcleListData,
    // });
    this.refresh();
  },
  methods: {
    refresh() {
      this.pageNo = 1;
      this.type = REFRESH;
      this.refreshing = true;
      this.getArticles(this.generateUrl(this.pageNo));
    },
    loadMore() {
      this.type = LOAD_MORE;
      this.getArticles(this.generateUrl(++this.pageNo));
    },
    reloadOnError() {
      this.getArticles(this.generateUrl(this.pageNo));
    },
    generateUrl(pageNo) {
      const channelId = this.getActiveId;
      let reamIds = this.getChannelReamIdsByChannelId(channelId);
      if (!channelId || !reamIds) {
        return '';
      }

      reamIds = encodeURIComponent(reamIds.join(','));
      const queryStr = `pageNo=${pageNo}&size=10&realmIds=${reamIds}&originalOnly=false&orderType=3&periodType=-1&filterTitleImage=true`;
      return baseUrl + queryStr;
    },
    getArticles(url) {
      this.fetchResource(url, {
        onSucess: this.getArticlesOnSucess,
        onError: this.getArticlesOnError,
        options: {
          headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/json',
          },
          mode: 'no-cors',
        },
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
      this.doOnError();
      this.doFetchEnd();
    },
    doFetchEnd() {
      if (this.type === REFRESH) {
        this.refreshing = false;
      } else if (this.type === LOAD_MORE) {
        this.loadMoring = false;
      }
    },
    doOnError() {
      // console.log(this.remoteErrors, this.hasRemoteErrors);
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
    ...mapGetters([
      'getCurArticles',
      'getActiveId',
      'getChannelReamIdsByChannelId',
    ]),
  },
};
</script>

<style lang="less" scoped>
.art-list {
  padding-top: 20px;
  /deep/ .item-wrap {
    &::before {
      content: "";
      display: block;
      height: 1px;
      margin: 20px 0;
      width: 100%;
      background: #e6e6e6;
    }

    &:first-of-type {
      &::before {
        display: none;
      }
    }
  }
}
</style>
