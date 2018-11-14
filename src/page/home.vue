<template>
  <div class="home">
    <!--选项卡 start-->
    <div class="tabs-wrapper">
      <ul class="tabs-list">
        <li class="tabs-item" :class="tab.className" v-for="(tab, index) in tabs" :key="index" @click="getTab(tab.value, index)">{{tab.name}}</li>
      </ul>
    </div>
    <!--选项卡 end-->
    <!--主体 start-->
    <div class="main" v-show="list">
      <daq-scroll-load requestName="getTopics" :list="list" :params="params" @list="getList">
      <ul class="list" slot="list">
        <li class="item" v-for="item in list" :key="item.id">
            <div class="item-hd">
              <router-link tag="div" :to="{ path: '/my', query:{ loginname: item.author.loginname }}">
                <div class="user-avatar"><img :src="item.author.avatar_url"></div>
              </router-link>
              <div class="user-info">
                <router-link tag="p" :to="{ path: '/my', query:{ loginname: item.author.loginname }}">
                  <p class="user-name">{{item.author.loginname}}</p>
                </router-link>
                <p class="create-at">{{item.create_at | fmtDate}}</p>
              </div>
            </div>
          <router-link :to="{ path: '/detail', query:{ id: item.id }}">
            <div class="item-bd"><h2><span class="put-top">{{[item.tab, item.good, item.top] | getLabel}}</span>{{item.title}}</h2></div>
            <div class="item-ft">
              <span><i class="ued-mobile">&#xe666;</i>{{item.reply_count}}</span>
              <span><i class="ued-mobile">&#xe637;</i>{{item.visit_count}}</span>
              <span><i class="ued-mobile">&#xe78b;</i>{{item.last_reply_at | timeAgo}}</span>
            </div>
          </router-link>
        </li>
      </ul>
      </daq-scroll-load>
    </div>
    <!--主体 end-->
    <daq-tabbar :fixed="false">
      <daq-tabbar-item url="home" text="首页" defaultIcon="&#xe729;" activeIcon="&#xe729;"></daq-tabbar-item>
      <daq-tabbar-item url="publish" text="发表" defaultIcon="&#xe6b9;" activeIcon="&#xe6b9;"></daq-tabbar-item>
      <daq-tabbar-item url="message" text="消息" defaultIcon="&#xe68a;" activeIcon="&#xe68a;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item url="my" text="我的" defaultIcon="&#xe6a1;" activeIcon="&#xe6a1;"></daq-tabbar-item>
    </daq-tabbar>
  </div>
</template>
<script>
  import comm from '../util/comm.js'
  export default {
    name: 'home',
    data () {
      return {
        // 标签
        tabs: [
          {
            name: '全部',
            value: '',
            className: 'active'
          },
          {
            name: '精华',
            value: 'good',
            className: ''
          },
          {
            name: '分享',
            value: 'share',
            className: ''
          },
          {
            name: '问答',
            value: 'ask',
            className: ''
          },
          {
            name: '招聘',
            value: 'job',
            className: ''
          },
          {
            name: '客户端',
            value: 'dev',
            className: ''
          }
        ],
        // 列表数据
        list: [],
        // 参数
        params: {
          page: 1,
          tab: ''
        }
      }
    },
    methods: {
      /**
       * 获取列表数据
       * @param {Array} 列表数据
       **/
      getList (arr) {
        this.list = this.list.concat(arr)
      },
      /**
       * 选项卡
       * @param {String} 滚动所传的tab参数
       * @param {Number} 选中的下标值
       **/
      getTab (tab, index) {
        this.params.tab = tab
        for (let i = 0; i < this.tabs.length; i++) {
          this.tabs[i].className = ''
        }
        this.tabs[index].className = 'active'
      }
    },
    filters: {
      /**
       * 获取文字标签
       * @param  {String}  日期字符串
       * @returns {string}
       **/
      fmtDate (str) {
        if (new Date(str).getFullYear() < new Date().getFullYear()) {
          return comm.fmtDate(new Date(str), 'yyyy-MM-dd hh:mm')
        } else {
          return comm.fmtDate(new Date(str), 'MM-dd hh:mm')
        }
      },
      /**
       * 获取文字标签
       * @param  {Array}  tab, good, top
       * @returns {string}
       */
      getLabel (label) {
        let str = ''
        if (label[1]) {
          str = '精华'
        } else if (label[2]) {
          str = '置顶'
        } else {
          switch (label[0]) {
            case 'share':
              str = '分享'
              break
            case 'ask':
              str = '问答'
              break
            case 'job':
              str = '招聘'
              break
            default:
              str = '暂无'
          }
        }
        return str
      },
      /**
       * 计算时间
       * @param {String} 时间
       * @returns {string}
       */
      timeAgo (str) {
        return comm.timeAgo(str)
      }
    },
    watch: {
      params: {
        handler (d) {
          this.list = []
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabs-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    background: $btn01;
    color: $fc10;
    font-size: $f30;
    .tabs-list {
      display: flex;
    }
    .tabs-item {
      flex: 1;
      cursor: pointer;
      background: $btn01;
      transition: all .25s ease 0s;
      &:active {
        background: $btn01hover;
      }
    }
    .active{
      font-weight: bold;
    }
  }
  .main{
    padding:.9rem 0 .96rem 0;
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
