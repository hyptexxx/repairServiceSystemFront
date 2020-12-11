import { Module } from 'vuex'
import LoginStoreInterface from '../interface/LoginStoreInterface'
import { StoreInterface } from 'src/store/interface/StoreInterface'
import { User } from 'src/models/auth'

const LoginModule: Module<LoginStoreInterface, StoreInterface> = {
  namespaced: true,
  state: () => ({
    loginned: false,
    user: {} as User | null
  }),
  mutations: {
    setLoginned (state: any, visible: boolean): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.loginned = visible
    },
    setResponseUser (state: any, user: User | null): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.user = user
    }
  },
  actions: {},
  modules: {},
  getters: {
    getLoginned: state => {
      return state.loginned
    },
    getResponseUser: state => {
      return state.user
    }
  }
}

export default LoginModule
