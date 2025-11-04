"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  userEmail: string
  onLogout: () => void
}

export default function Header({ userEmail, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-primary font-bold">+</span>
          </div>
          <h1 className="text-xl font-bold text-primary-foreground">Guardian+</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary-foreground/80 hidden sm:inline">{userEmail}</span>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground hover:bg-primary/80">
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
