"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Appointment {
  id: string
  specialty: string
  doctor: string
  date: string
  time: string
  status: "consultation" | "control"
}

export default function AgendaSection() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      specialty: "Cardiología",
      doctor: "Dr. Carlos García",
      date: "2025-11-12",
      time: "14:30",
      status: "consultation",
    },
    {
      id: "2",
      specialty: "Endocrinología",
      doctor: "Dra. María López",
      date: "2025-11-18",
      time: "10:00",
      status: "control",
    },
    {
      id: "3",
      specialty: "Oftalmología",
      doctor: "Dr. Juan Rodríguez",
      date: "2025-11-25",
      time: "15:00",
      status: "consultation",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    status: "consultation" as const,
  })

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAppointment.specialty && newAppointment.doctor && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        ...newAppointment,
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({
        specialty: "",
        doctor: "",
        date: "",
        time: "",
        status: "consultation",
      })
      setShowModal(false)
    }
  }

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("es-ES", options)
  }

  const getStatusColor = (status: Appointment["status"]) => {
    return status === "consultation"
      ? "bg-primary/10 text-primary border-primary/20"
      : "bg-accent/10 text-accent border-accent/20"
  }

  const getStatusLabel = (status: Appointment["status"]) => {
    return status === "consultation" ? "Consulta" : "Control"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda Médica</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus citas médicas programadas</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          + Agregar Cita
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No hay citas médicas programadas</p>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{appointment.specialty}</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        appointment.status,
                      )}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </div>
                  </div>
                  <p className="text-foreground font-medium mb-3">{appointment.doctor}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Fecha: {formatDate(appointment.date)}</span>
                    <span>Hora: {appointment.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteAppointment(appointment.id)}
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

      {/* Download Report Button */}
      <Card className="p-4 bg-primary/5 border-primary/20 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Reporte Médico</p>
          <p className="text-sm text-muted-foreground">Descarga un reporte de tus citas recientes</p>
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
          Descargar Reporte
        </Button>
      </Card>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Agregar Nueva Cita</h2>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Especialidad</label>
                  <Input
                    type="text"
                    placeholder="Ej: Cardiología"
                    value={newAppointment.specialty}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        specialty: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Doctor</label>
                  <Input
                    type="text"
                    placeholder="Ej: Dr. Juan García"
                    value={newAppointment.doctor}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        doctor: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fecha</label>
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Hora</label>
                  <Input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        time: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tipo de Cita</label>
                  <select
                    value={newAppointment.status}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        status: e.target.value as "consultation" | "control",
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="consultation">Consulta</option>
                    <option value="control">Control</option>
                  </select>
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
