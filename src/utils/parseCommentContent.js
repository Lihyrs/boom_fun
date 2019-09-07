import {
  EMOT_IN_COMMENT,
  TEXT_IN_COMMENT,
  IMG_IN_COMMENT,
  HTML_TAG_IN_COMMENT,
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

// 替换html实体
function progressText(str) {
  let tmp = str;
  let ret = [];
  const specialChars = {
    '&quot': { value: '"', regExp: /&quot;/ },
    '&amp': { value: '&', regExp: /&quot;/ },
    '&lt': { value: '<', regExp: /&quot;/ },
    '&gt': { value: '>', regExp: /&quot;/ },
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

  const newLineRegExp = /((\r\n)|(\n))/;
  if (newLineRegExp.test(tmp)) {
    tmp = tmp.replace(new RegExp(newLineRegExp, 'g'), '<br/>');
  }

  const strReplaced = tmp;

  tmp = [...strReplaced.matchAll(/<br\/>/g)];

  if (!tmp.length) {
    ret.push({
      payload: strReplaced,
      type: TEXT_IN_COMMENT,
    });
  } if (tmp.length) {
    let preIdx = 0;
    const length = tmp.length;
    for (let code of tmp) {
      // 已经是最后一个??
      if (preIdx > length) {
        break;
      }

      let substr = strReplaced.substring(preIdx, code.index);

      // 下一个起点
      preIdx = code.index + code[0].length;

      if (substr) {
        ret.push({
          payload: substr,
          type: TEXT_IN_COMMENT,
        });
      }


      let tmp = {};
      // if (emotSrc || tag.tag) {
      //   ret.type = emotSrc ? EMOT_IN_COMMENT : HTML_TAG_IN_COMMENT;
      //   ret.payload = emotSrc || tag;
      // } else if (imgSrc.url || imgSrc.shortCode) {
      //   ret.type = IMG_IN_COMMENT;
      //   ret.payload = imgSrc;
      // }
      // if (emotSrc) {
      if (/<br\/>/.test(code[0])) {
        tmp.type = HTML_TAG_IN_COMMENT,
        tmp.payload = { tag: 'newline' };
        ret.push({ ...tmp });
      }
      // console.log('=====>', ret);

      // } else if (imgSrc.url || imgSrc.shortCode) {
      //   ret.type = IMG_IN_COMMENT,
      //   ret.payload = imgSrc;
      // }
    }
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
    // ...getHtmlTags(str),
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
      for (let item of progressText(substr)) {
        ret.push(item);
      }
    }

    const emotSrc = getEmotSrc(code[0]);
    const imgSrc = getImgSrc(code[0], isQuote);
    // const tag = getHtmlTag(code[0]);
    let tmp = {};
    // if (emotSrc || tag.tag) {
    //   ret.type = emotSrc ? EMOT_IN_COMMENT : HTML_TAG_IN_COMMENT;
    //   ret.payload = emotSrc || tag;
    // } else if (imgSrc.url || imgSrc.shortCode) {
    //   ret.type = IMG_IN_COMMENT;
    //   ret.payload = imgSrc;
    // }
    // if (emotSrc) {
    tmp.type = emotSrc ? EMOT_IN_COMMENT : IMG_IN_COMMENT;
    tmp.payload = emotSrc || imgSrc;
    // } else if (imgSrc.url || imgSrc.shortCode) {
    //   ret.type = IMG_IN_COMMENT,
    //   ret.payload = imgSrc;
    // }
    ret.push({ ...tmp });
  }
  return ret;
}

export default parseCommentContent;
