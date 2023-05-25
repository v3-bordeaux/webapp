export interface VcubResponse {
  lists: Station[]
  predict: Predict
}

export interface Station {
  id: number
  name: string
  address: string
  insee: string
  latitude: string
  longitude: string
  connexionState: string
  nbPlaceAvailable: number
  nbBikeAvailable: number
  nbElectricBikeAvailable: number
  typeVlsPlus: string
  updatedAt: string
  city?: string
}

export interface Predict {
  prediction_time: string
  predictions: Predictions
  status: PredictStatus
}

export interface Predictions {
  data: Prediction[]
}

export interface Prediction {
  sid: number
  status: string
  bikes: any
  trend_at_tau: number
  trend: number
  prediction_confidence: string
  tau: number
  predicted_time: string
  free_slots: any
}

export interface PredictStatus {
  code: string
  message: string
}
