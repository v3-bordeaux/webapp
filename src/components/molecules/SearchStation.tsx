import { ArrowLeft, Search } from '@v3-bordeaux/akar-icons'
import { Input } from '../atoms'
import { useState } from 'react'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { StationDetails } from './StationDetails'
import { Backdrop } from '../atoms/Backdrop'

export default function SearchStation() {
  const vcubsQuery = useGetVcubsQuery()
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(null)

  const stationsList = vcubsQuery?.data?.lists ?? []

  const stationsMatch = stationsList.filter((station) =>
    station.name.toLowerCase().includes(searchText?.toLowerCase())
  )

  const handleStationClick = (station) => {
    setSearchText(null)
    setIsSearching(false)
  }

  return (
    <section className="absolute container pointer-events-none z-40 pt-4 inset-0 h-full">
      {isSearching && <Backdrop />}
      <section className="flex flex-col h-full">
        <div className="pointer-events-auto relative bg-background-2 border-2 border-text-1 rounded-full flex items-center">
          <Input
            value={searchText || ''}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => setIsSearching(true)}
            className="pl-12 !bg-transparent border-0 w-full"
            placeholder="Rechercher une station"
          />

          {isSearching ? (
            <button
              onClick={() => setIsSearching(false)}
              className="absolute left-0 top-0 px-3 h-full flex items-center"
            >
              <ArrowLeft className="h-6 w-6 text-text-3" />
            </button>
          ) : (
            <div className="pointer-events-none absolute left-0 top-0 px-3 h-full flex items-center">
              <Search className="h-6 w-6 text-text-3" />
            </div>
          )}
        </div>

        {isSearching && (
          <ul className="relative pointer-events-auto flex flex-col gap-2 overflow-scroll pt-6 pb-32">
            {stationsMatch.map((station) => (
              <li
                key={station.id}
                className="p-2 bg-primary-1 border-2 border-text-1 rounded-2xl"
                onClick={() => handleStationClick(station)}
              >
                <StationDetails station={station} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
