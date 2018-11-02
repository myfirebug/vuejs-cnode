/*
 * @Author: UEDHE
 * @Date: 2018/11/1
 * @Version: 1.0
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018/11/1
 */
// state
import los from '../../util/localStorage.js'
const state = {
  data: los.get('userInfo') ? los.get('userInfo') : {}
}

const getters = {
  getUserInfo (state) {
    return state.data
  }
}

// mutations
const mutations = {
  /**
   * 获取用户信息
   * @param state
   * @param payload
   */
  getUserInfo (state, payload) {
    state.data = payload
  }
}

// actions
const actions = {
  /**
   * 获取用户信息
   * @param commit
   * @param user
   */
  getUserInfoAsync ({commit}, user) {
    los.set('userInfo', user)
    commit('getUserInfo', user)
  },
  /**
   * 删除用户信息
   * @param commit
   * @param user
   */
  deleteUserInfo ({commit}) {
    los.remove('userInfo')
    commit('getUserInfo', {
      accesstoken: '',
      avatar_url: '',
      id: '',
      loginname: ''
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
