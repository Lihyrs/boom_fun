import Vue from 'vue';
import {
  Image, Lazyload, ImagePreview, Row, Col, Tab, Tabs, List, Cell, Icon, PullRefresh,
} from 'vant';

import Comment from '../components/Comment.vue';
import Avatar from '../components/Avatar.vue';
import ArticleList from '../components/ArticleList.vue';
// import 'vant/lib/icon/local.css';


/* begin of vant ui */
Vue.use(Image);
Vue.use(Lazyload);
Vue.use(ImagePreview);
Vue.use(Row).use(Col);
Vue.use(Tab).use(Tabs);
Vue.use(List);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(PullRefresh);

/* end of vant ui */

/* begin of cunstom component */
Vue.component('Comment', Comment);
Vue.component('Avatar', Avatar);
Vue.component('ArticleList', ArticleList);
/* end of cunstom component */
