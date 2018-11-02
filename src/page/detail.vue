<template>
  <div class="details-wrapper" v-show="details">
    <div class="details-bd">
      <div class="article-header">
        <h1 class="article-title">{{details.title}}</h1>
        <div class="article-info">
          <span><i class="ued-mobile">&#xe666;</i>{{details.reply_count}}</span>
          <span><i class="ued-mobile">&#xe637;</i>{{details.visit_count}}</span>
          <span><i class="ued-mobile">&#xe78b;</i>{{details.last_reply_at | timeAgo}}</span>
          <span><i class="ued-mobile">&#xe6a1;</i>{{details.author && details.author.loginname ? details.author.loginname : '暂无'}}</span>
        </div>
      </div>
      <div v-html="details.content"></div>
      <!--评论列表 start-->
      <cnode-reply :replies="details.replies" :id="details.id"></cnode-reply>
      <!--评论列表 end-->
    </div>
    <div class="details-ft">
      <span class="edit"
            v-if="details.author && details.author.loginname === userInfo.loginname && userInfo.accesstoken"><i
        class="ued-mobile">&#xe6b9;</i>编辑</span>
      <span class="delete"
            v-if="details.author && details.author.loginname === userInfo.loginname && userInfo.accesstoken"><i
        class="ued-mobile">&#xe78c;</i>删除</span>
      <span class="collection" @click="collect">{{details.is_collect ? '取消收藏' : '收藏'}}</span>
    </div>
  </div>
</template>
<script>
  import Ajax from '../service/index.js'
  import comm from '../util/comm.js'
  import Reply from '../common/reply/reply.vue'
  import Toast from '../components/toast/index.js'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'detail',
    data () {
      return {
        details: {}
      }
    },
    components: {
      'cnode-reply': Reply
    },
    computed: {
      // 获取数据
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    created () {
      /**
       * 请求接口
       */
      Ajax.getDetail(this.$route.query.id)
        .then((data) => {
          this.details = data.data
        })
    },
    filters: {
      /**
       * 计算时间
       * @param {String} 时间
       * @returns {string}
       */
      timeAgo (str) {
        return comm.timeAgo(str)
      }
    },
    methods: {
      collect () {
        if (!this.jumpLogin()) {
          return false
        }
        if (this.details.is_collect) {
          Ajax.collect({
            accesstoken: this.userInfo.accesstoken,
            topic_id: this.details.id
          })
            .then((res) => {
              if (res.success) {
                Toast({
                  type: 'sucess',
                  message: '收藏成功'
                })
                this.details.is_collect = true
              } else {
                this.details.is_collect = false
              }
            })
        } else {
          Ajax.deCollect({
            accesstoken: this.userInfo.accesstoken,
            topic_id: this.details.id
          })
            .then((res) => {
              if (res.success) {
                Toast({
                  type: 'sucess',
                  message: '取消收藏成功'
                })
                this.details.is_collect = false
              } else {
                this.details.is_collect = true
              }
            })
        }
      },
      jumpLogin () {
        if (!this.userInfo.accesstoken) {
          this.$router.push({
            path: 'login',
            query: {
              redirect: document.location.href
            }
          })
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details-wrapper {
    padding-bottom: .96rem;
    background: $bg04;
    .article {
      &-header {
        padding: .5rem .3rem;
        border-bottom: 1px solid $bor05;
        h1 {
          font-size: .4rem;
          font-weight: bold;
        }
      }
      &-info {
        padding-top: .2rem;
        font-size: 0;
        .ued-mobile {
          padding-right: .1rem;
          font-size: $f20;
        }
        span {
          padding-right: .2rem;
          line-height: 1;
          font-size: .24rem;
          color: $fc09;
          margin-right: .2rem;
          border-right: 1px solid $bor06;
          &:last-child {
            border: none;
          }
        }
      }
    }
    /deep/ .markdown-text {
      padding: 0 .3rem;
      font-size: .3rem;
      overflow: hidden;
      h2 {
        padding: .3rem 0;
      }
      h3,
      h4 {
        padding: .3rem 0;
      }
      h1 {
        display: none;
      }
      p,
      li {
        margin: .3rem 0;
        color: $fc07;
      }
      a {
        color: $fc01;
        word-wrap: break-word
      }
    }
    .reply-wrapper {
      .reply-hd {
        display: flex;
        padding: .2rem .3rem;
        background: $bg02;
        border-bottom: 1px solid $bor03;
        border-top: 1px solid $bor05;
        .text {
          flex: 1;
        }
      }
      .reply-list {
        padding: 0 0 0 .3rem;
        background: $bg04;
      }
      .reply-item {
        padding: .2rem 0;
        border-bottom: 1px solid $bor05;
        /deep/ .markdown-text {
          padding-left: 0;
        }
      }

      .reply-operation {
        padding-right: .3rem;
        font-size: $f26;
        line-height: 1;
        span {
          padding-right: .2rem;
          margin-right: .2rem;
          border-right: 1px solid $bor05;
          color: $fc07;
          &:last-child {
            border: none;
          }
        }
        i {
          display: inline-block;
          padding-right: .1rem;
          text-align: center;
          color: $fc08;
          font-size: $f26;
        }
      }
      .author_content {
        display: flex;
        align-items: center;
        font-size: $f28;
        .user-avatar {
          width: .6rem;
          height: .6rem;
          margin-right: .1rem;
          border-radius: 50%;
          overflow: hidden;
          background: #ccc;
        }
        .user-info {
          flex: 1;
        }
      }
    }
    .details-ft {
      display: flex;
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      background: $bg04;
      height: .96rem;
      text-align: center;
      border-top: 1px solid $bor05;
      span {
        flex: 1;
        font-size: $f24;
        border-left: 1px solid $bor05;
        color: $fc07;
      }
      i {
        display: block;
        padding-top: .1rem;
      }
      .collection {
        line-height: .96rem;
        flex: 3;
        background: $btn01;
        color: #fff;
        font-size: $f36;
      }
    }
  }
</style>
