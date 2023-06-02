'use client'
import React from 'react'

import { RootState } from '@/redux/store'
import { useAppSelector } from '@/redux/hooks'

import { H1 } from '@/components/atoms/H1'
import Login from '@/components/organisms/Auth/Login'
import Logout from '@/components/organisms/Auth/Logout'
import { Informations } from '@/components/organisms/Account/Informations'
import { RentInProgress } from '@/components/organisms/Account/RentInProgress'
import { RentCompleted } from '@/components/organisms/Account/RentCompleted'

export default function Home() {
  const token = useAppSelector((state: RootState) => state.cykleoTokenReducer.value)

  return (
    <main className="px-4">
      <H1 className="!my-10 text-center">V3 Bordeaux</H1>
      <div className="flex flex-col gap-4">
        <Informations />
        <RentInProgress />
        <RentCompleted />
        <Logout />
      </div>
    </main>
  )
}
