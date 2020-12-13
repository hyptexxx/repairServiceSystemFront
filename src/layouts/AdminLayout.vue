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
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import APIRequests from 'src/requests/APIRequests'

@Component
export default class AdminLayout extends Mixins(LoginStore, APIRequests) {
  private async logoutEvent (): Promise<void> {
    await this.logout()
  }
}
</script>
