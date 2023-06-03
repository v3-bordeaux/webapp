import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'

import type { Rent } from '@/_types/cykleo/rent'
import type { Station } from '@/_types/tbm/ws/station'
import { H2 } from '../atoms'
import RentInProgressMap from './Maps/RentInProgressMap'
import { Alarm, Money } from '@v3-bordeaux/akar-icons'

const freeTimeInMinutes = 30

interface RentInProgressResumeProps {
  rent: Rent
}

export default function RentInProgressResume({ rent }: RentInProgressResumeProps) {
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
  const durationInMinutes = nowDateParsed.diff(beginDateParsed, 'm')
  const timeLeftInMinutes = freeTimeInMinutes - durationInMinutes
  const isFreeTimeSpent = timeLeftInMinutes <= 0
  const paidTime = -timeLeftInMinutes

  return (
    <section className="flex flex-col gap-2">
      <H2>Mon trajet</H2>

      {stationStart && (
        <article className="rounded-2xl border-2 border-text-1 overflow-hidden">
          <RentInProgressMap stationStart={stationStart} />
        </article>
      )}

      <div className="grid grid-cols-4 gap-x-4">
        <article className="col-span-3 flex items-center gap-2 text-sm md:text-md rounded-2xl border-2 border-text-1 bg-primary-1 px-4 py-2">
          <Alarm />
        </article>

        <button className="col-span-1 flex flex-col items-center gap-2 text-sm md:text-md rounded-2xl border-2 border-text-1 bg-cta-1 px-4 py-2">
          <Money />
          <span>Tarifs</span>
        </button>
      </div>
    </section>
  )
}
