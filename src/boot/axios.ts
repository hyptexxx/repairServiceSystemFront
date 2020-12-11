import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { boot } from 'quasar/wrappers'
import { AuthResponse } from 'src/models/models'
import { Notify, LocalStorage } from 'quasar'

const config: AxiosRequestConfig = {
  baseURL: process.env.API_BASE_URL
}

const instance = axios.create(config)

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue, router }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios
  instance.interceptors.response.use(response => response, async (error: { response: AxiosResponse<AuthResponse>}) => {
    const response: AxiosResponse<AuthResponse> = error.response
    if (response) {
      if (response.status === 401 || response.status === 403) {
        Notify.create({
          color: 'negative',
          progress: true,
          caption: 'Пожалуйста, авторизируйтесь',
          message: 'Авторизация',
          icon: 'report_problem',
          position: 'bottom'
        })
        LocalStorage.remove('isLogged')
        router.push({ name: 'login' }).then(
          () => { return null },
          () => { return null }
        )
      }
      if (response.status === 404) {
        Notify.create({
          color: 'negative',
          progress: true,
          caption: 'Ничего не найдено',
          message: 'По запросу ничего не найдено',
          icon: 'report_problem',
          position: 'bottom'
        })
      }
      if (response.status === 500) {
        Notify.create({
          color: 'negative',
          progress: true,
          caption: 'Произошла внутренняя ошибка сервера',
          message: 'Внутренняя ошибка',
          icon: 'report_problem',
          position: 'bottom'
        })
      }
      if (response.data.reason && response.data.reason) {
        Notify.create({
          color: 'negative',
          progress: true,
          caption: response.data.reason,
          message: response.data.status,
          icon: 'report_problem',
          position: 'bottom'
        })
      }
      return response
    }
    return Promise.reject(error)
  })

  const vue = Vue as {prototype: {$axios: AxiosInstance}}
  vue.prototype.$axios = instance
})
