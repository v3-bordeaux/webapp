'use client'

import { store } from './store'
import { Provider } from 'react-redux'
import { Initialiser } from '@/redux/Initialiser'

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <Initialiser>{children}</Initialiser>
    </Provider>
  )
}
