<script>
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
      const { commentsMap, commentIds } = this.comments;
      for (let id of commentIds) {
        let comment = commentsMap[`c${id}`];
        ret.push({
          isQuoted: false,
          payload: comment,
        });
        while (comment.quoteId) {
          const {
            userId, userName, avatarImage, headUrl,
          } = comment;
          comment = commentsMap[`c${comment.quoteId}`];
          ret.push({
            isQuoted: true,
            payload: comment,
            quoteUser: comment.quoteId ? {
              userId,
              userName,
              avatarImage,
              headUrl,

            } : {},
          });
        }
      }
      return ret;
    },
  },

  render(h) {
    return (
      <div>
        {this.progressedComments.map(item => (
          <Comment comment={item.payload} isQuoted={item.isQuoted} quoteUser={item.quoteUser}/>
        ))}
      </div>
    );
  },
};
</script>
