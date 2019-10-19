import {
  EMOT_IN_COMMENT,
  TEXT_IN_COMMENT,
  IMG_IN_COMMENT,
} from '../types';

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

// 替换html实体
function progressText(str) {
  let tmp = str;
  let ret = [];
  const specialChars = {
    '&quot': { value: '"', regExp: /&quot;/ },
    '&amp': { value: '&', regExp: /&amp;/ },
    '&lt': { value: '<', regExp: /&lt;/ },
    '&gt': { value: '>', regExp: /&gt;/ },
  };

  const sCharRegExp = /(&[(quot)|(amp)|(lt)|(gt)]+;)/;
  if (sCharRegExp.test(tmp)) {
    for (let c in specialChars) {
      // eslint-disable-next-line no-prototype-builtins
      if (specialChars.hasOwnProperty(`${c}`)) {
        tmp = tmp.replace(new RegExp(specialChars[c].regExp, 'g'), specialChars[c].value);
      }
    }
  }

  // const newLineRegExp = /((\r\n)|(\n))/;
  // if (newLineRegExp.test(tmp)) {
  //   tmp = tmp.replace(new RegExp(newLineRegExp, 'g'), '<br/>');
  // }

  const strReplaced = tmp.replace(/<br\/>/g, '\n');


  return strReplaced;
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
        type: TEXT_IN_COMMENT,
        payload: progressText(substr),
      });
    }

    const emotSrc = getEmotSrc(code[0]);
    const imgSrc = getImgSrc(code[0], isQuote);

    let tmp = {};

    tmp.type = emotSrc ? EMOT_IN_COMMENT : IMG_IN_COMMENT;
    tmp.payload = emotSrc || imgSrc;

    ret.push({ ...tmp });
  }
  return ret;
}

export default parseCommentContent;
