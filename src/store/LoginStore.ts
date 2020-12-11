import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class/lib'
import { User } from 'src/models/auth'

const LoginModule = namespace('LoginModule')

@Component
export default class LoginStore extends Vue {
  // setters

  @LoginModule.Mutation('setLoginned')
  public setLoginned!: (isLoginned: boolean) => void

  @LoginModule.Mutation('setResponseUser')
  public setResponseUser!: (user: User | null) => void

  // getters

  @LoginModule.Getter('getLoginned')
  public loginned!: boolean

  @LoginModule.Getter('getResponseUser')
  public responseUser!: User
}
