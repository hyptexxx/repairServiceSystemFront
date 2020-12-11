import { User } from 'src/models/auth'

export default interface LoginStoreInterface{
  loginned: boolean
  user: User | null
}
