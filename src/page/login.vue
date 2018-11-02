<template>
    <div class="login">
      <h1 class="title">欢迎来到CNODE社区</h1>
      <ul class="form-list">
        <li class="form-item"><input type="text" placeholder="请输入Access Token" v-model="accesstoken"></li>
        <li><daq-button type="primary" @change="submit">登录</daq-button></li>
        <li><daq-button type="primary" @change="exit">退出</daq-button></li>
      </ul>
    </div>
</template>

<script>
    import Ajax from '../service/index.js'
    export default {
        name: 'login',
        data () {
          return {
            accesstoken: ''
          }
        },
      methods: {
        submit () {
          Ajax.login({
            accesstoken: this.accesstoken
          })
            .then((res) => {
              let userInfo = {
                accesstoken: this.accesstoken,
                avatar_url: res.avatar_url,
                id: res.id,
                loginname: res.loginname
              }
              this.$store.dispatch('getUserInfoAsync', userInfo)
              document.location.href = this.$route.query.redirect
            })
        },
        exit () {
          this.$store.dispatch('deleteUserInfo')
        }
      }
    }
</script>

<style lang="scss" scoped>
.login{
  .title{
    padding:1.5rem 0 .2rem 0;
    text-align: center;
    font-size:$f36;
  }
  padding:0 .4rem;
  height: 100%;
  background:$bg04;
  .form-list{
    li{
      margin-top:.3rem;
    }
  }
  .form-item{
    height: .9rem;
    border-radius: .1rem;
    border:1px solid $bor05;
  }
  input{
    width: 100%;
    height: 100%;
    text-indent: .2rem;
    background: none;
    font-size: $f30;
  }
}
</style>
