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
              <CommentHeader :comment="commentParsed" :visibily="!isQuote" />
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
                <template v-if="isQuote">
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
            <van-col span='24'>
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
      return {
        headUrl: comment.headUrl[0].url,
        avatarImage: comment.avatarImage,
        username: comment.userName,
        userId: comment.userId,
      };
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
  /deep/ .uname {
    color: #2596d2;
  }

  /deep/ .comm-content,
  /deep/ .comm-footer {
    margin-left: 7px;
  }

  /deep/ .comm-content {
    margin-top: 16px;
  }
}
</style>
