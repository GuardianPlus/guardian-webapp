"use client"

import { Heart, Droplet, Thermometer, Wind, Moon, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

interface VitalSignCardProps {
  label: string
  value: string | number
  unit: string
  icon: "heart" | "blood" | "temp" | "oxygen" | "breathing" | "sleep"
  status: "good" | "warning" | "critical"
  normalRange: string
}

export default function VitalSignCard({ label, value, unit, icon, status, normalRange }: VitalSignCardProps) {
  const iconMap = {
    heart: Heart,
    blood: Droplet,
    temp: Thermometer,
    oxygen: Wind,
    breathing: Zap,
    sleep: Moon,
  }

  const Icon = iconMap[icon]

  const statusColors = {
    good: {
      border: "border-primary/40",
      bg: "bg-primary/5",
      icon: "text-primary",
      badge: "bg-primary/20 text-primary",
    },
    warning: {
      border: "border-orange-400/40",
      bg: "bg-orange-50/50",
      icon: "text-orange-500",
      badge: "bg-orange-100 text-orange-700",
    },
    critical: {
      border: "border-destructive/40",
      bg: "bg-destructive/5",
      icon: "text-destructive",
      badge: "bg-destructive/20 text-destructive",
    },
  }

  const colors = statusColors[status]

  return (
    <Card className={`p-4 border-2 transition-all ${colors.border} ${colors.bg}`}>
      <div className="space-y-3">
        {/* Icon with frame */}
        <div className={`w-10 h-10 rounded border-2 ${colors.border} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>

        {/* Label */}
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">{label}</p>

        {/* Value */}
        <p className="text-xl font-bold text-foreground">
          {value}
          <span className="text-xs font-normal ml-1 text-muted-foreground">{unit}</span>
        </p>

        {/* Status badge */}
        <div className="pt-2 border-t border-border">
          <p className={`text-xs font-medium px-2 py-1 rounded inline-block ${colors.badge}`}>
            {status === "good" ? "Normal" : status === "warning" ? "Advertencia" : "Crítico"}
          </p>
        </div>

        {/* Normal range info */}
        <p className="text-xs text-muted-foreground">Rango: {normalRange}</p>
      </div>
    </Card>
  )
}
