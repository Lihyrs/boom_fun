<script>
import {
  EMOT_IN_COMMENT,
  TEXT_IN_COMMENT,
  IMG_IN_COMMENT,
} from '../types';


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
  render(h) {
    const result = this.content.map((obj) => {
      let ret = '';
      const { payload, type } = obj;
      if (type === TEXT_IN_COMMENT) {
        ret = <CommentText content={payload} />;
      } else if (type === EMOT_IN_COMMENT
                        || type === IMG_IN_COMMENT) {
        ret = <CommentImage data={payload} type={type} />;
      }

      return ret;
    });
    return (
      <div class='comm-content'>{this.$slots.default}{result}</div>
    );
  },
};
</script>
