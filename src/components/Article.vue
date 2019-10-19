<template>
  <div>
    <van-nav-bar title="评论列表" left-text="返回" left-arrow @click-left="back" fixed />
    <template v-if="comments.length">
      <div class="comment-area">
        <van-list
          v-model="loadMoring"
          :loading-text="loadMoringText"
          :finished-text="loadAllText"
          :finished="finished"
          :error.sync="loadMoreError"
          :error-text="loadMoringErrorText"
          @load="loadMore"
        >
          <Comments v-for="comment in comments" :comments="comment" :key="comment.pageNo" />
        </van-list>
      </div>
      <van-tabbar safe-area-inset-bottom @change="scroll2Top($event)">
        <van-tabbar-item>
          <a :href="articleLink" :class="articleLink ? 'link' : 'nolink'" target="_blank">文章内容</a>
        </van-tabbar-item>
        <van-tabbar-item icon="comment-o" :info="commentTopCount" />
      </van-tabbar>
    </template>
    <!-- <van-popup v-model="show"><ArticleContent :html='data.content' /></van-popup> -->
    <LoadingView v-else :error="hasRemoteErrors" :loading="remoteDataBusy" @reload="getComments" />
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import RemoteData from '../mixins/RemoteData';
import Comments from './Comments.vue';
import { HOST } from '../types';
// import getArticleInfo from '../utils/getArticleInfo';
// import ArticleContent from './ArticleContent.vue';

// const baseUrl = 'https://www.acfun.cn/rest/pc-direct/comment/listByFloor';
const LOAD_MORE = 'LOAD_MORE';
// const REFRESH = 'REFRESH';

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    channelId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    Comments,
    // ArticleContent,
  },
  mixins: [RemoteData({ name: 'article' })],
  data() {
    return {
      pageNo: 1,
      article: {},
      loadMoring: false,
      loadMoreError: false,
      totalPage: -1,
      comments: [],
      type: '',
    };
  },
  mounted() {
    // this.fetchResource(this.generateUrl());
    this.getComments(this.pageNo);
    // this.getArticle();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    // showArticle() {
    //   this.show = true;
    // },

    loadMore() {
      this.type = LOAD_MORE;
      this.getComments(++this.pageNo);
    },

    generateUrl(pageNo) {
      // const baseUrl = `${HOST}/comment`;
      // for dev
      const baseUrl = '/comment';
      const url = `${baseUrl}?sourceId=${
        this.id
      }&sourceType=3&page=${pageNo}&pivotCommentId=0&newPivotCommentId=0&_ts=${moment().format(
        'x',
      )}`;
      return url;
    },

    // TODO
    // getArticle() {
    //   const baseUrl = '/article';
    //   this.fetchResource(`${baseUrl}/ac${this.id}`, {
    //     onSucess: this.getArticleOnSucess,
    //     onError: this.getArticleOnError,
    //     options: {
    //       responseType: 'text',
    //       headers: {
    //         Accept:
    //           'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;
    // q=0.8,application/signed-exchange;v=b3',
    //         'user-agent':
    //           'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38
    // (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    //       },
    //     },
    //   });
    // },
    // getArticleOnSucess(data) {
    //   // console.log(data);
    //   const parsedData = getArticleInfo(data);
    //   let ret = {};
    //   ret.content = parsedData.parts;
    //   ret.upInfo = parsedData.user;
    //   this.data = ret;
    // },
    // getArticleOnError(e) {
    //   console.log(e);
    // },

    getComments(pageNo) {
      this.fetchResource(this.generateUrl(pageNo), {
        name: 'article',
        onSucess: this.getCommentsOnSucess,
        onError: this.getCommentsOnError,
        options: {
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/json',
          // },
          // mode: 'no-cors',
        },
      });
    },

    getCommentsOnSucess(data) {
      // 防止请求最后一页显示没有更多了
      this.totalPage = data.totalPage + 1;
      this.comments.push(data);
      this.updateCommentData({ comment: [...this.comments] });
    },

    getCommentsOnError(err) {
      if (this.type === LOAD_MORE) {
        this.type = '';
        this.pageNo--;
        this.loadMoring = false;
        this.loadMoreError = this.hasRemoteErrors;
      }
      // console.log(err);
    },

    scroll2Top(active) {
      if (active === 1) {
        window.scrollTo(0, 0);
      }
    },

    ...mapActions(['updateCommentData']),
  },
  computed: {
    commentTopCount() {
      if (this.comments.length) {
        const totalCount = this.comments[0].totalCount;

        if (totalCount > 999 && this.$client.isMobile()) {
          return '999+';
        }
        return totalCount;
      }

      return 0;
    },

    articleLink() {
      return this.id ? `https://www.acfun.cn/a/ac${this.id}` : '';
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

    finished() {
      return this.totalPage !== -1 && this.totalPage === this.pageNo + 1;
    },

    ...mapGetters(['getCurComments']),
  },
};
</script>

<style lang="less" scoped>
.comment-area {
  margin-top: 50px;
}
.loading-wrap {
  text-align: center;
}

.link {
  color: #1989fa;
  &:hover,
  &:active,
  &:visited {
    color: #1989fa;
  }
}

.nolink {
  color: #999;
  cursor: default;
  &:hover,
  &:active,
  &:visited {
    color: #999;
  }
}
</style>
