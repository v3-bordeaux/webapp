import React from 'react'
import useUxSettings from '@/hooks/useUxSettings'

export function BottomMenu() {
  const { uxSettings, setUxSettings } = useUxSettings()

  console.log(uxSettings.bottomMenu)
  //
  return (
    <div className="absolute z-30 top-0 left-0 bg-red-700">BottomMenu {uxSettings.bottomMenu}</div>
  )
}
