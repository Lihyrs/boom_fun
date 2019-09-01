import Vue from 'vue';
import {
  Image, Lazyload, ImagePreview, Row, Col,
} from 'vant';

import Comment from '../components/Comment.vue';
import Avatar from '../components/Avatar.vue';


/* begin of vant ui */
Vue.use(Image);
Vue.use(Lazyload);
Vue.use(ImagePreview);
Vue.use(Row).use(Col);

/* end of vant ui */

/* begin of cunstom component */
Vue.component('Comment', Comment);
Vue.component('Avatar', Avatar);
/* end of cunstom component */
