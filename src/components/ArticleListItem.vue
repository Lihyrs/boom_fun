<template>
  <div>
    <router-link
      class="art-item"
      :to="{name: 'article', params: { id: data.id,channelId:data.channel_id }}"
    >
      <van-row gutter="10">
        <van-col span="2" class="act-left">
          <div>
            <span class="comm-cnt">{{commentCount}}</span>
            <span class="comm-tt">评论</span>
          </div>
        </van-col>
        <van-col span="20" class="act-right">
          <van-row>
            <van-col span="24" class="act-header">{{data.title}}</van-col>
            <van-col span="24" class="act-content" v-html="data.description"></van-col>
            <van-col span="24" class="act-info footer">
              <van-row>
                <van-col>
                  <span class="act-up">{{`UP: ${data.username}`}}</span>
                </van-col>
                <van-col>
                  <span class="act-time">{{postDate}}</span>
                </van-col>

                <van-col class="act-view">
                  <van-icon class="icon-view" size="14" name="eye-o" />
                  <span class="view">{{viewCount}}</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </router-link>
    <van-divider v-if="divider"></van-divider>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    divider: {
      type: Boolean,
    },
  },
  computed: {
    postDate() {
      return moment(this.contribute_time).format('YYYY-MM-DD hh:mm:ss');
    },
    commentCount() {
      let count = this.data.comment_count;
      if (count === 0) {
        return count;
      }
      let ret = count / (10 * 1000);
      if (parseInt(ret, 10) > 0) {
        if (count % (10 * 1000) > 1000) {
          return `${ret.toFixed(1)}W`;
        }
        return `${parseInt(ret, 10)}W`;
      }
      return count;
    },
    viewCount() {
      let count = this.data.view_count;

      if (count === 0) {
        return count;
      }
      let ret = count / (10 * 1000);
      if (parseInt(ret, 10) > 0) {
        if (count % (10 * 1000) > 1000) {
          return `${ret.toFixed(1)}万`;
        }
        return `${parseInt(ret, 10)}万`;
      }
      return count;
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
    font-size: 15px;
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
    margin-top: 10px;
    .act-time {
      padding: 0 10px;
    }
  }

  .act-right {
    .act-header {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      color: #333;
      letter-spacing: 0;
      line-height: 20px;
      height: 20px;
    }
    .act-content {
      margin-top: 10px;
      font-size: 14px;
      color: #999;
      line-height: 1.2;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
    }

    .act-info {
      font-size: 12px;
      color: #999;
      letter-spacing: 0;
      margin-top: 10px;
      line-height: 14px;

      .act-up {
        max-width: 110px;
        display: inline-block;
      }
    }
  }

  .act-left {
    text-align: right;
    width: 70px;
  }

  .act-view {
    display: flex;
    justify-content: center;
    align-items: center;
    // position: relative;
    .view {
      // margin-left: 15px;
      padding-left: 4px;
    }
  }
}
</style>
