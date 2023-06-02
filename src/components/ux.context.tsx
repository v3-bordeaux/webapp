'use client'
import { createContext } from 'react'

export type TUxSettings = {
  bottomMenu: boolean
}

export interface TUXContext {
  uxSettings: TUxSettings
  setUxSettings(uxSettings: TUxSettings): void
}

export const UXContext = createContext<TUXContext>(null)
