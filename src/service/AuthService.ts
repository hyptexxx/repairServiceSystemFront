import { Route } from 'vue-router'
import { LocalStorage } from 'quasar'
import { User } from 'src/models/auth'
import { Vue } from 'vue-property-decorator'

export default class AuthService extends Vue {
  public checkLoggedIn = (to: Route, from: Route, next: (path?: string) => void): void => {
    if (!(LocalStorage.getItem('isLogged') as boolean)) {
      next('/login')
    } else {
      next()
    }
  };

  public checkNotLoggedIn = (to: Route, from: Route, next: (path?: string) => void): void => {
    const user: User = (LocalStorage.getItem('user')) as User
    if (user) {
      if ((LocalStorage.getItem('isLogged') as boolean)) {
        switch (user.roleDescription) {
          case 'USER':
            next('/request')
            break
          case 'ADMIN':
            next('/administration')
            break
        }
        next()
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Недостаточно прав',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        next()
      }
    } else {
      next()
    }
  };

  public defaultRedirect = (to: Route, from: Route, next: (path?: string) => void): void => {
    const user: User = (LocalStorage.getItem('user')) as User
    if (user) {
      if ((LocalStorage.getItem('isLogged') as boolean)) {
        switch (user.roleDescription) {
          case 'USER':
            next('/request')
            break
          case 'ADMIN':
            next('/administration')
            break
        }
        next()
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Недостаточно прав',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        next('/login')
      }
    } else {
      next('/login')
    }
  };

  public checkNotLoggedInAtMain = (to: Route, from: Route, next: (path?: string) => void): void => {
    const user: User = (LocalStorage.getItem('user')) as User
    if (user) {
      if (user.roleDescription === 'USER' && (LocalStorage.getItem('isLogged') as boolean)) {
        next()
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Недостаточно прав',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        next('/login')
      }
    } else {
      next('/login')
    }
  };

  public checkNotLoggedInAtAdmin = (to: Route, from: Route, next: (path?: string) => void): void => {
    const user: User = (LocalStorage.getItem('user')) as User
    if (user) {
      if (user.roleDescription === 'ADMIN' && (LocalStorage.getItem('isLogged') as boolean)) {
        next()
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Недостаточно прав',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        next('/login')
      }
    } else {
      next('/login')
    }
  };
}
