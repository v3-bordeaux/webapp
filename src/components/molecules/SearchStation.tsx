import { ArrowLeft, Search } from '@v3-bordeaux/akar-icons'
import { Input } from '@/components/atoms'
import { useContext, useState } from 'react'
import { useGetVcubsQuery } from '@/redux/services/tbmWSApi'
import { StationDetails } from '@/components/molecules/StationDetails'
import { Backdrop } from '@/components/atoms/Backdrop'
import MapContext, { MapContextContent } from '@/components/molecules/Maps/Map/MapContext'
import { fromLonLat } from 'ol/proj'
import { Station } from '@/_types/tbm/ws/station'

export default function SearchStation() {
  const { map } = useContext<MapContextContent>(MapContext)
  const vcubsQuery = useGetVcubsQuery()
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(null)

  const stationsList = vcubsQuery?.data?.lists ?? []

  const stationsMatch =
    searchText === ''
      ? []
      : stationsList
          .filter((station) => station.name.toLowerCase().includes(searchText?.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))

  const closeSearch = () => {
    setSearchText(null)
    setIsSearching(false)
  }
  const handleStationClick = (station: Station) => {
    closeSearch()

    const stationCoords = fromLonLat([parseFloat(station.longitude), parseFloat(station.latitude)])

    if (map) {
      map.getView().setCenter(stationCoords)
      map.getView().setZoom(17)
    }
  }

  return (
    <section className="absolute container pointer-events-none z-40 pt-4 inset-0 h-full">
      {isSearching && <Backdrop onClick={() => setIsSearching(false)} />}

      <section className="flex flex-col h-full">
        <div className="pointer-events-auto relative bg-background-2 border-2 border-text-1 rounded-full flex items-center">
          {isSearching ? (
            <button
              onClick={() => setIsSearching(false)}
              className="absolute left-0 top-0 px-3 h-full flex items-center"
              aria-label="Fermer la recherche"
            >
              <ArrowLeft className="h-6 w-6 text-text-3" />
            </button>
          ) : (
            <div className="pointer-events-none absolute left-0 top-0 px-3 h-full flex items-center">
              <Search className="h-6 w-6 text-text-3" />
            </div>
          )}

          <Input
            value={searchText || ''}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsSearching(true)}
            className="pl-12 !bg-transparent !border-0 w-full"
            placeholder="Rechercher une station"
          />
        </div>

        {isSearching && (
          <ul className="relative flex flex-col gap-2 overflow-scroll pt-6 pb-32">
            {stationsMatch.map((station) => (
              <li key={station.id}>
                <button
                  className="pointer-events-auto p-2 bg-primary-1 border-2 border-text-1 rounded-2xl w-full"
                  onClick={() => handleStationClick(station)}
                >
                  <StationDetails station={station} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
