import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../plugins/db';

Vue.use(Vuex);

let reamIds = (function () {
  let channels = db.getChannels();
  let ret = new Map();
  for (let item of channels) {
    ret.set(item.id, item.reamIds);
  }

  return ret;
}());


export default new Vuex.Store({
  state: {
    activeId: '',
    articlesSet: new Map(),
    commentData: {},
    channelReamIdsMap: reamIds,
  },
  mutations: {
    articles: (state, payload) => {
      const { articles, channelId } = payload;
      if (articles) {
        state.articlesSet.set(channelId, articles);
      }
    },
    activeId: (state, payload) => {
      const { activeId } = payload;
      if (!activeId) return;
      state.activeId = activeId;
    },
    curArticles: (state, payload) => {
      const { data } = payload;
      state.articlesSet.set(state.activeId, data);
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
    getCurArticles: state => state.articlesSet.get(state.activeId),
    getArticlesSet: state => state.articlesSet,
    getCurComments: state => state.commentData,
    getCurChannelReamIds: state => state.channelReamIdsMap.get(state.activeId),
    getChannelReamIdsByChannelId: state => id => state.channelReamIdsMap.get(id),
  },

});
