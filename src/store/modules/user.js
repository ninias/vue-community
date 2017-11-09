import API from '../../lib/API'
import * as types from '../types'

//因为每一个module都拥有vuex的5个属性

//state设置默认的初始状态
const state = {
  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户登录状态
  userData: []
};


//actions从服务端请求数据，在数据完成后调用store.commit()来调用更改store中的状态
const actions = {
  // 用户登录
  signIn({commit}, userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));//将登录信息页面存储
    localStorage.setItem('loginStatus',true);
    commit(types.SET_USER_INFO, userInfo);
    commit(types.SET_LOGIN_STATUS, true);
  },
  // 退出登录
  signOut({commit}){
    localStorage.removeItem('userInfo')
    localStorage.removeItem('loginStatus')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  },
  //请求用户信息
  getUserData({ commit }, username) {
    let params = {
      userName:username
    };
    API.getUserData(params).then((res) => {
      console.log(res.data.data);
      commit(types.SET_USER_DATA, res.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
};


//过滤我们拿到的数据
const getters = {
  loginStatus: state => state.loginStatus,
  userData: state => state.userData
};


//调用mutations是唯一允许更新应用状态的地方
const mutations = {
  [types.SET_USER_INFO](state, res) {   //第二个参数status是请求成功commit 返回进来的数据res
    state.userInfo = res
  },
  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },
  [types.SET_USER_DATA](state, res) {
    state.userData = res
  }
};
export default {
  state,
  actions,
  getters,
  mutations
}
