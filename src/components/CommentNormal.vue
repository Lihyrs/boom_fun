<script>
import { EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT } from '../types';
import CommentHeader from './CommentHeader.vue';
import CommentFooter from './CommentFooter.vue';
import CommentImage from './CommentImage.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    avatar: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentHeader,
    CommentFooter,
    CommentImage,
  },
  /* eslint-disable no-unused-vars */
  render(h) {
    return (
      <van-row gutter="5">
        <van-col span="4">
          <Avatar data={this.avatar} />
        </van-col>
        <van-col>
          <CommentHeader comment={this.comment} />
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
          <CommentFooter comment={this.comment} />
        </van-col>
      </van-row>
    );
  },
};
</script>
