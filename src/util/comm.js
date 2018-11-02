/*
* @Author: hejianping
* @Date:   2018-06-06 09:47:16
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-06-07 12:04:49
*/
const comm = {
  /**
  * [获取url参数]
  * @returns
  */
  getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  /**
   * [判断是否是微信浏览器]
   * @returns
   */
  isWechatBrowsers () {
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') !== -1) {
      return true
    } else {
      return false
    }
  },
  timeAgo (str) {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime()
    if (time < 0) {
      return ''
    } else if ((time / 1000 < 30)) {
      return '刚刚'
    } else if (time / 1000 < 60) {
      return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
      return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
      return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
      return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
      return parseInt(time / 2592000000) + '月前'
    } else {
      return parseInt(time / 31536000000) + '年前'
    }
  },
  fmtDate (date, fmt) {
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
export default comm
