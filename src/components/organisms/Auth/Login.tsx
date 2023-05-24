'use client'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setToken } from '@/redux/features/cykleoTokenSlice'
import { useLoginMutation } from '@/redux/services/cykleoApi'

import { Input, Button, Card } from '@/components/atoms'

export default function Login() {
  const [username, setUsername] = useState(process.env.NEXT_PUBLIC_CYKLEO_USERNAME || null)
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_CYKLEO_PASSWORD || null)
  const [login, loginResponse] = useLoginMutation()

  const dispatch = useAppDispatch()

  const wrongAuth = loginResponse.isError && loginResponse.error.data.error === 'Unauthorized'

  async function sendLogin() {
    login({
      password,
      username
    })
  }

  useEffect(() => {
    if (loginResponse.status === 'fulfilled') {
      dispatch(setToken(loginResponse.data.access_token))
    }
  }, [loginResponse])

  return (
    <Card>
      <form className="flex flex-col">
        {wrongAuth && (
          <p className="mb-6 rounded-md py-3 px-4 bg-red-200 text-red-900">
            Email ou mot de passe incorrect
          </p>
        )}
        <label htmlFor="email">E-mail</label>
        <Input
          className="mt-2"
          autoFocus
          type="text"
          id="email"
          name="email"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-6" htmlFor="password">
          Mot de passe
        </label>
        <Input
          className="mt-2"
          type="password"
          id="password"
          name="password"
          required
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="mt-6" onClick={sendLogin}>
          Se connecter
        </Button>
      </form>
    </Card>
  )
}
