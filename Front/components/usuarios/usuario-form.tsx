'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Usuario, CreateUsuarioRequest } from '@/types'
import { validateEmail } from '@/lib/utils'

interface UsuarioFormProps {
  usuario?: Usuario | null
  onClose: () => void
  onSave: (data: CreateUsuarioRequest) => Promise<void>
}

export function UsuarioForm({ usuario, onClose, onSave }: UsuarioFormProps) {
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    correo: usuario?.correo || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!validateEmail(formData.correo)) {
      newErrors.correo = 'Formato de correo inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      await onSave(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => {
                setFormData({ ...formData, nombre: e.target.value })
                if (errors.nombre) setErrors({ ...errors, nombre: '' })
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Juan Pérez"
            />
            {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => {
                setFormData({ ...formData, correo: e.target.value })
                if (errors.correo) setErrors({ ...errors, correo: '' })
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.correo ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: juan@email.com"
            />
            {errors.correo && <p className="text-sm text-red-600 mt-1">{errors.correo}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
