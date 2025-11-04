"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ReportesSection() {
  const [selectedWeek, setSelectedWeek] = useState<"current" | "last">("current")

  // Generate simulated weekly data
  const data = useMemo(() => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sab", "Dom"]
    return days.map((day, idx) => ({
      day,
      heartRate: Math.floor(70 + Math.random() * 20),
      temperature: Math.round((36.5 + Math.random() * 1) * 10) / 10,
      oxygenation: Math.floor(95 + Math.random() * 5),
      sleepQuality: Math.floor(60 + Math.random() * 40),
    }))
  }, [])

  const lastWeekData = useMemo(() => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sab", "Dom"]
    return days.map((day, idx) => ({
      day,
      heartRate: Math.floor(72 + Math.random() * 18),
      temperature: Math.round((36.6 + Math.random() * 0.9) * 10) / 10,
      oxygenation: Math.floor(96 + Math.random() * 4),
      sleepQuality: Math.floor(65 + Math.random() * 30),
    }))
  }, [])

  const displayData = selectedWeek === "current" ? data : lastWeekData

  const getWeekDateRange = () => {
    if (selectedWeek === "current") {
      const today = new Date()
      const mondayDate = new Date(today)
      mondayDate.setDate(today.getDate() - today.getDay() + 1)
      const sundayDate = new Date(mondayDate)
      sundayDate.setDate(mondayDate.getDate() + 6)
      return `${mondayDate.toLocaleDateString("es-ES")} - ${sundayDate.toLocaleDateString("es-ES")}`
    } else {
      const today = new Date()
      const lastMonday = new Date(today)
      lastMonday.setDate(today.getDate() - today.getDay() - 6)
      const lastSunday = new Date(lastMonday)
      lastSunday.setDate(lastMonday.getDate() + 6)
      return `${lastMonday.toLocaleDateString("es-ES")} - ${lastSunday.toLocaleDateString("es-ES")}`
    }
  }

  const calculateAverages = () => {
    const heartRateAvg = Math.round(displayData.reduce((sum, d) => sum + d.heartRate, 0) / displayData.length)
    const temperatureAvg =
      Math.round((displayData.reduce((sum, d) => sum + d.temperature, 0) / displayData.length) * 10) / 10
    const oxygenationAvg = Math.round(displayData.reduce((sum, d) => sum + d.oxygenation, 0) / displayData.length)
    const sleepQualityAvg = Math.round(displayData.reduce((sum, d) => sum + d.sleepQuality, 0) / displayData.length)

    return {
      heartRateAvg,
      temperatureAvg,
      oxygenationAvg,
      sleepQualityAvg,
    }
  }

  const averages = calculateAverages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground mt-1">Evolución semanal de tus signos vitales</p>
      </div>

      {/* Week Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedWeek("current")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            selectedWeek === "current"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Esta Semana
        </button>
        <button
          onClick={() => setSelectedWeek("last")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            selectedWeek === "last"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Semana Anterior
        </button>
      </div>

      {/* Date Range */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm text-foreground font-medium">Período: {getWeekDateRange()}</p>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Frec. Cardíaca Promedio</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {averages.heartRateAvg}
            <span className="text-sm ml-1">ppm</span>
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Temperatura Promedio</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {averages.temperatureAvg}
            <span className="text-sm ml-1">°C</span>
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Oxigenación Promedio</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {averages.oxygenationAvg}
            <span className="text-sm ml-1">%</span>
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            Calidad de Sueño Promedio
          </p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {averages.sleepQualityAvg}
            <span className="text-sm ml-1">%</span>
          </p>
        </Card>
      </div>

      {/* Heart Rate Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Frecuencia Cardíaca Semanal</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ fill: "var(--primary)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Frec. Cardíaca (ppm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Temperature Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Temperatura Semanal</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="var(--accent)"
              fillOpacity={1}
              fill="url(#colorTemp)"
              name="Temperatura (°C)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Oxygenation Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Oxigenación Semanal</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" domain={[90, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="oxygenation"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-2)", r: 4 }}
              activeDot={{ r: 6 }}
              name="Oxigenación (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
