<template>
  <div>
    <Comment
      v-for="comments in progressedComments"
      :comment="comments.main.payload"
      :type="comments.main.type"
      :quoteUser="comments.main.quoteUser"
      :quoteComments="comments.quoteComments"
      :key="comments.main.cid"
    />
  </div>
</template>
<script>
import { COMMENT_TYPE } from '../types';

export default {
  props: {
    comments: {
      type: Object,
      required: true,
    },
  },
  computed: {
    progressedComments() {
      let ret = [];
      let group = {};
      const { commentsMap, commentIds } = this.comments;
      const { QUOTE, MAIN } = COMMENT_TYPE;
      if (!commentsMap || !commentIds) {
        return ret;
      }

      for (let id of commentIds) {
        let comment = commentsMap[`c${id}`];
        let tmp = [];
        group.main = {
          type: MAIN,
          payload: comment,
          cid: comment.cid,
        };

        while (comment.quoteId) {
          comment = commentsMap[`c${comment.quoteId}`];
          let quoteUser = {};
          // get quoteUser
          if (comment.quoteId) {
            const {
              userId, userName, avatarImage, headUrl,
            } = commentsMap[`c${comment.quoteId}`];
            quoteUser = {
              userId,
              userName,
              avatarImage,
              headUrl,
            };
          }

          tmp.push({
            type: QUOTE,
            payload: comment,
            cid: comment.cid,
            quoteUser,
          });
        }
        group.quoteComments = tmp;
        ret.push(group);
        tmp = [];
        group = {};
      }
      return ret;
    },
  },
};
</script>
