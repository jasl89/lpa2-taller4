'use client'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Sistema de Gestión de Música</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
