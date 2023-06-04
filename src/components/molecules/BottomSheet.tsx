import { createPortal } from 'react-dom'
import { PropsWithChildren } from 'react'
import { ChevronLeft } from 'akar-icons'
import { Cross } from '@v3-bordeaux/akar-icons'

export interface StationDetailsProps extends PropsWithChildren {
  isOpen: boolean
  onClick: () => void
}

export function BottomSheet({ isOpen, onClick, children }: StationDetailsProps) {
  return (
    isOpen &&
    createPortal(
      <section className="z-50 fixed bottom-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-backdrop-2/50"></div>

        <article className="z-50 container py-6 rounded-t-2xl fixed bottom-0 left-0 w-full bg-background-3">
          <button onClick={onClick} className="py-4 -mt-4 flex items-center gap-2">
            <Cross className="h-4 w-4" />
            <span>Fermer</span>
          </button>

          {children}
        </article>
      </section>,
      document.body
    )
  )
}
