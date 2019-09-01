
<script>
import { ImagePreview } from 'vant';
import { EMOT_IN_COMMENT, TEXT_IN_COMMENT, IMG_IN_COMMENT } from '../types';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    quoted: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getEmots() {
      const emotRegExp = /\[emot=[^s]*?\/\]/g;
      const comment = this.comment.content;
      return [...comment.matchAll(emotRegExp)];
    },
    getImgs() {
      const imgRegExp = /\[img=图片\]https*:\/\/[^\s]*?[(.jpg)|(.png)|(.gif)]\[\/img\]/;
      const comment = this.comment.content;
      return [...comment.matchAll(imgRegExp)];
    },
    getEmotSrc(str) {
      const emotRegExp = /(?<=\[emot=)[^s]*?(?=\/\])/;
      const src = str.match(emotRegExp);
      let ret = '';
      if (src) {
        ret = src[0].split(',');
        ret = `//cdnfile.aixifan.com/static/umeditor/emotion/images/${ret[0]}/${
          ret[ret.length - 1]
        }.gif`;
      }
      return ret;
    },
    getImgSrc(str) {
      const imgRegExp = /(?<=\[img=图片\])https*:\/\/[^\s]*?[(.jpg)|(.png)|(.gif)](?=\[\/img\])/;
      const src = str.match(imgRegExp);
      let ret = '';
      if (src) {
        ret = src[0];
      }
      return ret;
    },
    showImg(evt) {
      ImagePreview({
        images: [evt.target.src],
        showIndex: false,
        lazyLoad: true,
        closeOnPopstate: true,
      });
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
      let shortCodes = [...this.getEmots(), ...this.getImgs()];
      // 按索引排序
      shortCodes.sort((a, b) => a.index - b.index);

      let ret = [];
      let preIdx = 0;
      const comment = this.comment.content;
      const length = comment.length;
      //   console.log(shortCodes);
      for (let code of shortCodes) {
        // 已经是最后一个??
        if (preIdx > length) {
          break;
        }

        let substr = comment.substring(preIdx, code.index);
        // console.log(preIdx, code.index, '===>', substr);
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
        if (emotSrc || imgSrc) {
          ret.push({
            payload: emotSrc || imgSrc,
            type: emotSrc ? EMOT_IN_COMMENT : IMG_IN_COMMENT,
          });
        }
      }

      return { ...this.comment, content: ret };
    },
  },

  render(h) {
    console.log(this.commentParsed);
    return (
      <van-row gutter="5">
        <van-col span="4">
          <Avatar data={this.avatar} />
        </van-col>
        <van-col>
          {this.commentParsed.content.map((obj) => {
            let ret = '';
            if (obj.type === TEXT_IN_COMMENT) {
              ret = <span>{obj.payload}</span>;
            } else if (
              obj.type === EMOT_IN_COMMENT
              || obj.type === IMG_IN_COMMENT
            ) {
              ret = (
                <van-image lazy-load src={obj.payload} onClick={this.showImg} />
              );
            }
            return ret;
          })}
        </van-col>
      </van-row>
    );
  },
};
</script>
