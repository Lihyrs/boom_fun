import {
  EMOT_IN_COMMENT,
  TEXT_IN_COMMENT,
  IMG_IN_COMMENT,
  HTML_TAG_IN_COMMENT,
} from '../types';

function getHtmlTags(str) {
  const htmlRegExp = /↵*&lt;br\/?&gt;/g;
  let comment = str;
  comment = comment.replace(htmlRegExp, '&lt;br/&gt;');
  // console.log(
  //   'html----', [...comment.matchAll(htmlRegExp)],
  // );
  return [...comment.matchAll(htmlRegExp)];
}
function getEmots(str) {
  const emotRegExp = /\[emot=.*?\/\]/gi;
  const comment = str;
  return [...comment.matchAll(emotRegExp)];
}
function getImgs(str) {
  const imgRegExp = /\[img=图片\]https*:\/\/.*?[(.jpg)|(.png)|(.gif)]\[\/img\]/i;
  const comment = str;
  return [...comment.matchAll(imgRegExp)];
}
function getEmotSrc(str) {
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
}
function getImgSrc(str, isQuote) {
  const imgRegExp = /(?<=\[img=图片\])https*:\/\/.*?[(.jpg)|(.png)|(.gif)](?=\[\/img\])/i;
  const src = str.match(imgRegExp);
  let ret = {};
  if (src) {
    ret.url = src[0];
  }

  if (isQuote) {
    ret.shortCode = '[图片]';
  }
  return ret;
}
function getHtmlTag(str) {
  const regExp = /(?<=&lt;)br\/?(?=&gt;)/i;
  const tag = str.match(regExp);
  // console.log('object', tag);
  let ret = {};
  if (tag) {
    ret.tag = 'newline';
  }
  return ret;
}

/**
 *
 * @param {String} str
 * @return {Array}
 */
function parseCommentContent(str, isQuote = false) {
  let shortCodes = [
    ...getEmots(str),
    ...getImgs(str, isQuote),
    ...getHtmlTags(str),
  ];
  // 按索引排序
  shortCodes.sort((a, b) => a.index - b.index);

  let ret = [];
  let preIdx = 0;
  const comment = str;
  const length = comment.length;
  if (shortCodes.length === 0) {
    return [
      {
        payload: comment,
        type: TEXT_IN_COMMENT,
      },
    ];
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

    const emotSrc = getEmotSrc(code[0]);
    const imgSrc = getImgSrc(code[0], isQuote);
    const tag = getHtmlTag(code[0]);
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
  return ret;
}

export default parseCommentContent;
