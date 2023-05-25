export interface RentResponse {
  content: Rent[]
  totalPages: number
  totalElements: number
  last: boolean
  number: number
  sort: Sort[]
  size: number
  numberOfElements: number
  first: boolean
}

export interface Rent {
  id: number
  beginDate: string
  endDate: string
  duration: number
  status: string
  calculatedDistance: number
  straightLineDistance: number
  organization: number
  stationStart: number
  stationEnd: number
  subscription: number
  bike: number
  creationDate: string
  referenceDate: string
  exportDate: string
  type: string
  amount: number
  previousBalance: number
  newBalance: number
  paid: boolean
  customer: number
  cardNumber: string
}

export interface Sort {
  direction: string
  property: string
  ignoreCase: boolean
  nullHandling: string
  descending: boolean
  ascending: boolean
}
