export interface SubscriptionsRequest {
  content: Subscription[]
  totalPages: number
  totalElements: number
  last: boolean
  number: number
  size: number
  numberOfElements: number
  first: boolean
}

export interface Subscription {
  id: number
  version: number
  beginDate: string
  endDate: string
  status: string
  subscriptionPaymentMethod: string
  guaranteePaymentMean: number
  balance: number
  salesChannel: string
  automaticSubscriptionRenewal: boolean
  subscriptionRenewalDone: boolean
  cardRequestInProgress: boolean
  prePayment: boolean
  lastTravelEventDate: string
  customer: number
  card: number
  service: number
  rate: number
  eVls: boolean
}
