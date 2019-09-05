<template>
  <div>
    <van-nav-bar title="评论列表" left-text="返回" left-arrow @click-left="back" />
    <div class="loading-wrap" v-if="remoteDataBusy">
      <van-loading type="spinner" />
    </div>
    <div v-else-if="getCurComments" class="comment-area">
      <Comments :comments="getCurComments" />
    </div>
    <div v-else>nothing</div>
    <!-- comments -->
    <!-- tabbar -->
    <!-- content in popup -->
    <van-tabbar safe-area-inset-bottom>
      <van-tabbar-item>
        <a :href="articleLink" :class="articleLink ? 'link' : 'nolink'" target="_blank">文章内容</a>
      </van-tabbar-item>
    </van-tabbar>
    <!-- <van-popup v-model="show"><ArticleContent :html='data.content' /></van-popup> -->
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import RemoteData from '../mixins/RemoteData';
import Comments from './Comments.vue';
import getArticleInfo from '../utils/getArticleInfo';
// import ArticleContent from './ArticleContent.vue';

// const baseUrl = 'https://www.acfun.cn/rest/pc-direct/comment/listByFloor';

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
      show: false,
    };
  },
  mounted() {
    // this.fetchResource(this.generateUrl());
    // this.getComments();
    // this.getArticle();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    showArticle() {
      this.show = true;
    },
    generateUrl() {
      const baseUrl = '/comment';
      const url = `${baseUrl}?sourceId=${this.id}&sourceType=3&page=${
        this.pageNo
      }&pivotCommentId=0&newPivotCommentId=0&_ts=${moment().format('x')}`;
      return url;
    },
    getArticle() {
      const baseUrl = '/article';
      this.fetchResource(`${baseUrl}/ac${this.id}`, {
        onSucess: this.getArticleOnSucess,
        onError: this.getArticleOnError,
        options: {
          responseType: 'text',
          headers: {
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'user-agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
          },
        },
      });
    },
    getArticleOnSucess(data) {
      // console.log(data);
      const parsedData = getArticleInfo(data);
      let ret = {};
      ret.content = parsedData.parts;
      ret.upInfo = parsedData.user;
      this.data = ret;
    },
    getArticleOnError(e) {
      console.log(e);
    },
    getComments() {
      this.fetchResource(this.generateUrl(), {
        name: 'article',
        onSucess: this.getCommentsOnSucess,
        onError: this.getCommentsOnError,
      });
    },
    getCommentsOnSucess(data) {
      this.updateCommentData({ comment: data });
    },
    getCommentsOnError(err) {
      console.log(err);
    },
    ...mapActions(['updateCommentData']),
  },
  computed: {
    ...mapGetters(['getCurComments']),
    articleLink() {
      return this.id ? `https://www.acfun.cn/a/ac${this.id}` : '';
    },
  },
};
</script>

<style lang="less" scoped>
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
