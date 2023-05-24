import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'
import RentCompletedMap from '@/components/molecules/Maps/RentCompletedMap'

import type { Rent } from '@/_types/cykleo/rent'
import type { Station } from '@/_types/tbm/ws/station'

export default function RentCompletedCard({ rent }: { rent: Rent }) {
  const [stationStart, setStationStart]: [Station, Function] = useState(null)
  const [stationEnd, setStationEnd]: [Station, Function] = useState(null)

  const vcubsQuery = useGetVcubsQuery()
  const stationStartQuery = useGetStationQuery({
    stationId: rent.stationStart
  })
  const stationEndQuery = useGetStationQuery({
    stationId: rent.stationEnd
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

  useEffect(() => {
    if (!vcubsQuery.data || !stationEndQuery.data) {
      return
    }

    let stationName = stationEndQuery.data.assetStation.commercialName.toLowerCase()
    let stationFound = vcubsQuery.data.lists.find((station) => {
      return station.name.toLowerCase() === stationName
    })

    if (stationFound) {
      setStationEnd(stationFound)
    }
  }, [vcubsQuery, stationEndQuery])

  const beginDateParsed = dayjs(rent.beginDate)
  const endDateParsed = dayjs(rent.endDate)
  const duration = endDateParsed.diff(beginDateParsed, 'm')
  return (
    <article className="bg-slate-200 rounded-xl p-3 flex flex-col">
      {stationStart && stationEnd && (
        <RentCompletedMap stationStart={stationStart} stationEnd={stationEnd} />
      )}
      <span>Durée: {duration} minute(s)</span>
      <span>
        Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au{' '}
        {endDateParsed.format('DD/MM/YYYY à HH[h]mm')}
      </span>
      <span>
        De {stationStart?.name} à {stationEnd?.name}
      </span>
    </article>
  )
}
