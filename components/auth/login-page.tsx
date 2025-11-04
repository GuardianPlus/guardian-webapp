"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import BluetoothConnectModal from "@/components/auth/bluetooth-modal"

interface LoginPageProps {
  onLogin: (email: string, name: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [showBluetoothModal, setShowBluetoothModal] = useState(false)
  const [tempEmail, setTempEmail] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setTempEmail(email)
      setShowBluetoothModal(true)
    }
  }

  const handleBluetoothConnect = () => {
    const displayName = isRegister ? name : email.split("@")[0]
    onLogin(tempEmail, displayName)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && name) {
      setTempEmail(email)
      setShowBluetoothModal(true)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <div className="p-8 space-y-6">
          {/* Logo y Título */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                +
              </div>
              <h1 className="text-2xl font-bold text-foreground">Guardian+</h1>
            </div>
            <p className="text-sm text-muted-foreground">Monitoreo de salud para adultos mayores</p>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre completo</label>
                <Input
                  type="text"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-border"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Correo electrónico</label>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isRegister ? "Registrarse" : "Iniciar sesión"}
            </Button>
          </form>

          {/* Toggle Register/Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setEmail("")
                setPassword("")
                setName("")
              }}
              className="text-sm text-primary hover:underline"
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>
        </div>
      </Card>

      {/* Bluetooth Connection Modal */}
      <BluetoothConnectModal
        isOpen={showBluetoothModal}
        onConnect={handleBluetoothConnect}
        onCancel={() => setShowBluetoothModal(false)}
      />
    </div>
  )
}
