<template>
  <div class="reply-wrapper">
    <div class="reply-hd">
      <span class="text">共{{replies ? replies.length : 0}}条回复</span>
      <daq-button size="small" type="primary" @change="reply">评论</daq-button>
    </div>
    <ul class="reply-list">
      <li class="reply-item" v-for="(item, index) in replies" :key="index">
        <div class="author_content">
          <a href="" class="user-avatar">
            <img :src="item.author.avatar_url" :alt="item.author.loginname">
          </a>
          <div class="user-info">
            <a href="" class="user-name">{{item.author.loginname}}</a>
            <a href="reply-time">{{index}}楼•{{item.create_at | timeAgo}}</a>
          </div>
        </div>
        <div class="reply-content" v-html="item.content"></div>

        <div class="reply-operation">
          <span @click="like(item.id, index)" v-if="item.author.loginname !== userInfo.loginname && userInfo.accesstoken"><i
            class="ued-mobile" title="点赞">&#xe643;</i>{{item.ups.indexOf(userInfo.id) !== -1 ? '取消点赞' : '点赞'}}({{item.ups && item.ups.length ? item.ups.length : 0}})</span>
          <span @click="deleteReply(item.id)"
                v-if="item.author.loginname === userInfo.loginname && userInfo.accesstoken"><i class="ued-mobile"
                                                                                               title="删除">&#xe78c;</i>删除</span>
          <span v-if="item.author.loginname === userInfo.loginname && userInfo.accesstoken"><i class="ued-mobile"
                                                                                               title="编辑">&#xe6b9;</i>编辑</span>
          <span v-if="userInfo.accesstoken && item.author.loginname !== userInfo.loginname" @click="reply(item.id, item.author.loginname)"><i class="ued-mobile" title="回复">&#xe6f9;</i>回复</span>
        </div>
      </li>
    </ul>
    <div class="daq-no-data" v-if="replies && !replies.length"></div>
  </div>
</template>

<script>
  import Ajax from '../../service/index.js'
  import comm from '../../util/comm.js'
  import Toast from '../../components/toast'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'reply',
    props: {
      replies: {
        type: Array
      },
      id: {
        type: String
      }
    },
    computed: {
      // 获取数据
      ...mapGetters({
        userInfo: 'getUserInfo'
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
      /**
       * 点赞
       * @param id
       */
      like (id, index) {
        if (!this.jumpLogin()) {
          return false
        }
        Ajax.like({
          accesstoken: this.userInfo.accesstoken,
          reply_id: id
        })
          .then((res) => {
            if (res.action === 'up') {
              this.$parent.details.replies[index].ups.push(this.userInfo.id)
              Toast({
                'message': '点赞成功'
              })
            } else {
              let i = this.$parent.details.replies[index].ups.indexOf(this.userInfo.id)
              this.$parent.details.replies[index].ups.splice(i, 1)
              Toast({
                'message': '取消点赞成功'
              })
            }
          })
      },
      /**
       * 删除评论
       * @param id 评论的id
       **/
      deleteReply (id) {
        if (!this.jumpLogin()) {
          return false
        }
        Ajax.deleteReply({
          accesstoken: this.userInfo.accesstoken,
          reply_id: id
        })
          .then((res) => {
            Toast({
              'message': '删除成功'
            })
          })
      },
      /**
       * 跳转到登录页
       */
      reply (id, loginname) {
        let replyId = id
        if (!this.jumpLogin()) {
          return false
        }
        this.$router.push({
          path: 'comments',
          query: {
            topic_id: this.id,
            reply_id: replyId,
            loginname: loginname
          }
        })
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
</style>
