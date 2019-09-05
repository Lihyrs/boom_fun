<template>
  <router-link class="art-item" :to="{name: 'article', params: { id: data.id }}">
    <van-cell :title="data.title" :clickable="true">
      <template slot="icon">
        <div class="act-left">
          <span class="comm-cnt">{{data.comment_count}}</span>
          <span class="comm-tt">评论</span>
        </div>
      </template>

      <van-row slot="label">
        <van-col  span="24">
          <van-row class="act-content">
            <van-col >{{data.description}}</van-col>
          </van-row>
          <van-row class="act-info footer">
            <van-col>
              <span class="act-up">{{`UP: ${data.username}`}}</span>
            </van-col>
            <van-col>
              <span class="act-time">{{postDate}}</span>
            </van-col>

            <van-col class="act-view">
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
.art-item {
  .comm-tt,
  .comm-cnt {
    display: block;
  }
  .comm-cnt {
    margin: 0 0 4px 4px;
    font-weight: bold;
    font-size: 15PX;
    color: #fd4c5b;
    letter-spacing: 0;
    line-height: 1;
  }
  .comm-tt {
    font-size: 12px;
    color: #999;
    letter-spacing: 0;
    line-height: 12px;
  }
  .footer {
    margin-top:10px;
    .act-time {
      padding: 0 10px;
    }
  }

  .act-content{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    //margin-top: 10px;
  }

  .act-left{
    margin-right: 10px;
        text-align: right;
        padding-top:5px;
  }
  .act-view{
    position: relative;
    .view{
      margin-left: 15PX;
    }
    .icon-view{
      position: absolute;
      left: 0;
      top:50%;
      transform: translateY(-50%)
    }
  }
}
</style>
