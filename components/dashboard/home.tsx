"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VitalSignCard from "@/components/dashboard/vital-sign-card"
import { Battery, AlertTriangle, AlertCircle } from "lucide-react"

interface HomeDashboardProps {
  userName: string
  elderlyName: string
}

interface VitalSigns {
  heartRate: number
  bloodPressure: string
  temperature: number
  oxygenation: number
  respiratoryRate: number
  sleepQuality: number
  deviceBattery: number
}

interface Alert {
  id: string
  message: string
  time: string
  severity: "critical" | "warning" | "low"
}

interface Medicine {
  id: string
  name: string
  time: string
  status: "pending" | "confirmed" | "taken"
}

export default function DashboardHome({ userName, elderlyName }: HomeDashboardProps) {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 36.8,
    oxygenation: 98,
    respiratoryRate: 16,
    sleepQuality: 85,
    deviceBattery: 78,
  })

  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      message: "Frecuencia cardíaca ligeramente elevada",
      time: "10:45 a.m.",
      severity: "warning",
    },
    {
      id: "2",
      message: "Batería del reloj baja (bajo 20%)",
      time: "09:15 a.m.",
      severity: "warning",
    },
    {
      id: "3",
      message: "Recuerde confirmar medicamento tomado",
      time: "08:00 a.m.",
      severity: "low",
    },
  ])

  const [medicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Ibuprofeno 400mg",
      time: "14:00 h",
      status: "pending",
    },
    {
      id: "2",
      name: "Losartán 50mg",
      time: "20:00 h",
      status: "pending",
    },
    {
      id: "3",
      name: "Metformina 500mg",
      time: "08:00 h",
      status: "taken",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setVitalSigns((prev) => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        temperature: Math.max(36.5, Math.min(37.5, prev.temperature + (Math.random() - 0.5) * 0.2)),
        oxygenation: Math.max(95, Math.min(100, prev.oxygenation + (Math.random() - 0.5) * 1)),
        respiratoryRate: Math.max(12, Math.min(20, prev.respiratoryRate + (Math.random() - 0.5) * 2)),
        sleepQuality: Math.max(50, Math.min(100, prev.sleepQuality + (Math.random() - 0.5) * 5)),
        deviceBattery: Math.max(0, prev.deviceBattery - 0.1 + (Math.random() - 0.5) * 0.2),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const [confirmedMedicines, setConfirmedMedicines] = useState(
    medicines.map((m) => m.id).filter((id) => medicines.find((m) => m.id === id)?.status === "taken"),
  )

  const handleConfirmMedicine = (medicineId: string) => {
    setConfirmedMedicines((prev) => [...prev, medicineId])
  }

  const getVitalSignStatus = (type: string, value: number | string): "good" | "warning" | "critical" => {
    if (type === "heartRate") {
      const val = value as number
      if (val >= 60 && val <= 100) return "good"
      if ((val > 100 && val <= 110) || (val < 60 && val >= 50)) return "warning"
      return "critical"
    }
    if (type === "temperature") {
      const val = value as number
      if (val >= 36.5 && val <= 37.5) return "good"
      if ((val > 37.5 && val <= 38) || (val < 36.5 && val >= 36)) return "warning"
      return "critical"
    }
    if (type === "oxygenation") {
      const val = value as number
      if (val >= 95) return "good"
      if (val >= 90) return "warning"
      return "critical"
    }
    if (type === "respiratoryRate") {
      const val = value as number
      if (val >= 12 && val <= 20) return "good"
      if ((val > 20 && val <= 25) || (val < 12 && val >= 10)) return "warning"
      return "critical"
    }
    if (type === "sleepQuality") {
      const val = value as number
      if (val >= 70) return "good"
      if (val >= 50) return "warning"
      return "critical"
    }
    return "good"
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Hola, {userName}</h2>
            <p className="text-muted-foreground mt-1">Monitoreando a {elderlyName}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-lg border border-primary/20">
            <Battery className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Reloj conectado</p>
              <p className="text-lg font-semibold text-foreground">{Math.round(vitalSigns.deviceBattery)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Signos Vitales</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <VitalSignCard
            label="Frecuencia Cardíaca"
            value={Math.round(vitalSigns.heartRate)}
            unit="ppm"
            icon="heart"
            status={getVitalSignStatus("heartRate", vitalSigns.heartRate)}
            normalRange="60-100"
          />
          <VitalSignCard
            label="Presión Arterial"
            value={vitalSigns.bloodPressure}
            unit="mmHg"
            icon="blood"
            status="good"
            normalRange="120/80"
          />
          <VitalSignCard
            label="Temperatura"
            value={vitalSigns.temperature.toFixed(1)}
            unit="°C"
            icon="temp"
            status={getVitalSignStatus("temperature", vitalSigns.temperature)}
            normalRange="36.5-37.5"
          />
          <VitalSignCard
            label="Oxigenación"
            value={Math.round(vitalSigns.oxygenation)}
            unit="%"
            icon="oxygen"
            status={getVitalSignStatus("oxygenation", vitalSigns.oxygenation)}
            normalRange="95-100"
          />
          <VitalSignCard
            label="Frecuencia Respiratoria"
            value={Math.round(vitalSigns.respiratoryRate)}
            unit="rpm"
            icon="breathing"
            status={getVitalSignStatus("respiratoryRate", vitalSigns.respiratoryRate)}
            normalRange="12-20"
          />
          <VitalSignCard
            label="Calidad del Sueño"
            value={Math.round(vitalSigns.sleepQuality)}
            unit="%"
            icon="sleep"
            status={getVitalSignStatus("sleepQuality", vitalSigns.sleepQuality)}
            normalRange="> 70%"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Alertas Recientes</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`p-4 border-l-4 flex items-start gap-3 ${
                alert.severity === "critical"
                  ? "border-l-destructive bg-destructive/5"
                  : alert.severity === "warning"
                    ? "border-l-orange-500 bg-orange-50/50"
                    : "border-l-primary bg-primary/5"
              }`}
            >
              {alert.severity === "critical" ? (
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              ) : alert.severity === "warning" ? (
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Medicines Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Próximas Medicinas</h2>
        <div className="space-y-3">
          {medicines.map((medicine) => (
            <Card key={medicine.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground">{medicine.name}</p>
                <p className="text-sm text-muted-foreground">{medicine.time}</p>
              </div>
              {medicine.status === "taken" ? (
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Tomado</div>
              ) : confirmedMedicines.includes(medicine.id) ? (
                <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Confirmado</div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleConfirmMedicine(medicine.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Confirmar toma
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
