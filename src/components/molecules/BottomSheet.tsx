import { createPortal } from 'react-dom'
import { PropsWithChildren } from 'react'

export interface StationDetailsProps extends PropsWithChildren {
  isOpen: boolean
}

export function BottomSheet({ isOpen, children }: StationDetailsProps) {
  return (
    isOpen &&
    createPortal(
      <section className="z-50 fixed bottom-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-backdrop-2/50"></div>

        <article className="z-50 container py-6 rounded-t-2xl fixed bottom-0 left-0 w-full bg-background-3">
          {children}
        </article>
      </section>,
      document.body
    )
  )
}
