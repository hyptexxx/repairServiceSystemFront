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
      .row.items-start.q-gutter-md
        q-card.col(flat='' bordered='')
          q-item
            q-item-section
              q-item-label У вас обнаружены проблемы?
              q-item-label(caption='')
                | Оставьте краткую заявку, оператор свяжется с вами для обсуждения вариантов решения вашей проблемы.
          q-separator
          q-responsive(:ratio='16/7')
            // notice "border-radius-inherit" below; it's important when in a QCard
            q-card-section.border-radius-inherit.flex.flex-center.bg-grey-1
              q-card.my-card.bg-white.text-black(style="width: 100%")
                q-card-section
                  .text-h6 Ваша заявка на обслуживание
                  .text-subtitle2 заполните поля
                q-separator(dark='')
                q-input(color='black' bg-color='white' filled='' v-model='user.login' label='Ваше имя')
                  template(v-slot:prepend='')
                    q-icon(name='event')
                q-input(color='black' bg-color='white' filled='' v-model='requestDescription' label='Введите описание проблемы')
                  template(v-slot:prepend='')
                    q-icon(name='event')
                q-card-actions
                  q-btn.bg-green.text-white(@click="sendRepairRequest") Отправить
        q-card.col(flat='' bordered='')
          q-item
            q-item-section
              q-item-label Наше доступное оборудование и ПО
              q-item-label(caption='')
                | В наличии
          q-separator
          q-responsive(:ratio='1')
            // notice "border-radius-inherit" below; it's important when in a QCard
            q-card-section.border-radius-inherit.flex.flex-center.bg-grey-1
              q-card.my-card.bg-white.text-black(v-for="n in 10" style="width: 100%")
                q-card-section
                  .text-h6 Пример оборудования
                  .text-subtitle2 Пример описания оборудования

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import { User } from 'src/models/auth'
import { RepairRequest } from 'src/models/models'
import APIRequests from 'src/requests/APIRequests'

@Component
export default class MainLayout extends Mixins(LoginStore, APIRequests) {
  private requestDescription = ''

  private repairRequestModel!: RepairRequest

  private user: User | null = {
    login: 'test',
    roleDescription: 'hr',
    id: 12345
  }

  private async logoutEvent (): Promise<void> {
    await this.logout()
  }

  private mounted (): void {
    this.user = this.$q.localStorage.getItem('user') as User
  }

  private async sendRepairRequest (): Promise<void> {
    const formData = new FormData()
    if (this.user) {
      this.repairRequestModel = {
        id: 0,
        userId: this.user.id,
        userLogin: this.user.login,
        description: this.requestDescription,
        date: new Date().getTime(),
        statusId: 1,
        statusDescription: ''
      }
    }

    formData.append('repairRequest', JSON.stringify(this.repairRequestModel))
    const result = await this.$axios.post<RepairRequest>('/repair_request', formData)
    if (result.status === 200) {
      this.$q.notify({
        type: 'positive',
        message: 'Заявка отправлена на рассмотрение, с вами свяжется оператор.',
        icon: 'report_problem',
        position: 'bottom'
      })
    } else {
      this.$q.notify({
        type: 'negative',
        message: 'Произошла ошибка',
        icon: 'report_problem',
        position: 'bottom'
      })
    }
  }
}
</script>
