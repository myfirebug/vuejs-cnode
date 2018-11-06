<template>
    <div class="my" v-show="myInfo">
        <div class="my-hd">
          <div class="bg" :style="{backgroundImage:'url(' + myInfo.data.avatar_url + ')'}"></div>
          <div class="user">
            <div class="user-avatar"><img :src="myInfo.data.avatar_url" :alt="myInfo.data.loginname"></div>
            <div class="user-info">
              <span class="user-name">{{myInfo.data.loginname}}</span>
              <p>积分：{{myInfo.data.score}}</p>
            </div>
          </div>
        </div>
        <ul class="my-bd">
          <router-link tag="li" :to="{ path: '/topic', query:{ loginname: loginname, type: 'create' }}">
          <li>最近创建的话题</li>
          </router-link>
          <router-link tag="li" :to="{ path: '/topic', query:{ loginname: loginname, type: 'part' }}">
          <li>最近参与的话题</li>
          </router-link>
          <router-link v-show="userInfo.loginname && userInfo.loginname === myInfo.data.loginname" tag="li" :to="{ path: '/setting'}">
          <li>设置</li>
          </router-link>
        </ul>
      <daq-tabbar :fixed="false" v-show="userInfo.loginname && userInfo.loginname === myInfo.data.loginname">
        <daq-tabbar-item url="home" text="首页" defaultIcon="&#xe729;" activeIcon="&#xe729;"></daq-tabbar-item>
        <daq-tabbar-item url="bottomMenuBar" text="发表" defaultIcon="&#xe6b9;" activeIcon="&#xe6b9;"></daq-tabbar-item>
        <daq-tabbar-item url="list" text="消息" defaultIcon="&#xe68a;" activeIcon="&#xe68a;">
          <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
        </daq-tabbar-item>
        <daq-tabbar-item url="my" text="我的" defaultIcon="&#xe6a1;" activeIcon="&#xe6a1;"></daq-tabbar-item>
      </daq-tabbar>
    </div>
</template>

<script>
    import Ajax from '../service/index.js'
    import {
      mapGetters
    } from 'vuex'
    export default {
        name: 'my',
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
      }
    }
</script>

<style  lang="scss" scoped>
.my{
  height: 100%;
  overflow: hidden;
 &-hd{
   position: relative;
   z-index: 1;
   height: 2rem;
   padding:.4rem .3rem 0 .3rem;
   color:$fc10;
   background: $btn01;
   overflow: hidden;
   .bg{
     position: absolute;
     left:0;
     top:0;
     width: 100%;
     height: 100%;
     background-repeat: no-repeat;
     background-size: 100% auto;
     background-position: 50%;
     filter: blur(65px);
     opacity: .4;
     transform: translateZ(0);
   }
   .user{
     display: flex;
     position: relative;
     z-index: 1;
     &-avatar{
       width: 1.2rem;
       height: 1.2rem;
       border-radius:50%;
       overflow: hidden;
       border:.06rem solid rgba(0,0,0,.1);
       img{
         width: 100%;
         height: 100%;
       }
     }
     &-info{
       padding-left: .2rem;
       flex:1;
       p{
         padding-top:.15rem;
         font-size:$f26;
       }
     }
     &-name{
       font-size:$f36;
     }
   }
 }
  &-bd{
    margin-top:.2rem;
    padding-left:.3rem;
    position: relative;
    background:#fff;
    z-index: 1;
    border-top:1px solid $bor05;
    border-bottom:1px solid $bor05;
    li{
      position: relative;
      height: 1rem;
      line-height: 1rem;
      color:$fc06;
      border-bottom:1px solid $bor05;
      &:after{
        content: '';
        position: absolute;
        right: .32rem;
        top:50%;
        margin-top:-.07rem;
        width: .14rem;
        height: .14rem;
        transform:rotate(-135deg);
        border-left:.03rem solid #ccc;
        border-bottom:.03rem solid #ccc;
      }
      &:last-child{
        border: none;
      }
    }
  }
}
</style>
