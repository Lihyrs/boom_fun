<script>
import {
  EMOT_IN_COMMENT,
  TEXT_IN_COMMENT,
  IMG_IN_COMMENT,
  HTML_TAG_IN_COMMENT,
} from '../types';
import CommentContentLayout from './CommentContentLayout.vue';

export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
    userInfo: {
      type: Object,
    },
    quoteUser: {
      type: Object,
    },
    isQuote: {
      type: Boolean,
    },
  },
  components: {
    CommentContentLayout,
  },
  render(h) {
    const result = this.content.map((obj) => {
      let ret = '';
      const { payload, type } = obj;
      if (type === TEXT_IN_COMMENT) {
        ret = <span>{payload}</span>;
      } else if (type === EMOT_IN_COMMENT
                        || type === IMG_IN_COMMENT) {
        ret = <CommentImage data={payload} type={type} />;
      } else if (type === HTML_TAG_IN_COMMENT) {
        if (payload.tag === 'newline') {
          ret = <br />;
        }
      }

      return ret;
    });
    return (
      <CommentContentLayout quoteUser={this.quoteUser}
        userInfo={this.userInfo} isQuote={this.isQuote}>
        {result}
      </CommentContentLayout>
    );
  },
};
</script>
