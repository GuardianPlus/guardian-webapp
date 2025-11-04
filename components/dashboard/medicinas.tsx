"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Medicine {
  id: string
  name: string
  dose: string
  time: string
  status: "taken" | "pending" | "confirmed"
}

export default function MedicinasSection() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Ibuprofeno",
      dose: "400mg",
      time: "14:00 h",
      status: "pending",
    },
    {
      id: "2",
      name: "Losartán",
      dose: "50mg",
      time: "20:00 h",
      status: "pending",
    },
    {
      id: "3",
      name: "Metformina",
      dose: "500mg",
      time: "08:00 h",
      status: "taken",
    },
    {
      id: "4",
      name: "Atorvastatina",
      dose: "20mg",
      time: "21:00 h",
      status: "confirmed",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dose: "",
    time: "",
  })

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedicine.name && newMedicine.dose && newMedicine.time) {
      const medicine: Medicine = {
        id: Date.now().toString(),
        ...newMedicine,
        status: "pending",
      }
      setMedicines([...medicines, medicine])
      setNewMedicine({ name: "", dose: "", time: "" })
      setShowModal(false)
    }
  }

  const handleMarkAsTaken = (id: string) => {
    setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, status: "taken" } : med)))
  }

  const handleDeleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id))
  }

  const getStatusColor = (status: Medicine["status"]) => {
    switch (status) {
      case "taken":
        return "bg-primary/10 text-primary border-primary/20"
      case "confirmed":
        return "bg-accent/10 text-accent border-accent/20"
      case "pending":
        return "bg-muted/30 text-muted-foreground border-muted/50"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: Medicine["status"]) => {
    switch (status) {
      case "taken":
        return "Tomado"
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medicinas</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus medicamentos diarios</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          + Agregar
        </Button>
      </div>

      {/* Medicines List */}
      <div className="space-y-3">
        {medicines.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No hay medicinas registradas</p>
          </Card>
        ) : (
          medicines.map((medicine) => (
            <Card key={medicine.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{medicine.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Dosis: {medicine.dose}</span>
                  <span>Hora: {medicine.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-full text-xs font-semibold border ${getStatusColor(medicine.status)}`}
                >
                  {getStatusLabel(medicine.status)}
                </div>
                <div className="flex gap-2">
                  {medicine.status !== "taken" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsTaken(medicine.id)}
                      className="border-primary/30"
                    >
                      Marcar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteMedicine(medicine.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Medicine Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Agregar Nueva Medicina</h2>
              <form onSubmit={handleAddMedicine} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nombre del medicamento</label>
                  <Input
                    type="text"
                    placeholder="Ej: Paracetamol"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Dosis</label>
                  <Input
                    type="text"
                    placeholder="Ej: 500mg"
                    value={newMedicine.dose}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dose: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Hora</label>
                  <Input
                    type="time"
                    value={newMedicine.time}
                    onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Agregar
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
