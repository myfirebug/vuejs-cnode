<template>
  <div class="topic">
    <ul class="list">
      <li class="item" v-for="(item, index) in (this.$route.query.type === 'create' ? myInfo.data.recent_topics : myInfo.data.recent_replies)" :key="index">
        <div class="item-hd">
          <router-link tag="div" :to="{ path: '/my', query:{ loginname: item.author.loginname }}">
            <div class="user-avatar"><img :src="item.author.avatar_url"></div>
          </router-link>
          <div class="user-info">
            <router-link tag="p" :to="{ path: '/my', query:{ loginname: item.author.loginname }}">
              <p class="user-name">{{item.author.loginname}}</p>
              <p class="create-at">{{item.last_reply_at | timeAgo}}</p>
            </router-link>
          </div>
        </div>
        <router-link :to="{ path: '/detail', query:{ id: item.id }}">
          <div class="item-bd"><h2>{{item.title}}</h2></div>
        </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
  import Ajax from '../service/index.js'
  import comm from '../util/comm.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'topic',
    data () {
      return {
        loginname: this.$route.query.loginname
      }
    },
    computed: {
      // 获取数据
      ...mapGetters({
        userInfo: 'getUserInfo',
        myInfo: 'getMyInfo'
      })
    },
    created () {
      if (this.$route.query.type === 'create') {
        document.title = '最近创建的话题'
      } else {
        document.title = '最近参与的话题'
      }
      const vuexLoginName = this.myInfo.data.loginname
      // 判断是否需要加载ajax请求
      if (!this.loginname) {
        if (vuexLoginName && vuexLoginName === this.userInfo.loginname) {
          return false
        }
        if (!this.jumpLogin()) {
          return false
        }
      } else if (vuexLoginName && vuexLoginName === this.loginname) {
        return false
      }
      Ajax.my({
        loginname: this.loginname ? this.loginname : this.userInfo.loginname
      })
        .then((res) => {
          this.$store.dispatch('getMyInfoAsync', res.data)
        })
    },
    methods: {
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
    }
  }
</script>

<style lang="scss" scoped>
.topic{
  background:$bg04;
  .list{}
  .item{
    padding:.2rem .3rem;
    border-bottom:1px solid $bor06;
    transition: all .25s ease 0s;
    &:active{
      background:rgba(0,0,0,.05)
    }
    &-hd{
      display: flex;
      align-items: center;
      .user-avatar{
        width: .6rem;
        height: .6rem;
        margin-right: .1rem;
        border-radius: 50%;
        overflow: hidden;
        background:#ccc;
      }
      .user-name{
        font-size: .34rem;
        line-height: 1;
      }
      .create-at{
        padding-top: .15rem;
        font-size: .24rem;
        color: $fc08;
        line-height: 1;
      }
    }
    &-bd{
      padding: .2rem 0;
      font-size: .36rem;
      .put-top{
        padding: 0 .1rem;
        vertical-align: middle;
        display: inline-block;
        margin-right: .1rem;
        line-height: .36rem;
        font-size: .22rem;
        border:1px solid $bor01;
        color:$bor01;
      }
    }
    &-ft{
      font-size: 0;
      .ued-mobile{
        padding-right: .1rem;
        font-size: $f20;
      }
      span{
        padding-right: .2rem;
        line-height: 1;
        font-size: .24rem;
        color: $fc09;
        margin-right: .2rem;
        border-right: 1px solid $bor06;
        &:last-child{
          border: none;
        }
      }
    }
  }
}
</style>
