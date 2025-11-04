"use client"

import { useState } from "react"
import LoginPage from "@/components/auth/login-page"
import Dashboard from "@/components/dashboard/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<{ email: string; name: string } | null>(null)

  const handleLogin = (email: string, name: string) => {
    setUserData({ email, name })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
  }

  return (
    <main className="w-full min-h-screen">
      {!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Dashboard user={userData!} onLogout={handleLogout} />}
    </main>
  )
}
