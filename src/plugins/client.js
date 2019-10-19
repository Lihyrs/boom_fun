/* eslint-disable eqeqeq */
/**
 * 用户代理检测是客户端检测的最后的一个选择，
 * 只要可能，都应该优先采用能力检测和怪癖检测
 */

import { SYS_PLATFORM_TYPE } from '../types';

let engine = {
  ie: 0,
  gecko: 0,
  webkit: 0,
  khtml: 0,

  version: null,
};

let browser = {
  ie: 0,
  firefox: 0,
  safari: 0,
  konq: 0,
  opera: 0,
  chrome: 0,

  version: null,
};
const initPlatform = function (platform) {
  let ret = {};
  ret[platform] = false;
  return ret;
};
const system = {
  ...initPlatform('win'),
  ...initPlatform('mac'),
  ...initPlatform('x11'),

  ...initPlatform('iphone'),
  ...initPlatform('ipod'),
  ...initPlatform('ipad'),
  ...initPlatform('ios'),
  ...initPlatform('android'),
  ...initPlatform('nokiaN'),
  ...initPlatform('winMobile'),

  ...initPlatform('wii'),
  ...initPlatform('ps4'),
};

const getItem = function (obj) {
  let ret = {};
  for (let key in obj) {
    if (obj[key]) {
      if (key === 'version') {
        ret.ver = obj[key];
      } else {
        ret.name = key;
      }
    }
  }
  return ret;
};

const getPlatformType = function () {
  let ret;
  const {
    iphone,
    ipod,
    ipad,
    ios,
    android,
    nokiaN,
    winMobile, win,
    mac,
    x11, wii,
    ps4,
  } = system;
  ret = iphone || ipod || ipad || ios || android || nokiaN || winMobile;
  if (ret) {
    return SYS_PLATFORM_TYPE.MOBILE;
  }

  ret = win || mac || x11;
  if (ret) {
    return SYS_PLATFORM_TYPE.PC;
  }

  ret = wii || ps4;
  if (ret) {
    return SYS_PLATFORM_TYPE.GAME;
  }

  return ret;
};

const getEngine = function () {
  return getItem(engine);
};

const getBrowser = function () {
  return getItem(browser);
};

const getSystem = function () {
  return getItem(system);
};

const isMobile = function () {
  return getPlatformType() === SYS_PLATFORM_TYPE.MOBILE;
};
const isPC = function () {
  return getPlatformType() === SYS_PLATFORM_TYPE.PC;
};

const client = (function () {
  let ua = navigator.userAgent;

  // 检测呈现引擎和浏览器
  if (window.opera) {
    browser.version = window.opera.version();
    engine.version = browser.version;
    browser.opera = parseFloat(engine.version);
    engine.opera = browser.opera;
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.version = RegExp.$1;
    engine.webkit = parseFloat(engine.version);

    // is Chrome or Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.version = RegExp.$1;
      browser.chrome = parseFloat(browser.version);
    } else if (/Version\/(\S+)/.test(ua)) {
      browser.version = RegExp.$1;
      browser.safari = parseFloat(browser.version);
    } else {
      let safariVer = 1;
      if (engine.webkit < 100) {
        safariVer = 1;
      } else if (engine.webkit < 312) {
        safariVer = 1.2;
      } else if (engine.webkit < 412) {
        safariVer = 1.3;
      } else {
        safariVer = 2;
      }

      browser.version = safariVer;
      browser.safari = browser.version;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    browser.ver = RegExp.$1;
    engine.version = browser.ver;
    browser.konq = parseFloat(engine.version);
    engine.khtml = browser.konq;
  } else if (/rv:([^)]+)\) Gecko\/\d(8)/.test(ua)) {
    engine.version = RegExp.$1;
    engine.gecko = parseFloat(engine.version);
    // is Firefox?
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.version = RegExp.$1;
      browser.firefox = parseFloat(browser.version);
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    browser.version = RegExp.$1;
    engine.version = browser.version;
    browser.ie = parseFloat(engine.version);
    engine.ie = browser.ie;
  }


  // check browser
  browser.ie = engine.ie;
  browser.opera = engine.opera;

  // check platform
  const p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.x11 = (p == 'X11') || p.indexOf('X11') == 0;

  // check windows system
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp.$1 == 'NT') {
        switch (RegExp.$2) {
        case '5.0':
          system.win = '2000';
          break;
        case '5.1':
          system.win = 'XP';
          break;
        case '6.0':
          system.win = 'Vista';
          break;
        case '6.1':
          system.win = '7';
          break;
        default:
          system.win = 'NT';
          break;
        }
      } else if (RegExp.$1 == '9x') {
        system.win = 'ME';
      } else {
        system.win = RegExp.$1;
      }
    }
  }

  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1;
  system.ipod = ua.indexOf('iPod') > -1;
  system.ipad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('NokiaN') > -1;

  // windows mobile
  if (system.win == 'CE') {
    system.winMobile = system.win;
  } else if (system.win == 'Ph') {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = 'Phone';
      system.winMobile = parseFloat(RegExp.$1);
    }
  }

  // 检测 iOS 版本
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace('_', '.'));
    } else {
      system.ios = 2; // 不能真正检测出来，所以只能猜测
    }
  }

  // 检测 Android 版本
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
  }

  // 游戏系统
  system.wii = ua.indexOf('Wii') > -1;
  system.ps = /playstation/i.test(ua);

  // 返回这些对象
  return {
    engine,
    browser,
    system,
    getBrowser,
    getEngine,
    getSystem,
    getPlatformType,
    isMobile,
    isPC,
  };
}());

export { client };

export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$client = client;
  },
};
