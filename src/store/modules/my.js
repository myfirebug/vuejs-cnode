/*
 * @Author: UEDHE
 * @Date: 2018/11/1
 * @Version: 1.0
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018/11/1
 */
// state
const state = {
  data: {}
}

const getters = {
  getMyInfo (state) {
    return state
  }
}

// mutations
const mutations = {
  /**
   * 获取用户信息
   * @param state
   * @param payload
   */
  getMyInfo (state, payload) {
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
  getMyInfoAsync ({commit}, data) {
    commit('getMyInfo', data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
