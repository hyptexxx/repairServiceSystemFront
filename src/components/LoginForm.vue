<template lang="pug">
  q-page.flex.flex-center.bg-black(style="width: 100%")
    div.q-pa-md.row.justify-center
      q-card.bg-grey-10.my-card.q-dark(bordered)
        q-card-section
          div.text-h6 Вход
        q-separator(dark)
        q-card-section(style="width: 300px; height: 170px")
          q-input(label="Логин", dark, v-model="login" name="login" @keydown.enter="authorizeUser")
          span(v-if="!$v.login.required && $v.login.$params.required" class="error-label") Обязательно
          q-input(label="Пароль", dark, type="password" name="password", v-model="password" @keydown.enter="authorizeUser")
          span(v-if="!$v.password.required && $v.password.$params.required" class="error-label") Обязательно
        div.row.justify-end
          q-btn.q-mr-md.q-mb-md(label="Войти" @click="authorizeUser")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { AuthResponse } from 'src/models/models'
import { validationMixin } from 'vuelidate'
import LoginValidation from 'src/validations/LoginValidation'
import LoginStore from 'src/store/LoginStore'
import { User } from 'src/models/auth'

@Component({
  mixins: [validationMixin],
  validations: LoginValidation
})
export default class LoginForm extends Mixins(LoginStore) {
  private login = ''
  private password = ''
  private user: User | null = {
    login: 'test',
    roleDescription: 'hr',
    id: 12
  }

  private async authorizeUser (): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$anyError) {
      const formData = new FormData()
      formData.append('login', this.login)
      formData.append('password', this.password)
      const result = await this.$axios.post<AuthResponse>('/auth', formData)

      switch (result.status) {
        case 200:

          this.$q.localStorage.set('isLogged', true)
          this.$q.localStorage.set('user', result.data)

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          this.setLoginned(true)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          this.setResponseUser(result.data as unknown as User)
          await this.$router.push({ name: 'main' })
          break
      }
    } else {
      this.$q.notify({
        color: 'negative',
        message: 'Поля не заполнены',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    }
  }
}
</script>
