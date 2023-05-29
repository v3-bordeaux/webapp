import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'
import RentInProgressMap from '@/components/molecules/Maps/RentInProgressMap'

import type { Rent } from '@/_types/cykleo/rent'
import type { Station } from '@/_types/tbm/ws/station'

export default function RentInProgressCard({ rent }: { rent: Rent }) {
  const [stationStart, setStationStart]: [Station, Function] = useState(null)

  const vcubsQuery = useGetVcubsQuery()
  const stationStartQuery = useGetStationQuery({
    stationId: rent.stationStart
  })

  useEffect(() => {
    if (!vcubsQuery.data || !stationStartQuery.data) {
      return
    }

    let stationName = stationStartQuery.data.assetStation.commercialName.toLowerCase()
    let stationFound = vcubsQuery.data.lists.find((station) => {
      return station.name.toLowerCase() === stationName
    })

    if (stationFound) {
      setStationStart(stationFound)
    }
  }, [vcubsQuery, stationStartQuery])

  const beginDateParsed = dayjs(rent.beginDate)
  const nowDateParsed = dayjs()
  const duration = nowDateParsed.diff(beginDateParsed, 'm')
  return (
    <article className="bg-slate-200 rounded-xl p-3 flex flex-col">
      {stationStart && (
        <RentInProgressMap stationStart={stationStart} stations={vcubsQuery.data.lists} />
      )}
      <span>Durée: {duration} minute(s)</span>
      <span>
        Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au{' '}
        {nowDateParsed.format('DD/MM/YYYY à HH[h]mm')}
      </span>
      <span>Parti de {stationStart?.name}</span>
    </article>
  )
}