'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Music, Heart, BarChart3, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/usuarios', label: 'Usuarios', icon: Users },
  { href: '/canciones', label: 'Canciones', icon: Music },
  { href: '/favoritos', label: 'Favoritos', icon: Heart },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed md:hidden top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-gradient-to-b from-orange-500 to-orange-600 text-white flex flex-col transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-orange-400">
          <h1 className="text-2xl font-bold">🎵 Música</h1>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-orange-600 font-semibold'
                      : 'text-orange-100 hover:bg-orange-400'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-orange-400 text-sm text-orange-100">
          <p>© 2025 API de Música</p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}
    </>
  )
}
