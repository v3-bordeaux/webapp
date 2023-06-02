'use client'
import { PropsWithChildren, useState } from 'react'
import { UXContext } from './ux.context'

import type { TUXContext, TUxSettings } from './ux.context'

interface UXProviderProps extends PropsWithChildren {
  defaultValue?: TUxSettings
}

const defaultLocalValue = {
  bottomMenu: false
}

export const UXProvider = ({ defaultValue, children }: UXProviderProps) => {
  const [uxSettings, setUxSettings] = useState<TUxSettings>(defaultValue ?? defaultLocalValue)

  // Valeur fournie par le contexte
  const contextValue = {
    uxSettings,
    setUxSettings
  }

  return <UXContext.Provider value={contextValue}>{children}</UXContext.Provider>
}
