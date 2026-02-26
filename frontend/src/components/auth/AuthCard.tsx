import { useState } from 'react'

type Props = {
  onLogin: (email: string, password: string) => void
  onRegister: (name: string, email: string, password: string) => void
}

export const AuthCard = ({ onLogin, onRegister }: Props) => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      onLogin(email, password)
    } else {
      onRegister(name, email, password)
    }
  }

  return (
    <div className="mt-6 max-w-sm rounded border border-gray-200 bg-white p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`rounded px-3 py-1 text-sm ${isLogin ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`rounded px-3 py-1 text-sm ${!isLogin ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <button type="submit" className="w-full rounded bg-gray-900 px-3 py-2 text-sm text-white">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}
