'use client'

import { useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { favoritosService } from '@/services/favoritos'
import { FavoritoConDetalles } from '@/types'
import { formatDuration, formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { CardSkeleton } from '@/components/ui/skeleton'

interface FavoritosListProps {
  usuarioId: number
  onClose: () => void
}

export function FavoritosList({ usuarioId, onClose }: FavoritosListProps) {
  const [favoritos, setFavoritos] = useState<FavoritoConDetalles[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await favoritosService.getByUsuario(usuarioId)
        setFavoritos(data)
      } catch (error) {
        console.error('[Fetch Favoritos Error]', error)
        toast.error('Error al cargar favoritos')
      } finally {
        setLoading(false)
      }
    }

    fetchFavoritos()
  }, [usuarioId])

  const handleDelete = async (favoritoId: number) => {
    try {
      await favoritosService.delete(favoritoId)
      setFavoritos(favoritos.filter(f => f.id !== favoritoId))
      toast.success('Favorito eliminado')
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar favorito')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold">Canciones Favoritas</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <CardSkeleton />
          ) : favoritos.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Este usuario no tiene canciones favoritas</p>
          ) : (
            <div className="space-y-3">
              {favoritos.map((fav) => (
                <div key={fav.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{fav.cancion.titulo}</p>
                    <p className="text-sm text-gray-600">{fav.cancion.artista}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDuration(fav.cancion.duracion)} • Agregado: {formatDate(fav.fecha_agregado)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
