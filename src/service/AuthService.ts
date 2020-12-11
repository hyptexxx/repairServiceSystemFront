import { Route } from 'vue-router'
import { LocalStorage } from 'quasar'

export default class AuthService {
  public checkLoggedIn = (to: Route, from: Route, next: (path?: string) => void): void => {
    if (!(LocalStorage.getItem('isLogged') as boolean)) {
      next('/login')
    } else {
      next()
    }
  };

  public checkNotLoggedIn = (to: Route, from: Route, next: (path?: string) => void): void => {
    if ((LocalStorage.getItem('isLogged') as boolean)) {
      next('/')
    } else {
      next()
    }
  };
}
