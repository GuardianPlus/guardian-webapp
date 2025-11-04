"use client"

import { MapPin, Phone, AlertCircle } from "lucide-react"

export default function MapaSection() {
  const location = {
    name: "Casa",
    address: "Av. Primavera 1540",
    latitude: 40.4168,
    longitude: -3.7038,
    lastUpdate: "Hace 2 minutos",
    accuracy: "±8 metros",
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Ubicación de Juan Pérez</h1>
        <p className="text-sm text-muted-foreground">Monitoreo de ubicación en tiempo real</p>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-border">
        {/* Simulated Map */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Location marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <div
                className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"
                style={{ width: "60px", height: "60px" }}
              ></div>
              <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <MapPin size={24} className="text-white" />
              </div>
            </div>
          </div>

          {/* Coordinates display */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-xs font-mono text-muted-foreground">
            <div>{location.latitude.toFixed(4)}°</div>
            <div>{location.longitude.toFixed(4)}°</div>
          </div>
        </div>

        {/* Location Info Card */}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <MapPin size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{location.name}</p>
              <p className="text-sm text-muted-foreground">{location.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="text-xs">📡</div>
            <span>Precisión: {location.accuracy}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="text-xs">🕐</div>
            <span>Actualización: {location.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Phone size={18} />
          <span>Llamar</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
          <AlertCircle size={18} />
          <span>Alerta</span>
        </button>
      </div>
    </div>
  )
}
