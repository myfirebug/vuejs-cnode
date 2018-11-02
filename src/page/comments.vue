<template>
  <div class="comments-wrapper">
    <daq-textarea-limit :title="title" :isRequire="true" :limit="200" :defaultValue="value" @change="getValue"></daq-textarea-limit>
    <div class="buttons">
      <daq-button type="primary" @change="submit">确定</daq-button>
    </div>
  </div>
</template>

<script>
  import Ajax from '../service/index.js'
  import Tips from '../components/tips/index.js'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'comments',
    data () {
      return {
        title: !this.$route.query.reply_id ? '我要评论' : '我要回复',
        value: this.$route.query.loginname ? '@' + this.$route.query.loginname : ''
      }
    },
    computed: {
      // 获取数据
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      /**
       * 获取值
       * @param value
       */
      getValue (value) {
        this.value = value
      },
      /**
       * 表单验证
       */
      formValidate () {
        if (!this.value) {
          Tips({
            styles: 'background:rgba(48,0,0,.8)',
            message: '请输入评价内容或者回复内容'
          })
          return false
        }
        return true
      },
      submit () {
        if (!this.formValidate()) {
          return false
        }
        Ajax.addReply({
          topic_id: this.$route.query.topic_id,
          accesstoken: this.userInfo.accesstoken,
          reply_id: this.$route.query.reply_id,
          content: this.value
        })
          .then(() => {
            this.$router.go(-1)
          })
          .catch((res) => {
            Tips({
              styles: 'background:rgba(48,0,0,.8)',
              message: '服务器错误或者你今天已经提交进行了30次提交'
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comments-wrapper {
    width: 100%;
    height: 100%;
    background: $bg04;
    .buttons {
      padding: 0 .3rem;
    }
  }
</style>
