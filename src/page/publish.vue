<template>
    <ul class="publish-form-list">
      <li class="publish-form-item select" @click="selectPlateHandler">
        <input type="text" placeholder="请选择板块" v-model="plateName" readonly>
      </li>
      <li class="publish-form-item inp-l">
        <input type="text" placeholder="标题字数10字以上" v-model="pramas.title">
      </li>
      <li class="publish-form-item">
        <daq-textarea-limit title="主题内容" placeholder="请输入主题内容" :limit="500" :height="500" :isRequire="true" @change="getContent"></daq-textarea-limit>
      </li>
      <li>
        <daq-button type="primary" @change="submit">我要发表</daq-button>
      </li>
    </ul>
</template>

<script>
    import ActionSheet from '../components/actionSheet/index.js'
    import Tips from '../components/tips/index.js'
    import {
      mapGetters
    } from 'vuex'
    export default {
        name: 'publish',
        data () {
          return {
            plateName: '',
            pramas: {
              tab: '',
              title: '',
              content: ''
            }
          }
        },
        computed: {
          // 获取数据
          ...mapGetters({
            userInfo: 'getUserInfo'
          })
        },
        created () {
          if (!this.jumpLogin()) {
            return false
          }
        },
        methods: {
          /**
           * 获取内容
           */
         getContent (str) {
            this.pramas.content = str
          },
          /**
           * 选择主题标签
           */
          selectPlateHandler () {
            let _this = this
            ActionSheet({
              show: true,
              actionSheetList: [
                {
                  name: '分享',
                  value: 'share'
                },
                {
                  name: '问答',
                  value: 'ask'
                },
                {
                  name: '招聘',
                  value: 'job'
                },
                {
                  name: '客户端',
                  value: 'dev'
                }
              ],
              callBack (item) {
                _this.plateName = item.name
                _this.pramas.tab = item.value
              }
            })
          },
          /**
           * 判断是否跳转到登录页
           * @returns {boolean}
           */
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
          },
          validate () {
            if (!this.pramas.tab) {
              Tips({
                message: '请选择板块',
                styles: 'background:rgba(77,0,1,.8)'
              })
              return false
            }
            if (!this.pramas.title) {
              Tips({
                message: '请输入标题',
                styles: 'background:rgba(77,0,1,.8)'
              })
              return false
            }
            if (!this.pramas.content) {
              Tips({
                message: '请输入内容',
                styles: 'background:rgba(77,0,1,.8)'
              })
              return false
            }
            return true
          },
          submit () {
            if (!this.validate()) {
              return false
            }
          }
        }
    }
</script>

<style lang="scss" scoped>
.publish-form{
  &-list{
    width: 100%;
    height: 100%;
    padding:0 .3rem;
    background:#fff;
  }
  &-item{
    position: relative;
    input{
      width: 100%;
      height: 100%;
      background: none;
    }
    &.select:after{
      content: '';
      position: absolute;
      right: .03rem;
      top: .4rem;
      width: .16rem;
      height: .16rem;
      border-left:2px solid $bor05;
      border-bottom:2px solid $bor05;
      transform: rotate(-135deg);
    }
    &.select,
    &.inp-l{
      line-height: .9rem;
      border-bottom: 1px solid $bor05;
    }
    /deep/ .daq-textarea{
      margin:0;
      padding-right: 0;
    }
  }
}
</style>
