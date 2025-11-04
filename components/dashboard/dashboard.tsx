"use client"

import { useState } from "react"
import BottomNavigation from "@/components/layout/bottom-navigation"
import DashboardHome from "@/components/dashboard/home"
import MedicinasSection from "@/components/dashboard/medicinas"
import AgendaSection from "@/components/dashboard/agenda"
import ReportesSection from "@/components/dashboard/reportes"
import ConfiguracionSection from "@/components/dashboard/configuracion"
import Header from "@/components/layout/header"
import MapaSection from "@/components/dashboard/mapa"

type Tab = "home" | "medicinas" | "agenda" | "reportes" | "configuracion" | "mapa"

interface DashboardProps {
  user: { email: string; name: string }
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home")

  const elderlyPerson = {
    name: "Juan Pérez",
    age: 72,
    emergencyContact: "+51 992 143 374",
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome userName={user.name} elderlyName={elderlyPerson.name} />
      case "medicinas":
        return <MedicinasSection />
      case "agenda":
        return <AgendaSection />
      case "reportes":
        return <ReportesSection />
      case "mapa":
        return <MapaSection />
      case "configuracion":
        return (
          <ConfiguracionSection
            elderlyName={elderlyPerson.name}
            elderlyAge={elderlyPerson.age}
            elderlyContact={elderlyPerson.emergencyContact}
          />
        )
      default:
        return <DashboardHome userName={user.name} elderlyName={elderlyPerson.name} />
    }
  }

  return (
    <div className="w-full min-h-screen bg-secondary/30 pb-24">
      <Header userEmail={user.email} onLogout={onLogout} />
      <main className="max-w-6xl mx-auto px-4 py-6">{renderContent()}</main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
