<template>
  <router-link :to="{name: 'article', params: { id: data.id }}">
    <van-cell class="item" :title="data.title" :clickable="true">
      <template slot="icon">
        <div>
          <span class="comm-cnt">{{data.comment_count}}</span>
          <span class="comm-tt">评论</span>
        </div>
      </template>

      <van-row slot="label">
        <van-col>
          <van-row class="act-content">
            <van-col>{{data.description}}</van-col>
          </van-row>
          <van-row class="act-info footer">
            <van-col>
              <span class="act-up">{{`UP: ${data.username}`}}</span>
            </van-col>
            <van-col>
              <span class="act-time">{{postDate}}</span>
            </van-col>

            <van-col>
              <van-icon class="icon-view" size="14" name="eye-o" />
              <span class="view">{{data.view_count}}</span>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-cell>
  </router-link>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postDate() {
      return moment(this.contribute_time).format('YYYY-MM-DD hh:mm:ss');
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  .comm-tt,
  .comm-cnt {
    display: block;
    text-align: center;
  }
  .comm-cnt {
    margin: 0 0 4px 4px;
    font-weight: bold;
    font-size: 20px;
    color: #fd4c5b;
    letter-spacing: 0;
    line-height: 20px;
  }
  .com-tt {
    font-size: 12px;
    color: #999;
    letter-spacing: 0;
    line-height: 12px;
    margin: 0 auto;
  }
  .footer {
    .act-time {
      padding: 0 10px;
    }
  }
}
</style>
