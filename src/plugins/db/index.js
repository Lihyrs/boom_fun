/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import * as channel from './channelMap';
import * as ream from './reamMap';

const db = {
  ...channel,
  ...ream,
};

export default {
  install(Vue, options) {
    Vue.prototype.$db = db;
  },
};
