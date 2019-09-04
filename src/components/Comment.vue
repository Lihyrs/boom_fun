<script>
import { COMMENT_TYPE, SYS_PLATFORM_TYPE } from '../types';

import CommentLayout from './CommentLayout.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: COMMENT_TYPE.MAIN,
    },
    quoteUser: {
      type: Object,
      default: null,
    },
    quoteComments: {
      type: Array,
    },
  },
  components: {
    CommentLayout,
  },

  computed: {
    commentLayout() {
      let ret = {};
      const width = 24;
      const type = this.$store.getters.getPlatformType;
      const { PC, MOBILE } = SYS_PLATFORM_TYPE;
      if (type === PC) {
        ret.offset = 4;
        ret.span = width - (ret.offset * 2);
      } else if (type === MOBILE) {
        ret.offset = 1;
        ret.span = width - (ret.offset * 2);
      }

      return ret;
    },
    getClass() {
      let ret = [];
      const { PC, MOBILE } = SYS_PLATFORM_TYPE;
      const type = this.$store.getters.getPlatformType;
      if (type === PC) {
        // nothing to do
      } else if (type === MOBILE) {
        ret.push('mobile');
      }

      return ret.join(' ');
    },
  },

  render(h) {
    let qComments = this.quoteComments;
    const hasQuoteComment = !!qComments.length;
    let quoteCommentCount = 0;
    const { span, offset } = this.commentLayout;

    const renderQuoteComment = function (arr) {
      const data = arr[0];
      if (!data) {
        return null;
      }

      quoteCommentCount++;

      return (
        <CommentLayout
          comment={arr[0].payload}
          type={COMMENT_TYPE.QUOTE}
          quoteUser={arr[0].quoteUser}
          hasQuoteComment={arr.length > 1}
          isFirstQuoteComment={quoteCommentCount === 1}
        >
          {renderQuoteComment(arr.slice(1))}
        </CommentLayout>
      );
    };

    return (
      <van-row class={`comment-list ${this.getClass}`}>
        <van-col span={span} offset={offset}>
          <CommentLayout
            comment={this.comment}
            type={COMMENT_TYPE.MAIN}
            hasQuoteComment={hasQuoteComment}
          >
            {renderQuoteComment(qComments)}
          </CommentLayout>
        </van-col>
      </van-row>
    );
  },
};
</script>

<style lang="less" scoped>
.comment-list {
  margin-bottom: 20px;
}

.main-comment-item {
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0 5px;
}
</style>
