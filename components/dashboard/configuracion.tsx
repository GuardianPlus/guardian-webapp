"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Battery, Bluetooth, MapPin } from "lucide-react"

interface UserConfig {
  name: string
  age: string
  emergencyContact: string
  heartRateMin: string
  heartRateMax: string
  temperatureMin: string
  temperatureMax: string
  oxygenationMin: string
}

interface ConfiguracionProps {
  elderlyName: string
  elderlyAge: number
  elderlyContact: string
}

export default function ConfiguracionSection({ elderlyName, elderlyAge, elderlyContact }: ConfiguracionProps) {
  const [config, setConfig] = useState<UserConfig>({
    name: elderlyName,
    age: elderlyAge.toString(),
    emergencyContact: elderlyContact,
    heartRateMin: "60",
    heartRateMax: "100",
    temperatureMin: "36.5",
    temperatureMax: "37.5",
    oxygenationMin: "95",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempConfig, setTempConfig] = useState(config)
  const [saveMessage, setSaveMessage] = useState("")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(tempConfig)
    setIsEditing(false)
    setSaveMessage("Cambios guardados correctamente")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleCancel = () => {
    setTempConfig(config)
    setIsEditing(false)
  }

  const handleInputChange = (key: keyof UserConfig, value: string) => {
    setTempConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Administra el perfil de {elderlyName} y tus preferencias de alertas
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <Card className="p-4 bg-primary/10 border-primary/20">
          <p className="text-sm font-medium text-primary">{saveMessage}</p>
        </Card>
      )}

      {/* User Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Datos del Adulto Mayor</h2>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Editar
            </Button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
              <Input
                type="text"
                value={isEditing ? tempConfig.name : config.name}
                onChange={(e) => isEditing && handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                className="border-border disabled:bg-muted/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Edad</label>
              <Input
                type="number"
                value={isEditing ? tempConfig.age : config.age}
                onChange={(e) => isEditing && handleInputChange("age", e.target.value)}
                disabled={!isEditing}
                className="border-border disabled:bg-muted/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Contacto de Emergencia</label>
              <Input
                type="tel"
                value={isEditing ? tempConfig.emergencyContact : config.emergencyContact}
                onChange={(e) => isEditing && handleInputChange("emergencyContact", e.target.value)}
                disabled={!isEditing}
                className="border-border disabled:bg-muted/50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Guardar Cambios
              </Button>
            </div>
          )}
        </form>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded border-2 border-primary/40 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Dispositivo Conectado</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/50 rounded border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Bluetooth className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Estado de conexión</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Conectado</p>
              <p className="text-xs text-primary">Última conexión: hace 2 min</p>
            </div>
            <div className="p-3 bg-white/50 rounded border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Battery className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Batería del reloj</span>
              </div>
              <p className="text-sm font-semibold text-foreground">78%</p>
              <p className="text-xs text-muted-foreground">Se recomienda cargar en 20%</p>
            </div>
            <div className="p-3 bg-white/50 rounded border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Modelo del reloj</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Guardian Watch Pro</p>
              <p className="text-xs text-muted-foreground">v2.1.0</p>
            </div>
            <div className="p-3 bg-white/50 rounded border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Ubicación actual</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Hogar</p>
              <p className="text-xs text-muted-foreground">Actualizado hace 5 min</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Alert Thresholds */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Umbrales de Alerta</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (isEditing) {
              setConfig(tempConfig)
              setIsEditing(false)
              setSaveMessage("Umbrales actualizados correctamente")
              setTimeout(() => setSaveMessage(""), 3000)
            }
          }}
          className="space-y-6"
        >
          {/* Heart Rate Thresholds */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-foreground mb-4">Frecuencia Cardíaca (ppm)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mínimo</label>
                <Input
                  type="number"
                  value={isEditing ? tempConfig.heartRateMin : config.heartRateMin}
                  onChange={(e) => isEditing && handleInputChange("heartRateMin", e.target.value)}
                  disabled={!isEditing}
                  className="border-border disabled:bg-muted/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Máximo</label>
                <Input
                  type="number"
                  value={isEditing ? tempConfig.heartRateMax : config.heartRateMax}
                  onChange={(e) => isEditing && handleInputChange("heartRateMax", e.target.value)}
                  disabled={!isEditing}
                  className="border-border disabled:bg-muted/50"
                />
              </div>
            </div>
          </div>

          {/* Temperature Thresholds */}
          <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-400/20">
            <h3 className="font-semibold text-foreground mb-4">Temperatura (°C)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mínima</label>
                <Input
                  type="number"
                  step="0.1"
                  value={isEditing ? tempConfig.temperatureMin : config.temperatureMin}
                  onChange={(e) => isEditing && handleInputChange("temperatureMin", e.target.value)}
                  disabled={!isEditing}
                  className="border-border disabled:bg-muted/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Máxima</label>
                <Input
                  type="number"
                  step="0.1"
                  value={isEditing ? tempConfig.temperatureMax : config.temperatureMax}
                  onChange={(e) => isEditing && handleInputChange("temperatureMax", e.target.value)}
                  disabled={!isEditing}
                  className="border-border disabled:bg-muted/50"
                />
              </div>
            </div>
          </div>

          {/* Oxygenation Threshold */}
          <div className="p-4 bg-chart-2/5 rounded-lg border border-chart-2/20">
            <h3 className="font-semibold text-foreground mb-4">Oxigenación Mínima (%)</h3>
            <Input
              type="number"
              value={isEditing ? tempConfig.oxygenationMin : config.oxygenationMin}
              onChange={(e) => isEditing && handleInputChange("oxygenationMin", e.target.value)}
              disabled={!isEditing}
              className="border-border disabled:bg-muted/50"
            />
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Guardar Umbrales
              </Button>
            </div>
          )}
        </form>

        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="w-full mt-4 border-primary text-primary hover:bg-primary/10"
          >
            Modificar Umbrales
          </Button>
        )}
      </Card>
    </div>
  )
}
