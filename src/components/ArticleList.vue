<template>
  <div>
    <van-pull-refresh v-if="articleList" v-model="refreshing" @refresh="refresh">
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
        <ArticleListItem v-for="(item,idx) in articleList" :data="item" :key="item.id" :divider='idx !== articleList.lengtht'/>
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
import { HOST } from '../types';

const LOAD_MORE = 'LOAD_MORE';
const REFRESH = 'REFRESH';

// const baseUrl = `${HOST}/articles`;
const baseUrl = '/articles';

export default {
  components: {
    ArticleListItem,
  },
  mixins: [RemoteData({ name: 'articleList' })],
  data() {
    return {
      loadMoring: false,
      refreshing: false,
      loadMoreError: false,
      type: '',
      pageNo: 1,
      totalPage: -1,
    };
  },
  mounted() {
    // for dev
    // console.log(aritcleListData);
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
      return `${baseUrl}?${queryStr}`;
    },
    getArticles(url) {
      this.fetchResource(url, {
        onSucess: this.getArticlesOnSucess,
        onError: this.getArticlesOnError,
        options: {
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/json',
          // },
          // mode: 'no-cors',
        },
      });
    },
    getArticlesOnSucess(res) {
      let ret = [];

      if (this.type === LOAD_MORE) {
        let tmp = this.getCurArticles || [];
        ret = ret.concat(tmp, [res.data]);
      } else if (this.type === REFRESH) {
        ret = [res.data];
      }
      // 防止请求最后一页显示没有更多了
      this.totalPage = res.data.totalPage + 1;
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
    articleList() {
      let ret = [];
      if (!this.getCurArticles) {
        return '';
      }
      for (let item of (this.getCurArticles)) {
        ret = ret.concat(item.articleList);
      }

      return ret;
    },
    finished() {
      return this.totalPage !== -1 && this.totalPage === this.pageNo + 1;
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
