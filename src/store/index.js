import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeId: '',
    articlesSet: new Map(),
    curArticles: {},
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
      const { activeId } = payload;
      state.curArticles = state.articlesSet.get(activeId);
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
      dispatch('updateCurArticles', payload);
    },
  },
  getters: {
    getArticlesByChannelId: state => id => state.articlesSet.get(id),
    getActiveId: state => state.activeId,
    getCurArticles: state => state.curArticles,
    getArticlesSet: state => state.articlesSet,
  },
});
