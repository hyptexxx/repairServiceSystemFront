export interface AuthResponse {
  reason: string
  status: string
}

export interface RepairRequest {
  id: number
  userId: number
  userLogin: string
  description: string
  date: number
  statusId: number | null
  statusDescription: string | null
}

export interface Status {
  id: number | null
  description: string | null
}

export interface FullRequest {
  id: number
  userId: number
  userLogin: string
  description: string
  date: number
  status: Status
  statuses: Status[]
}
