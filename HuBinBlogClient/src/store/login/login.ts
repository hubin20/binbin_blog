import { defineStore } from 'pinia'
import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  accountRegisterRequest
} from '@/service/login/login'

export const useLoginStore = defineStore('LoginStore', {
  state: () => {
    return {
      token: '',
      username: ''
    }
  },
  actions: {
    async accountLoginAction(payload: any) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      return loginResult
    },

    //刷新页面vuex数据会丢失,所以需要获取保存的数据
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const username = localCache.getCache('username')
      if (username) {
        this.username = username
      }
    },
    async accountRegisterAction(payload: any) {
      //1.实现登录逻辑
      const regResult = await accountRegisterRequest(payload)

      return regResult
    }
  }
})
