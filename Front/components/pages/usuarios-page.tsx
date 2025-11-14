'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Heart } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { favoritosService } from '@/services/favoritos'
import { Usuario } from '@/types'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { TableSkeleton } from '@/components/ui/skeleton'
import { UsuarioForm } from '@/components/usuarios/usuario-form'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { FavoritosList } from '@/components/usuarios/favoritos-list'

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showFavoritos, setShowFavoritos] = useState<number | null>(null)

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const data = await usuariosService.getAll(0, 100)
      setUsuarios(data)
    } catch (error) {
      console.error('[Fetch Usuarios Error]', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleSave = async (data: any) => {
    try {
      if (editingUsuario) {
        await usuariosService.update(editingUsuario.id, data)
        setUsuarios(usuarios.map(u => u.id === editingUsuario.id ? { ...u, ...data } : u))
        toast.success('Usuario actualizado exitosamente')
      } else {
        const newUsuario = await usuariosService.create(data)
        setUsuarios([...usuarios, newUsuario])
        toast.success('Usuario creado exitosamente')
      }
      setShowForm(false)
      setEditingUsuario(null)
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar usuario')
    }
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    try {
      await usuariosService.delete(deleteId)
      setUsuarios(usuarios.filter(u => u.id !== deleteId))
      toast.success('Usuario eliminado exitosamente')
      setDeleteId(null)
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar usuario')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setEditingUsuario(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <TableSkeleton />
        </div>
      ) : usuarios.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">No hay usuarios aún</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Crear primer usuario
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Correo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha Registro</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{usuario.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{usuario.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{usuario.correo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(usuario.fecha_registro)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setShowFavoritos(usuario.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Ver favoritos"
                        >
                          <Heart size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUsuario(usuario)
                            setShowForm(true)
                          }}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(usuario.id)}
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
        <UsuarioForm
          usuario={editingUsuario}
          onClose={() => {
            setShowForm(false)
            setEditingUsuario(null)
          }}
          onSave={handleSave}
        />
      )}

      {deleteId !== null && (
        <ConfirmDialog
          title="Eliminar usuario"
          message={`¿Estás seguro de eliminar a ${usuarios.find(u => u.id === deleteId)?.nombre}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {showFavoritos !== null && (
        <FavoritosList
          usuarioId={showFavoritos}
          onClose={() => setShowFavoritos(null)}
        />
      )}
    </div>
  )
}
