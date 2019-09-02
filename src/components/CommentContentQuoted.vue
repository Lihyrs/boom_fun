<script>
import { EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT } from '../types';
import CommentImage from './CommentImage.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentImage,
  },
  computed: {
    quoteUserInfo() {
      return { username: 'abc' };
    },
  },
  render(h) {
    const quoteUser = this.quoteUserInfo.username
      ? this.quoteUserInfo.username
      : '';

    return (
      <van-cell class="inr-cell comment">
        <template slot="title">
          <span class="uname">{this.comment.userName}</span>
          {quoteUser && '回复 '}
          <span class="uname">{quoteUser && quoteUser}</span>:
        </template>
        <van-cell class="content" slot="label">
          <template slot="title">
            {this.comment.content.map((obj) => {
              let ret = '';
              if (obj.type === TEXT_IN_COMMENT) {
                ret = <span>{obj.payload}</span>;
              } else if (
                obj.type === EMOT_IN_COMMENT
                || obj.type === IMG_IN_COMMENT
              ) {
                ret = <CommentImage data={obj.payload} type={obj.type} />;
              }
              return ret;
            })}
          </template>
        </van-cell>
      </van-cell>
    );
  },
};
</script>

<style lang="less" scoped>
.comment {
  .uname {
    color: #1989fa;
    cursor: pointer;
    &:first-of-type {
      margin-right: 5px;
    }
  }

  // .content {
  //   padding-left: 0;
  // }
}
</style>
