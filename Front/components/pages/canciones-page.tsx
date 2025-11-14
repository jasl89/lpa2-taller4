'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit2, Trash2, Search, RotateCcw } from 'lucide-react'
import { cancionesService } from '@/services/canciones'
import { Cancion } from '@/types'
import { formatDuration, formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { TableSkeleton } from '@/components/ui/skeleton'
import { CancionForm } from '@/components/canciones/cancion-form'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export function CancionesPage() {
  const [canciones, setCanciones] = useState<Cancion[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCancion, setEditingCancion] = useState<Cancion | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [filters, setFilters] = useState({ artista: '', genero: '' })
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'titulo',
    direction: 'asc',
  })

  const fetchCanciones = async () => {
    try {
      setLoading(true)
      const data = await cancionesService.getAll(0, 100, filters.artista || undefined, filters.genero || undefined)
      setCanciones(data)
    } catch (error) {
      console.error('[Fetch Canciones Error]', error)
      toast.error('Error al cargar canciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCanciones()
  }, [filters])

  const sortedCanciones = useMemo(() => {
    const sorted = [...canciones].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Cancion]
      const bVal = b[sortConfig.key as keyof Cancion]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })
    return sorted
  }, [canciones, sortConfig])

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  const handleSave = async (data: any) => {
    try {
      if (editingCancion) {
        await cancionesService.update(editingCancion.id, data)
        setCanciones(canciones.map(c => c.id === editingCancion.id ? { ...c, ...data } : c))
        toast.success('Canción actualizada exitosamente')
      } else {
        const newCancion = await cancionesService.create(data)
        setCanciones([...canciones, newCancion])
        toast.success('Canción creada exitosamente')
      }
      setShowForm(false)
      setEditingCancion(null)
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar canción')
    }
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    try {
      await cancionesService.delete(deleteId)
      setCanciones(canciones.filter(c => c.id !== deleteId))
      toast.success('Canción eliminada exitosamente')
      setDeleteId(null)
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar canción')
    }
  }

  const getUniqueValues = (field: 'artista' | 'genero'): string[] => {
    return Array.from(new Set(canciones.map(c => c[field]).filter(Boolean)))
  }

  const TH = ({ label, sortKey }: { label: string; sortKey: string }) => (
    <th
      onClick={() => handleSort(sortKey)}
      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        {label}
        {sortConfig.key === sortKey && (
          <span className="text-orange-600">
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Canciones</h1>
        <button
          onClick={() => {
            setEditingCancion(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Nueva Canción
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Artista</label>
            <input
              type="text"
              placeholder="Ej: Carlos Vives"
              value={filters.artista}
              onChange={(e) => setFilters({ ...filters, artista: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Género</label>
            <input
              type="text"
              placeholder="Ej: Vallenato"
              value={filters.genero}
              onChange={(e) => setFilters({ ...filters, genero: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ artista: '', genero: '' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={18} />
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <TableSkeleton />
        </div>
      ) : canciones.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">No hay canciones aún</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Crear primera canción
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                  <TH label="Título" sortKey="titulo" />
                  <TH label="Artista" sortKey="artista" />
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Álbum</th>
                  <TH label="Duración" sortKey="duracion" />
                  <TH label="Año" sortKey="año" />
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Género</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedCanciones.map((cancion) => (
                  <tr key={cancion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cancion.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cancion.titulo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cancion.artista}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cancion.album || '-'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{formatDuration(cancion.duracion)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cancion.año || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
                        {cancion.genero || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCancion(cancion)
                            setShowForm(true)
                          }}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(cancion.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <CancionForm
          cancion={editingCancion}
          onClose={() => {
            setShowForm(false)
            setEditingCancion(null)
          }}
          onSave={handleSave}
        />
      )}

      {deleteId !== null && (
        <ConfirmDialog
          title="Eliminar canción"
          message={`¿Estás seguro de eliminar "${canciones.find(c => c.id === deleteId)?.titulo}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
