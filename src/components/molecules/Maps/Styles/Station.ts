import { Feature } from 'ol'
import { Circle, Fill, Stroke, Style, Text } from 'ol/style'
import type { Station } from '@/_types/tbm/ws/station'

export type BikesOrPlaces = 'bikes' | 'places'

const themeForBikesOrPlaces = {
  bikes: {
    getNb: (station: Station) => station?.nbBikeAvailable + station?.nbElectricBikeAvailable,
    getBgColor: (nb: number) => {
      if (nb === 0) {
        return '#ffa1a1'
      }
      if (nb < 5) {
        return '#ffd0a1'
      }
      return '#a3c5fe'
    }
  },
  places: {
    getNb: (station: Station) => station?.nbPlaceAvailable,
    getBgColor: (nb: number) => {
      if (nb === 0) {
        return '#ffa1a1'
      }
      if (nb < 5) {
        return '#ffd0a1'
      }
      return '#a3c5fe'
    }
  }
}

export const stationStyle = ({ text, bgColor }: { text: string; bgColor: string }) =>
  new Style({
    text: new Text({
      font: 'bold 12px sans-serif',
      text: text
    }),
    image: new Circle({
      radius: 15,
      fill: new Fill({
        color: bgColor
      }),
      stroke: new Stroke({
        color: '#000'
      })
    })
  })

/**
 * Generator function to return style in function of showBikesOrPlaces
 *  */
export const getClusteredStationStyle =
  (showBikesOrPlaces: BikesOrPlaces) => (feature: Feature) => {
    const theme = themeForBikesOrPlaces[showBikesOrPlaces]

    const features: Array<Feature> | null = feature.get('features')
    let nb = 0

    if (features?.length) {
      const stationsList: Array<Station> = features.map((feature) => feature.get('data')?.station)

      nb = stationsList.reduce((_nb, station) => _nb + theme.getNb(station), 0)
    } else {
      const station: Station = feature.get('data')?.station

      nb = theme.getNb(station)
    }

    return stationStyle({
      text: nb.toString(),
      bgColor: theme.getBgColor(nb)
    })
  }
