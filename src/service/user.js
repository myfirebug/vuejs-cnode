/*
 * @Author: UEDHE
 * @Date:   2018-05-07 16:25:26
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-24 14:14:39
 */

import ajax from './fetch.js'

export default {
  /**
   * 登录
   * @param params
   */
  login (params) {
    return ajax({
      url: '/accesstoken',
      type: 'POST',
      params: params
    })
  },
  /**
   * 获取主题
   * @param params
   */
  getTopics (params) {
    return ajax({
      url: '/topics',
      type: 'GET',
      params: params
    })
  },
  /**
   * 获取详情页
   * @param id
   */
  getDetail (id) {
    return ajax({
      url: '/topic/' + id,
      type: 'GET'
    })
  },
  /**
   * 主题收藏
   * @param params
   */
  collect (params) {
    return ajax({
      url: '/topic_collect/collect',
      type: 'POST',
      params: params
    })
  },
  /**
   * 取消主题收藏
   * @param params
   */
  deCollect (params) {
    return ajax({
      url: '/topic_collect/de_collect',
      type: 'POST',
      params: params
    })
  },
  /**
   * 为评论点赞
   * @param params
   */
  like (params) {
    return ajax({
      url: '/reply/' + params.reply_id + '/ups',
      type: 'POST',
      loading: false,
      params: {
        accesstoken: params.accesstoken
      }
    })
  },
  /**
   * 删除评论
   * @param params
   */
  deleteReply (params) {
    return ajax({
      url: '/reply/' + params.reply_id + '/delete',
      type: 'POST',
      loading: false,
      params: {
        accesstoken: params.accesstoken
      }
    })
  },
  /**
   * 新建评论
   * @param params
   */
  addReply (params) {
    return ajax({
      url: '/topic/' + params.topic_id + '/replies',
      type: 'POST',
      loading: false,
      params: {
        accesstoken: params.accesstoken,
        reply_id: params.id ? params.id : '',
        content: params.content
      }
    })
  }
}
