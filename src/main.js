import Vue from 'vue';
import '@vant/touch-emulator';
import App from './components/AppLayout.vue';
// import router from './router';
// import store from './store';
import './utils/globalComponents';

import db from './plugins/db';

Vue.config.productionTip = false;

Vue.use(db);

new Vue({
  // router,
  // store,
  render: h => h(App),
}).$mount('#app');
