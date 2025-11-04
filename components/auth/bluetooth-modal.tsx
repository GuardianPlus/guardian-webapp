"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BluetoothModalProps {
  isOpen: boolean
  onConnect: () => void
  onCancel: () => void
}

export default function BluetoothConnectModal({ isOpen, onConnect, onCancel }: BluetoothModalProps) {
  const [isSearching, setIsSearching] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm shadow-2xl">
        <div className="p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold text-foreground">Conectar dispositivo</h2>

          {isSearching ? (
            <>
              <div className="py-6">
                <div className="flex justify-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                    <div
                      className="absolute inset-2 bg-primary/40 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div className="absolute inset-4 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">Buscando dispositivo Bluetooth...</p>
              <p className="text-xs text-muted-foreground">
                Asegúrese de que su pulsera Guardian+ Watch esté encendida.
              </p>
            </>
          ) : (
            <>
              <div className="py-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-foreground font-medium">Dispositivo encontrado</p>
              <p className="text-sm text-muted-foreground">Guardian+ Watch está listo para conectar</p>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={onConnect}
              disabled={isSearching}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Conectar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
