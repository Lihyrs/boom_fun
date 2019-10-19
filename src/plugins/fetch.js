/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const $fetch = async function (url, options = {}) {
  const result = await axios(url, {
    ...options,
  });
  if (result.status === 200) {
    return result.data;
  }

  const message = result.message;
  const error = new Error(message);
  error.response = result;
  throw error;
};


export default {
  install(Vue, options) {
    Vue.prototype.$fetch = $fetch;
  },
};
