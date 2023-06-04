import { ArrowLeft, Search } from '@v3-bordeaux/akar-icons'
import { Input } from '../atoms'
import { useState } from 'react'

export default function SearchStation() {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <label
      htmlFor="search-station"
      className="relative pointer-events-auto bg-background-2 border-2 border-text-1 rounded-full flex items-center"
    >
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id="search-station"
        className="pl-12 !bg-transparent border-0 w-full"
        placeholder="Rechercher une station"
      />
      {isFocused ? (
        <button className="absolute left-0 top-0 px-3 h-full flex items-center">
          <ArrowLeft className="h-6 w-6 text-text-3" />
        </button>
      ) : (
        <div className="absolute left-0 top-0 px-3 h-full flex items-center">
          <Search className="h-6 w-6 text-text-3" />
        </div>
      )}
    </label>
  )
}
