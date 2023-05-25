export interface StationsResponse {
  places: Station[]
}

export interface Station {
  cat: string
  cat_id: string
  code: string
  name: string
  label: string
  id: string
  coord: Coord
  address: string
  cp: string
  city?: string
  stand: Stand
  value?: number
  divIcon: boolean
  color: string
}

export interface Coord {
  lat: string
  lon: string
}

export interface Stand {
  available_bikes: number
  available_electric_bikes: number
  available_total_bikes?: number
  available_places: number
}
