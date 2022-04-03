/*
 * @Author: 小政 <1911298402@qq.com>
 * @Description: 社保
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.xiaozheng
 * @Last Modified time: 2018-04-13 16:15:33
 */

const app = {
  state: {
    name: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    setName({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        commit('SET_NAME', username)
        resolve()
      })
    }
  }
}

export default app