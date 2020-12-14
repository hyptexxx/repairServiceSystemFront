<template lang="pug">
  q-layout(view='hHh lpR fFf')
    q-header.bg-primary.text-white(elevated='')
      q-toolbar
        q-toolbar-title
          q-avatar
          |           Сервис ремонта и технического обслуживания
        div.row.q-ml-auto
          q-btn(outline label="Выход" @click="logoutEvent")
    q-page-container
      q-card.my-card(flat='' bordered='')
        q-card-section
          .text-h6 Текущие заявки.
        q-card-section.q-pt-none
          | Текущие заявки на обслуживание.
          | Выберите статус любой из заявок, если необходимо изменить его.
        q-separator(inset='')
        q-card-section
          q-banner.bg-grey-3.text-black(rounded='' style="width: 100%; margin-bottom: 40px" v-for="currRequest in fullRequests")
            | {{currRequest.description}}
            | {{currRequest.userLogin}}
            | {{currRequest.date}}
            q-select(
              filled=''
              v-model='currRequest.status'
              :options='currRequest.statuses'
              label='Текущий статус заявки'
              option-label="description"
              style="width: 200px"
              @input="onStatusChange"
              @popup-show="prepareSend(currRequest)"
            )
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import APIRequests from 'src/requests/APIRequests'
import { FullRequest, RepairRequest, Status } from 'src/models/models'

@Component
export default class AdminLayout extends Mixins(LoginStore, APIRequests) {
  private request: RepairRequest = {
    id: 0,
    userId: 0,
    userLogin: 'string',
    description: 'string',
    date: 0,
    statusId: 0,
    statusDescription: 'string'
  }

  private statuses: Status[] = [{
    description: '',
    id: 0
  }]

  private requests: RepairRequest[] = [{
    id: 0,
    userId: 0,
    userLogin: 'string',
    description: 'string',
    date: 0,
    statusId: 0,
    statusDescription: 'string'
  }]

  private fullRequests: FullRequest[] = []

  private async logoutEvent (): Promise<void> {
    await this.logout()
  }

  private prepareSend<T extends FullRequest> (request: T): void {
    this.request = {
      id: request.id,
      userId: request.userId,
      userLogin: request.userLogin,
      description: request.description,
      date: request.date,
      statusId: null,
      statusDescription: null
    }
  }

  private async onStatusChange (newRequest: Status): Promise<void> {
    this.request = {
      id: this.request.id,
      userId: this.request.userId,
      userLogin: this.request.userLogin,
      description: this.request.description,
      date: this.request.date,
      statusId: newRequest.id,
      statusDescription: newRequest.description
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const result: RepairRequest = await this.setNewStatus(this.request)
    if (result) {
      this.$q.notify({
        type: 'positive',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: `Статус изменён. Новое значение: ${newRequest.description}`,
        icon: 'report_problem',
        position: 'bottom'
      })
    }
  }

  private async mounted (): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    this.requests = await this.getAllRequests()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    this.statuses = await this.getAllStatuses()

    if (this.requests.length && this.statuses.length) {
      this.fullRequests.splice(0, this.fullRequests.length)

      this.requests.forEach(value => {
        this.fullRequests.push({
          id: value.id,
          userId: value.userId,
          userLogin: value.userLogin,
          description: value.description,
          date: value.date,
          status: {
            description: value.statusDescription,
            id: value.statusId
          },
          statuses: this.statuses
        })
      })
    }
  }
}
</script>
