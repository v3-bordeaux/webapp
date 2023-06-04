import { ArrowLeft, Search } from '@v3-bordeaux/akar-icons'
import { Input } from '../atoms'
import { useState } from 'react'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'

export default function SearchStation() {
  const vcubsQuery = useGetVcubsQuery()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(null)

  const stationsList = vcubsQuery?.data?.lists ?? []

  const stationsMatch = stationsList.filter((station) =>
    station.name.toLowerCase().includes(searchText?.toLowerCase())
  )

  return (
    <section className="pointer-events-auto flex flex-col gap-6">
      <div className="relative bg-background-2 border-2 border-text-1 rounded-full flex items-center">
        <Input
          value={searchText || ''}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={() => setIsFocused(true)}
          className="pl-12 !bg-transparent border-0 w-full"
          placeholder="Rechercher une station"
        />

        {isFocused ? (
          <button
            onClick={() => setIsFocused(false)}
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

      {isFocused && (
        <ul>
          {stationsMatch.map((station) => (
            <li key={station.id}>{station.name}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
