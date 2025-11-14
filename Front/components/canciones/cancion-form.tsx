'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Cancion, CreateCancionRequest } from '@/types'
import { formatDuration } from '@/lib/utils'

interface CancionFormProps {
  cancion?: Cancion | null
  onClose: () => void
  onSave: (data: CreateCancionRequest) => Promise<void>
}

export function CancionForm({ cancion, onClose, onSave }: CancionFormProps) {
  const [formData, setFormData] = useState({
    titulo: cancion?.titulo || '',
    artista: cancion?.artista || '',
    album: cancion?.album || '',
    duracion: cancion?.duracion || 0,
    año: cancion?.año || new Date().getFullYear(),
    genero: cancion?.genero || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es obligatorio'
    }
    if (!formData.artista.trim()) {
      newErrors.artista = 'El artista es obligatorio'
    }
    if (formData.duracion <= 0) {
      newErrors.duracion = 'La duración debe ser mayor a 0'
    }
    if (formData.año < 1900 || formData.año > 2100) {
      newErrors.año = 'El año debe estar entre 1900 y 2100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      const dataToSend: CreateCancionRequest = {
        titulo: formData.titulo.trim(),
        artista: formData.artista.trim(),
        duracion: formData.duracion,
        album: formData.album.trim() || undefined,
        año: formData.año || undefined,
        genero: formData.genero.trim() || undefined,
      }
      await onSave(dataToSend)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold">{cancion ? 'Editar Canción' : 'Nueva Canción'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => {
                setFormData({ ...formData, titulo: e.target.value })
                if (errors.titulo) setErrors({ ...errors, titulo: '' })
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.titulo ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: La Tierra del Olvido"
            />
            {errors.titulo && <p className="text-sm text-red-600 mt-1">{errors.titulo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Artista</label>
            <input
              type="text"
              value={formData.artista}
              onChange={(e) => {
                setFormData({ ...formData, artista: e.target.value })
                if (errors.artista) setErrors({ ...errors, artista: '' })
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.artista ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Carlos Vives"
            />
            {errors.artista && <p className="text-sm text-red-600 mt-1">{errors.artista}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Álbum</label>
            <input
              type="text"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Opcional"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración (segundos)</label>
              <input
                type="number"
                min="1"
                value={formData.duracion}
                onChange={(e) => {
                  setFormData({ ...formData, duracion: parseInt(e.target.value) || 0 })
                  if (errors.duracion) setErrors({ ...errors, duracion: '' })
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.duracion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="180"
              />
              {errors.duracion && <p className="text-sm text-red-600 mt-1">{errors.duracion}</p>}
              {formData.duracion > 0 && (
                <p className="text-xs text-gray-600 mt-1">Formato: {formatDuration(formData.duracion)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={formData.año}
                onChange={(e) => {
                  setFormData({ ...formData, año: parseInt(e.target.value) || 0 })
                  if (errors.año) setErrors({ ...errors, año: '' })
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.año ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2025"
              />
              {errors.año && <p className="text-sm text-red-600 mt-1">{errors.año}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <input
              type="text"
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ej: Vallenato"
            />
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
              {loading ? 'Guardando...' : cancion ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
