import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '../views/NotFound.vue';
import App from '../components/AppLayout.vue';
import Article from '../components/Article.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
      props: route => ({ id: route.params.id, channelId: route.params.channelId }),
    },
    {
      path: '*', component: NotFound,
    },
  ],

});
