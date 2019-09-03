<script>
import {
  EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT, HTML_TAG_IN_COMMENT,
} from '../types';
import CommentImage from './CommentImage.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    quoteUser: {
      type: Object,
      required: true,
      default: null,
    },
  },
  components: {
    CommentImage,
  },
  render(h) {
    const quoteUser = this.quoteUser && this.quoteUser.userName ? this.quoteUser : null;
    return (
      <van-cell class='comment qtd-comment'>
        <div class="i-hole" slot="icon">

        </div>
        <template slot="title">
          <span class="uname">{this.comment.userName}</span>
          <span>{quoteUser ? '' : ':'}</span>
        </template>
        <van-cell class="content" slot="label" border={false}>
          <template slot="title">
            {quoteUser ? '回复' : ''}
            <span class="uname">{quoteUser && quoteUser.userName}</span>
            <span>{quoteUser ? ':' : ''}</span>
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
                console.log(obj);
                if (obj.payload.tag === 'newline') {
                  ret = <br/>;
                }
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
@import '../assets/styles/comm.less';
@import '../assets/styles/mixins.less';

.comment {
 .uname{
   .uname
 }
}
.qtd-comment{
   background: #ffe;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    padding: 4px 3px 0;
    .content{
       background: #ffe;
    }
};
</style>
