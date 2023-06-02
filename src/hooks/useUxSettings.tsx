import React, { useContext } from 'react'
import { UXContext } from '@/components/ux.context'

// Fonction de vérification de la présence du contexte
const useUxSettings = () => {
  const ctx = useContext(UXContext)

  if (!ctx) {
    throw new Error(`missing UxProvider in the app layout`)
  }

  return ctx
}

export default useUxSettings
