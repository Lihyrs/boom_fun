import Vue from 'vue';
import {
  Image, Lazyload, ImagePreview, Row, Col, Tab, Tabs, List, Cell, Icon, PullRefresh, // Popup,
  Loading, Divider,
  NavBar, Tabbar, TabbarItem, Button,
} from 'vant';

import Comment from '../components/Comment.vue';
import Avatar from '../components/Avatar.vue';
import ArticleList from '../components/ArticleList.vue';
import CommentImage from '../components/CommentImage.vue';
import CommentHeader from '../components/CommentHeader.vue';
import CommentFooter from '../components/CommentFooter.vue';
import LoadingView from '../components/Loading.vue';
import CommentText from '../components/CommentText.vue';
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
// Vue.use(Popup);
Vue.use(Loading);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);
Vue.use(Divider);
/* end of vant ui */

/* begin of cunstom component */
Vue.component('Comment', Comment);
Vue.component('Avatar', Avatar);
Vue.component('ArticleList', ArticleList);
Vue.component('CommentFooter', CommentFooter);
Vue.component('CommentHeader', CommentHeader);
Vue.component('CommentImage', CommentImage);
Vue.component('LoadingView', LoadingView);
Vue.component('CommentText', CommentText);
/* end of cunstom component */
