import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../plugins/db';
import { client } from '../plugins/client';

Vue.use(Vuex);

let reamIds = (function () {
  let channels = db.getChannels();
  let ret = new Map();
  for (let item of channels) {
    ret.set(item.id, item.reamIds);
  }

  return ret;
}());

let clientInfo = {
  browser: client.getBrowser(),
  engine: client.getEngine(),
  system: client.getSystem(),
  type: client.getPlatformType(),
};

// init articlesSet for Reactivity
const channelIds = db.getChannels();
let articlesSet = {};
for (let item of channelIds) {
  articlesSet[`cid${item.id}`] = null;
}

const setArticles = function (channelId, source, newVal) {
  // eslint-disable-next-line no-param-reassign
  source[`cid${channelId}`] = newVal;
};
const getArticles = function (channelId, articles) {
  return articles[`cid${channelId}`];
};

export default new Vuex.Store({
  state: {
    activeId: '',
    articlesSet,
    commentData: [],
    channelReamIdsMap: reamIds,
    clientInfo,
  },
  mutations: {
    articles: (state, payload) => {
      const { articles, channelId } = payload;
      if (articles) {
        setArticles(channelId, state.articlesSet, articles);
      }
    },
    activeId: (state, payload) => {
      const { activeId } = payload;
      if (!activeId) return;
      state.activeId = activeId;
    },
    curArticles: (state, payload) => {
      const { data } = payload;
      setArticles(state.activeId, state.articlesSet, data);
    },
    commentData: (state, payload) => {
      const { comment } = payload;
      state.commentData = comment;
    },
    doFilteChannelReamIds: (state, payload) => {
      state.channelReamIdsMap.set(state.activeId, payload.reamIds);
    },
  },
  actions: {
    updateArticles: ({ commit }, payload) => {
      commit('articles', payload);
    },
    updateActiveId: ({ commit }, payload) => {
      commit('activeId', payload);
    },
    updateCurArticles: ({ commit }, payload) => {
      commit('curArticles', payload);
    },
    changeActive: ({ dispatch }, payload) => {
      dispatch('updateActiveId', payload);
    },
    updateCommentData: ({ commit }, payload) => {
      commit('commentData', payload);
    },

    filteChannelReamIds: ({ commit }, payload) => {
      commit('doFilteChannelReamIds', payload);
    },
  },
  getters: {
    getArticlesByChannelId: state => id => state.articlesSet.get(id),
    getActiveId: state => state.activeId,
    getCurArticles: state => getArticles(state.activeId, state.articlesSet),
    getArticlesSet: state => state.articlesSet,
    getCurComments: state => state.commentData,
    getCurChannelReamIds: state => state.channelReamIdsMap.get(state.activeId),
    getChannelReamIdsByChannelId: state => id => state.channelReamIdsMap.get(id),
    getClientInfo: state => state.clientInfo,
    getPlatformType: state => state.clientInfo.type,
  },

});
