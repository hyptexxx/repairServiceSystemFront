export interface AuthResponse {
  reason: string
  status: string
}

export interface RepairRequest{
  id: number
  userId: number
  userLogin: string
  description: string
  date: number
  statusId: number
  statusDescription: string
}
