'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { favoritosService } from '@/services/favoritos'
import { Usuario, FavoritoConDetalles } from '@/types'
import { formatDuration } from '@/lib/utils'
import { toast } from 'sonner'
import { CardSkeleton } from '@/components/ui/skeleton'
import { AddFavoritoModal } from '@/components/favoritos/add-favorito-modal'

export function FavoritosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null)
  const [favoritos, setFavoritos] = useState<FavoritoConDetalles[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await usuariosService.getAll(0, 100)
        setUsuarios(data)
        if (data.length > 0) {
          setSelectedUsuario(data[0].id)
        }
      } catch (error) {
        console.error('[Fetch Usuarios Error]', error)
        toast.error('Error al cargar usuarios')
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  useEffect(() => {
    if (!selectedUsuario) return

    const fetchFavoritos = async () => {
      try {
        setLoading(true)
        const data = await favoritosService.getByUsuario(selectedUsuario)
        setFavoritos(data)
      } catch (error) {
        console.error('[Fetch Favoritos Error]', error)
        toast.error('Error al cargar favoritos')
      } finally {
        setLoading(false)
      }
    }

    fetchFavoritos()
  }, [selectedUsuario])

  const handleDelete = async (favoritoId: number) => {
    try {
      await favoritosService.delete(favoritoId)
      setFavoritos(favoritos.filter(f => f.id !== favoritoId))
      toast.success('Favorito eliminado')
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar favorito')
    }
  }

  const handleAddFavorito = async () => {
    if (selectedUsuario) {
      const data = await favoritosService.getByUsuario(selectedUsuario)
      setFavoritos(data)
    }
  }

  const usuarioActual = usuarios.find(u => u.id === selectedUsuario)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Favoritos</h1>
        {selectedUsuario && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            Agregar a Favoritos
          </button>
        )}
      </div>

      {/* Usuario Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Usuario</label>
        <select
          value={selectedUsuario || ''}
          onChange={(e) => setSelectedUsuario(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre} ({usuario.correo})
            </option>
          ))}
        </select>
      </div>

      {/* Favoritos List */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <CardSkeleton />
        </div>
      ) : favoritos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">
            {usuarioActual?.nombre} no tiene canciones favoritas
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Agregar Primera Canción
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritos.map((fav) => (
            <div key={fav.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className="h-32 bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center">
                <span className="text-white text-4xl">♪</span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate mb-1">{fav.cancion.titulo}</h3>
                <p className="text-sm text-gray-600 truncate mb-1">{fav.cancion.artista}</p>
                {fav.cancion.album && <p className="text-xs text-gray-500 truncate mb-3">{fav.cancion.album}</p>}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {formatDuration(fav.cancion.duracion)}
                  </span>
                  {fav.cancion.genero && (
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">
                      {fav.cancion.genero}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(fav.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  <Trash2 size={16} />
                  Eliminar de Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Favorito Modal */}
      {showAddModal && selectedUsuario && (
        <AddFavoritoModal
          usuarioId={selectedUsuario}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddFavorito}
        />
      )}
    </div>
  )
}
