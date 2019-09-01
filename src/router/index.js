import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '../views/NotFound.vue';
import App from '../components/AppLayout.vue';

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
      path: '*', component: NotFound,
    },
  ],
});
