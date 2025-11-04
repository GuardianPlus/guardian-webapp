"use client"

import type React from "react"

import { Home, Pill, Calendar, BarChart3, Settings, MapPin } from "lucide-react"

type Tab = "home" | "medicinas" | "mapa" | "agenda" | "reportes" | "configuracion"

interface BottomNavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const navItems: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "home", label: "Inicio", icon: <Home size={24} /> },
  { tab: "medicinas", label: "Medicinas", icon: <Pill size={24} /> },
  { tab: "mapa", label: "Mapa", icon: <MapPin size={24} /> },
  { tab: "agenda", label: "Agenda", icon: <Calendar size={24} /> },
  { tab: "reportes", label: "Reportes", icon: <BarChart3 size={24} /> },
  { tab: "configuracion", label: "Config", icon: <Settings size={24} /> },
]

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary shadow-2xl shadow-primary/20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`flex flex-col items-center justify-center py-3 px-2 flex-1 transition-colors ${
              activeTab === item.tab
                ? "text-primary-foreground"
                : "text-primary-foreground/50 hover:text-primary-foreground"
            }`}
          >
            <span className="text-primary-foreground">{item.icon}</span>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
