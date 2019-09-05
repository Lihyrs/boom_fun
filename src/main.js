import Vue from 'vue';
import '@vant/touch-emulator';
import App from './components/App.vue';
import router from './router';
import store from './store';
import './utils/globalComponents';
import $fetch from './plugins/fetch';
import client from './plugins/client';
import 'lib-flexible';

import db from './plugins/db';

Vue.config.productionTip = false;

Vue.use(db);
Vue.use($fetch);
Vue.use(client);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
