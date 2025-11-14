'use client'

import { useEffect, useState } from 'react'
import { X, Plus } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { cancionesService } from '@/services/canciones'
import { favoritosService } from '@/services/favoritos'
import { Usuario, Cancion } from '@/types'
import { toast } from 'sonner'
import { CardSkeleton } from '@/components/ui/skeleton'

interface AddFavoritoModalProps {
  usuarioId: number
  onClose: () => void
  onSuccess: () => void
}

export function AddFavoritoModal({ usuarioId, onClose, onSuccess }: AddFavoritoModalProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [canciones, setCanciones] = useState<Cancion[]>([])
  const [selectedCancion, setSelectedCancion] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [usuariosData, cancionesData] = await Promise.all([
          usuariosService.getAll(0, 100),
          cancionesService.getAll(0, 100),
        ])
        setUsuarios(usuariosData)
        setCanciones(cancionesData)
      } catch (error) {
        console.error('[Fetch Error]', error)
        toast.error('Error al cargar datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAdd = async () => {
    if (!selectedCancion) {
      toast.error('Selecciona una canción')
      return
    }

    try {
      setSaving(true)
      await favoritosService.create({
        usuario_id: usuarioId,
        cancion_id: selectedCancion,
      })
      toast.success('Canción agregada a favoritos')
      onSuccess()
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Error al agregar a favoritos')
    } finally {
      setSaving(false)
    }
  }

  const usuario = usuarios.find(u => u.id === usuarioId)
  const cancion = canciones.find(c => c.id === selectedCancion)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Agregar a Favoritos</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Usuario Info */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Usuario Seleccionado</p>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="font-medium text-gray-900">{usuario?.nombre}</p>
              <p className="text-sm text-gray-600">{usuario?.correo}</p>
            </div>
          </div>

          {/* Cancion Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Canción</label>
            {loading ? (
              <CardSkeleton />
            ) : (
              <select
                value={selectedCancion || ''}
                onChange={(e) => setSelectedCancion(parseInt(e.target.value) || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Elige una canción...</option>
                {canciones.map(cancion => (
                  <option key={cancion.id} value={cancion.id}>
                    {cancion.titulo} - {cancion.artista}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Cancion Preview */}
          {cancion && (
            <div className="p-3 bg-violet-50 border border-violet-200 rounded-lg">
              <p className="font-medium text-gray-900">{cancion.titulo}</p>
              <p className="text-sm text-gray-600">{cancion.artista}</p>
              {cancion.album && <p className="text-xs text-gray-500">{cancion.album}</p>}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              disabled={!selectedCancion || saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              <Plus size={18} />
              {saving ? 'Agregando...' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
