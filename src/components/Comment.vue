
<template>
  <CommentContentQuoted v-if="isQuoted" :comment="commentParsed" :quoteUser="quoteUser" />
  <CommentNormal v-else :comment="commentParsed" :avatar="avatar" />
</template>

<script>
import {
  EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT, HTML_TAG_IN_COMMENT,
} from '../types';
import CommentNormal from './CommentNormal.vue';
import CommentContentQuoted from './CommentContentQuoted.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    isQuoted: {
      type: Boolean,
      default: false,
    },
    quoteUser: {
      type: [Object, null],
      default: null,
    },
  },
  components: {
    CommentNormal,
    CommentContentQuoted,
  },

  methods: {
    getHtmlTags() {
      const htmlRegExp = /↵*&lt;br\/?&gt;/g;
      let comment = this.comment.content;
      comment = comment.replace(htmlRegExp, '&lt;br/&gt;');
      // console.log(
      //   'html----', [...comment.matchAll(htmlRegExp)],
      // );
      return [...comment.matchAll(htmlRegExp)];
    },
    getEmots() {
      const emotRegExp = /\[emot=.*?\/\]/gi;
      const comment = this.comment.content;
      return [...comment.matchAll(emotRegExp)];
    },
    getImgs() {
      const imgRegExp = /\[img=图片\]https*:\/\/.*?[(.jpg)|(.png)|(.gif)]\[\/img\]/i;
      const comment = this.comment.content;
      return [...comment.matchAll(imgRegExp)];
    },
    getEmotSrc(str) {
      const emotRegExp = /(?<=\[emot=).*?(?=\/\])/;
      const src = str.match(emotRegExp);
      let ret = '';
      if (src) {
        ret = src[0].split(',');
        ret = {
          url: `//cdnfile.aixifan.com/static/umeditor/emotion/images/${
            ret[0]
          }/${ret[ret.length - 1]}.gif`,
        };
      }
      return ret;
    },
    getImgSrc(str) {
      const imgRegExp = /(?<=\[img=图片\])https*:\/\/.*?[(.jpg)|(.png)|(.gif)](?=\[\/img\])/i;
      const src = str.match(imgRegExp);
      let ret = {};
      if (src) {
        ret.url = src[0];
      }

      if (this.comment.quoteId) {
        ret.shortCode = '[图片]';
      }
      return ret;
    },
    getHtmlTag(str) {
      const regExp = /(?<=&lt;)br\/?(?=&gt;)/i;
      const tag = str.match(regExp);
      // console.log('object', tag);
      let ret = {};
      if (tag) {
        ret.tag = 'newline';
      }
      return ret;
    },
  },

  computed: {
    avatar() {
      const comment = this.comment;
      return {
        headUrl: comment.headUrl[0].url,
        avatarImage: comment.avatarImage,
        username: comment.userName,
        userId: comment.userId,
      };
    },
    commentParsed() {
      let shortCodes = [...this.getEmots(), ...this.getImgs(), ...this.getHtmlTags()];
      // 按索引排序
      shortCodes.sort((a, b) => a.index - b.index);


      let ret = [];
      let preIdx = 0;
      const comment = this.comment.content;
      const length = comment.length;
      if (shortCodes.length === 0) {
        return {
          ...this.comment,
          content: [
            {
              payload: comment,
              type: TEXT_IN_COMMENT,
            },
          ],
        };
      }

      for (let code of shortCodes) {
        // 已经是最后一个??
        if (preIdx > length) {
          break;
        }

        let substr = comment.substring(preIdx, code.index);

        // 下一个起点
        preIdx = code.index + code[0].length;

        if (substr) {
          ret.push({
            payload: substr,
            type: TEXT_IN_COMMENT,
          });
        }

        const emotSrc = this.getEmotSrc(code[0]);
        const imgSrc = this.getImgSrc(code[0]);
        const tag = this.getHtmlTag(code[0]);
        let tmp = {};
        if (emotSrc || tag.tag) {
          tmp.type = emotSrc ? EMOT_IN_COMMENT : HTML_TAG_IN_COMMENT;
          tmp.payload = emotSrc || tag;
        } else if (imgSrc.url || imgSrc.shortCode) {
          tmp.type = IMG_IN_COMMENT;
          tmp.payload = imgSrc;
        }
        ret.push({ ...tmp });
      }

      return { ...this.comment, content: ret };
    },
  },

  //   render(h) {
  //     // console.log(this.commentParsed);
  //     return (
  //       <van-row gutter="5">
  //         <van-col span="4">
  //           <Avatar data={this.avatar} />
  //         </van-col>
  //         <van-col>
  //           {this.commentParsed.content.map((obj) => {
  //             let ret = '';
  //             if (obj.type === TEXT_IN_COMMENT) {
  //               ret = <span>{obj.payload}</span>;
  //             } else if (
  //               obj.type === EMOT_IN_COMMENT
  //               || obj.type === IMG_IN_COMMENT
  //             ) {
  //               ret = (
  //                 <van-image lazy-load src={obj.payload} onClick={this.showImg} />
  //               );
  //             }
  //             return ret;
  //           })}
  //         </van-col>
  //       </van-row>
  //     );
  //   },
};
</script>
