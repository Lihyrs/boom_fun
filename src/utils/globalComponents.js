import Vue from 'vue';
import {
  Image, Lazyload, ImagePreview, Row, Col, Tab, Tabs, List, Cell, Icon, PullRefresh, Popup, Loading,
} from 'vant';

import Comment from '../components/Comment.vue';
import Avatar from '../components/Avatar.vue';
import ArticleList from '../components/ArticleList.vue';
import CommentImage from '../components/CommentImage.vue';
import CommentHeader from '../components/CommentHeader.vue';
import CommentFooter from '../components/CommentFooter.vue';
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
Vue.use(Popup);
Vue.use(Loading);

/* end of vant ui */

/* begin of cunstom component */
Vue.component('Comment', Comment);
Vue.component('Avatar', Avatar);
Vue.component('ArticleList', ArticleList);
Vue.component('CommentFooter', CommentFooter);
Vue.component('CommentHeader', CommentHeader);
Vue.component('CommentImage', CommentImage);
/* end of cunstom component */
