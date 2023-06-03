import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { useGetStationQuery } from '@/redux/services/cykleoApi'
import { Bicycle } from '@v3-bordeaux/akar-icons'

import type { Rent } from '@/_types/cykleo/rent'
import type { Station } from '@/_types/tbm/ws/station'
import { H2 } from '../atoms'
import Link from 'next/link'

const freeTimeInMinutes = 30

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
  const durationInMinutes = nowDateParsed.diff(beginDateParsed, 'm')
  const timeLeftInMinutes = freeTimeInMinutes - durationInMinutes
  const isFreeTimeSpent = timeLeftInMinutes <= 0
  const paidTime = -timeLeftInMinutes

  return (
    <>
      <article className="flex flex-col">
        <span>Mon vélo</span>
        <div className="flex space-between items-end gap-4">
          <Bicycle strokeWidth="2" className="w-14 h-14" />
          <div className="flex flex-col">
            {isFreeTimeSpent ? (
              <>
                <hgroup className="flex items-end gap-1">
                  <H2 className="font-bold">{paidTime}</H2>
                  <span>min</span>
                </hgroup>
                <span>Temps payant</span>
              </>
            ) : (
              <>
                <span>{timeLeftInMinutes} minute(s)</span>
                <span>Temps gratuit</span>
              </>
            )}
          </div>
        </div>
        <Link href="/rents/in-progress" className="after:absolute after:inset-0">
          <span className="hidden">Voir le détail de la location en cours</span>
        </Link>
      </article>
      <article className="hidden absolute bottom-0 left-0 right-0 w-full h-44">
        <span>Durée: {durationInMinutes} minute(s)</span>
        <span>
          Du {beginDateParsed.format('DD/MM/YYYY à HH[h]mm')} au{' '}
          {nowDateParsed.format('DD/MM/YYYY à HH[h]mm')}
        </span>
        <span>Parti de {stationStart?.name}</span>
      </article>
    </>
  )
}
