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
      return {};
    },
  },
  render(h) {
    const quoteUser = this.quoteUserInfo.username
      ? this.quoteUserInfo.username
      : '';
    return (
      <van-row>
        <van-col>
          <div class="row">
            <span class="uname">{this.comment.userName}</span>
            {quoteUser && '回复 '}
            <span class="uname">{quoteUser && quoteUser}</span>:
          </div>
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
        </van-col>
      </van-row>
    );
  },
};
</script>

<style lang="less" scoped>
.row {
  display: inline-block;
  margin-right: 5px;
  .uname {
    color: #1989fa;
    cursor: pointer;
  }
}
</style>
