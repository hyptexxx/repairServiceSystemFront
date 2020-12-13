import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'

@Component
export default class APIRequests extends Mixins(LoginStore) {
  public async logout (): Promise<void> {
    const result = await this.$axios.post('/logout')
    if (result.status === 200) {
      this.$q.localStorage.clear()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      this.setLoginned(false)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      this.setResponseUser(null)
      this.$q.localStorage.remove('isLogged')
      await this.$router.push({ name: 'login' })
    }
  }
}
