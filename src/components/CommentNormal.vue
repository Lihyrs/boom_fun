<script>
import {
  EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT, HTML_TAG_IN_COMMENT,
} from '../types';
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
    showFloor: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CommentHeader,
    CommentFooter,
    CommentImage,
  },
  computed: {},
  /* eslint-disable no-unused-vars */
  render(h) {
    return (
      <div>
        <van-cell>
          <template slot="icon">
            <Avatar data={this.avatar} />
          </template>

          <template slot="title">
            <CommentHeader comment={this.comment} showFloor={this.showFloor} />
          </template>

          <van-cell slot="label">
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
                } else if (obj.type === HTML_TAG_IN_COMMENT) {
                  if (obj.payload.tag === 'newline') {
                    return '\n';
                  }
                }
                return ret;
              })}
              <CommentFooter comment={this.comment} />
            </template>
          </van-cell>
        </van-cell>
      </div>
    );
  },
};
</script>
