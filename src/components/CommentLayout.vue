<template>
  <van-row :class="['comment-item',getClass]">
    <van-col span="24">
      <van-row>
        <van-col span="24">
          <slot></slot>
        </van-col>
      </van-row>
      <van-row>
        <!-- avatar -->
        <van-col v-if="!isQuote" class="mci-avatar">
          <Avatar v-if="avatar" :data="avatar" />
        </van-col>
        <!-- begin of comment -->
        <van-col>
          <van-row>
            <!-- begin of comment header -->
            <van-col span="24">
              <CommentHeader :comment="commentParsed" :visibily="$client.isPC()" />
            </van-col>
            <!-- end of comment header -->
            <!-- begin of comment content -->
            <van-col span="24">
              <CommentContent
                :content="commentParsed.content"
                :quoteUser="quoteUser"
                :userInfo="{username:commentParsed.userName}"
                :isQuote="isQuote"
              >
                <template v-if="$client.isMobile()">
                  <CommentHeader :comment="commentParsed" class="qtd-comm-header">
                    <span>:</span>
                  </CommentHeader>
                </template>
              </CommentContent>
            </van-col>
          </van-row>
          <!-- end of comment content -->
          <!-- begin of comment footer -->
          <van-row>
            <van-col span="24">
              <CommentFooter :comment="commentParsed" />
            </van-col>
          </van-row>
          <!-- end of comment footer -->
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script>
import { COMMENT_TYPE } from '../types';
import CommentContent from './CommentContent.vue';
import parseCommentContent from '../utils/parseCommentContent';

export default {
  inheritAttrs: false,
  props: {
    comment: {
      type: Object,
      required: true,
    },
    quoteUser: {
      type: Object,
    },
    type: {
      type: String,
    },
    hasQuoteComment: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CommentContent,
  },
  computed: {
    isQuote() {
      return this.type === COMMENT_TYPE.QUOTE;
    },
    getClass() {
      let ret = [];
      if (this.isQuote) {
        ret.push('qtd-comment-item');
        if (this.isFirstQuoteComment) {
          ret.push('first-level-floor');
        }
      } else {
        ret.push('main-comment-item');
      }

      return ret.join(' ');
    },
    commentParsed() {
      // if (this.comment.userId == '955218') {
      //   let tmp = this.comment.content;
      //   const specialChars = {
      //     '&quot': { value: '"', regExp: /&quot;/ },
      //     '&amp': { value: '&', regExp: /&amp;/ },
      //     '&lt': { value: '<', regExp: /&lt;/ },
      //     '&gt': { value: '>', regExp: /&gt;/ },
      //   };

      //   const sCharRegExp = /(&[(quot)|(amp)|(lt)|(gt)]+;)/;
      //   if (sCharRegExp.test(tmp)) {
      //     for (let c in specialChars) {
      //       // eslint-disable-next-line no-prototype-builtins
      //       if (specialChars.hasOwnProperty(c)) {
      //         tmp = tmp.replace(new RegExp(specialChars[c].regExp, 'g'), specialChars[c].value);
      //         console.log('test---->', c, tmp);
      //       }
      //     }
      //   }
      //   // console.log('ffafef', /(&[(quot)|(amp)|(lt)|(gt)]+;)/.test(tmp));
      //   tmp = parseCommentContent(
      //     this.comment.content,
      //     this.isQuote && this.$client.isMobile(),
      //   );
      //   // console.log('content==', a);
      // }
      return {
        ...this.comment,
        content: parseCommentContent(
          this.comment.content,
          this.isQuote && this.$client.isMobile(),
        ),
      };
    },
    avatar() {
      const comment = this.comment;
      if (comment.userId) {
        return {
          headUrl: comment.headUrl[0].url,
          avatarImage: comment.avatarImage,
          username: comment.userName,
          userId: comment.userId,
        };
      }

      return null;
    },
    isFirstQuoteComment() {
      return this.$attrs.isFirstQuoteComment;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/styles/mixins.less";
.comment-item {
  /deep/ .comm-footer {
    margin-bottom: 15px;
    vertical-align: middle;
  }
}

.main-comment-item {
  .first-level-floor {
    margin-bottom: 20px;
    margin-left: 0;
    margin-left: 60px;
   .qtd-comment-item-border;
    @media screen and (max-width:1024px){

      padding-right: 3px
    }
  }
  .mci-avatar {
    margin-top: -5px;
    display: inline-block;
    width: 60px;
    & ~ .van-col {
      //margin-left: 60px
      width: calc(100% - 60px - 15px);
    }
  }
}

.qtd-comment-item {
  .qtd-comment-item;
  @media screen and (max-width:1024px){
      border-top: 0;
      border-left:0;
      border-right:0;
      padding-left: 0;
      padding-right: 0
    }
  /deep/ .uname {
    color: #2596d2;
  }

  /deep/ .comm-content,
  /deep/ .comm-footer,
  /deep/ .comment-header {
    margin-left: 7px;
  }

  /deep/ .comment-header {
    margin-top: 16px;
  }
}


</style>
