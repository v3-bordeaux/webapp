'use client'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadFromLocalStorage } from '@/redux/features/cykleoTokenSlice'

export function Initialiser({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [])

  return <>{children}</>
}
