import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import { RepairRequest, Status } from 'src/models/models'

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

  public async getAllRequests (): Promise<RepairRequest[]> {
    const result = await this.$axios.get<RepairRequest[]>('/repair_request')

    return result.data
  }

  public async getAllStatuses (): Promise<Status[]> {
    const result = await this.$axios.get<Status[]>('/statuses')

    return result.data
  }

  public async setNewStatus (request: RepairRequest): Promise<RepairRequest> {
    console.log(request)
    const formData = new FormData()

    formData.append('repairRequest', JSON.stringify(request))

    const result = await this.$axios.post<RepairRequest>('/repair_request/status', formData)

    return result.data
  }
}
